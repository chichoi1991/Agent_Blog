# -*- coding: utf-8 -*-
# apa.yaml 한글화 적용 스크립트
# 원본(apa.en.yaml)을 읽어 번역 맵을 적용하고 apa.yaml로 출력한다.
# - 지정된 경로의 문자열 값만 교체 (id/url/score 등 구조 값은 절대 건드리지 않음)
# - 매칭은 공백 정규화 기준

require 'yaml'
require_relative 'apa_ko_map'

BASE = File.expand_path('../agent-resources/platform-advisor', __dir__)
BAK  = File.expand_path('backup-en', __dir__)
SRC  = File.join(BAK, 'apa.en.yaml')
DST  = File.join(BASE, 'apa.yaml')

data = YAML.load_file(SRC)

$hits = 0
$miss = []

def tr(v)
  return v unless v.is_a?(String)
  key = ApaKo.norm(v)
  if ApaKo::MAP.key?(key)
    $hits += 1
    ApaKo::MAP[key]
  else
    $miss << v.to_s.gsub(/\s+/, ' ').strip
    v
  end
end

def tr_list(arr)
  return arr unless arr.is_a?(Array)
  arr.map { |x| tr(x) }
end

# ---------------- questions ----------------
(data['questions'] || []).each do |q|
  q['label']  = tr(q['label'])  if q['label']
  q['prompt'] = tr(q['prompt']) if q['prompt']
  (q['options'] || []).each { |o| o['label'] = tr(o['label']) if o['label'] }
end

# ---------------- scoring ----------------
sc = data['scoring'] || {}

(sc['hard_rules'] || {}).each_value do |hr|
  hr['label'] = tr(hr['label']) if hr.is_a?(Hash) && hr['label']
end

(sc['persona_preferences'] || []).each do |p|
  p['rationale'] = tr(p['rationale']) if p['rationale']
end

(sc['recommendation_thresholds'] || []).each do |th|
  th['label']       = tr(th['label'])       if th['label']
  th['description'] = tr(th['description']) if th['description']
end

th = sc['tie_handling'] || {}
(th['tiebreakers'] || []).each { |tb| tb['rationale'] = tr(tb['rationale']) if tb['rationale'] }
(th['valid_pairs'] || []).each { |vp| vp['rationale'] = tr(vp['rationale']) if vp['rationale'] }

(sc['cross_question_notes'] || []).each { |n| n['note'] = tr(n['note']) if n['note'] }
(sc['winner_persona_notes'] || []).each { |n| n['note'] = tr(n['note']) if n['note'] }

# ---------------- recommendations ----------------
(data['recommendations'] || {}).each_value do |r|
  next unless r.is_a?(Hash)

  %w[description scoring_summary exploration_best_for exploration_summary
     summary first_party_label].each do |k|
    r[k] = tr(r[k]) if r[k]
  end

  r['best_for']       = tr_list(r['best_for'])       if r['best_for']
  r['watch_out_for']  = tr_list(r['watch_out_for'])  if r['watch_out_for']

  (r['templates'] || []).each do |tpl|
    tpl['label']       = tr(tpl['label'])       if tpl['label']
    tpl['description'] = tr(tpl['description']) if tpl['description']
  end

  (r['first_party_agents'] || []).each do |fa|
    fa['label']       = tr(fa['label'])       if fa['label']
    fa['description'] = tr(fa['description']) if fa['description']
  end

  (r['start_here'] || {}).each_value do |sh|
    next unless sh.is_a?(Hash)
    sh['label']       = tr(sh['label'])       if sh['label']
    sh['tagline']     = tr(sh['tagline'])     if sh['tagline']
    sh['description'] = tr(sh['description']) if sh['description']
  end

  (r['persona_tips'] || {}).each_key do |k|
    r['persona_tips'][k] = tr(r['persona_tips'][k])
  end
end

# ---------------- resources_url → 한글 블로그 ----------------
# platform-advisor 페이지(/Agent_Blog/agent-resources/platform-advisor/) 기준 상대 경로.
# 상대 경로를 쓰면 baseurl 이 바뀌어도 깨지지 않는다.
RESOURCE_URLS = {
  'agent_builder'  => '../m365-copilot/#agent-builder',
  'm365_copilot'   => '../m365-copilot/',
  'copilot_studio' => '../copilot-studio/',
  'foundry'        => '../microsoft-foundry/',
  'cowork'         => '../m365-copilot/#cowork',
  'scout'          => '../../scout/',
}

$url_changed = 0
(data['recommendations'] || {}).each do |pid, r|
  next unless r.is_a?(Hash)
  next unless RESOURCE_URLS.key?(pid)
  r['resources_url'] = RESOURCE_URLS[pid]
  $url_changed += 1
end

# ---------------- output ----------------
out = YAML.dump(data, line_width: -1)
out = out.sub(/\A---\n/, "")
# 주의: 파일이 '---' 로 시작하면 Jekyll 이 front matter 로 오인해 HTML 로 렌더링한다.
# 반드시 '#' 주석으로 시작해야 정적 파일로 그대로 서빙된다.
header = <<~HDR
  ################################################################################
  # Microsoft Agent Platform Advisor — 한국어판 데이터
  # 원본: https://microsoft.github.io/AgentPlatformAdvisor/ (apa.yaml)
  # 영문 원본은 apa.en.yaml 로 보존됨. 구조/점수/URL은 원본과 동일.
  ################################################################################
HDR
File.write(DST, header + out, mode: 'wb:UTF-8')

puts "translated values : #{$hits}"
puts "resources_url set : #{$url_changed}"
puts "untranslated      : #{$miss.uniq.size}"
puts "map entries       : #{ApaKo::MAP.size}"
if $miss.any?
  puts "--- MISSING (first 40) ---"
  $miss.uniq.first(40).each { |m| puts "  * #{m[0, 160]}" }
end
