# -*- coding: utf-8 -*-
# apa.js / platform-advisor.html 한글화 스크립트
# 정확한 문자열 치환만 수행하며, 치환 실패 시 즉시 에러로 알린다.

BASE     = File.expand_path('../agent-resources/platform-advisor', __dir__)
BAK      = File.expand_path('backup-en', __dir__)
JS_SRC   = File.join(BAK, 'assets', 'apa.en.js')
JS_DST   = File.join(BASE, 'assets', 'apa.js')
HTML_DST = File.expand_path('../agent-resources/platform-advisor.html', __dir__)
HTML_SRC = File.join(BAK, 'platform-advisor.en.html')

# 최초 실행 시 영문 원본 백업 생성
require 'fileutils'
FileUtils.mkdir_p(File.join(BAK, 'assets'))
FileUtils.cp(JS_DST, JS_SRC)     unless File.exist?(JS_SRC)
FileUtils.cp(HTML_DST, HTML_SRC) unless File.exist?(HTML_SRC)

$errors = []
$applied = 0

def sub!(text, from, to, label)
  if text.include?(from)
    n = text.scan(Regexp.new(Regexp.escape(from))).size
    text = text.gsub(from, to)
    $applied += n
  else
    $errors << label
  end
  text
end

# ============================================================================
# apa.js
# ============================================================================
js = File.read(JS_SRC, mode: 'rb:UTF-8')

R = []
def r(from, to, label = nil)
  R << [from, to, label || from[0, 50]]
end

# --- 진행 표시줄 ---
r "const steps = ['Welcome', 'Assessment', 'Recommendation'];",
  "const steps = ['시작', '진단', '추천 결과'];"

# --- 임계값 라벨 fallback ---
r "return t ? t.label : 'Not recommended';",
  "return t ? t.label : '권장하지 않음';"

# --- 배지 클래스: 한국어 라벨 대응 ---
r "function badgeClass(label) {\n  if (label.startsWith('Strong'))   return 'badge-strong';\n  if (label.startsWith('Good'))     return 'badge-good';\n  if (label.startsWith('Partial'))  return 'badge-possible';\n  return 'badge-not';\n}",
  "function badgeClass(label) {\n  if (label.startsWith('매우 적합') || label.startsWith('Strong')) return 'badge-strong';\n  if (label.startsWith('적합')     || label.startsWith('Good'))   return 'badge-good';\n  if (label.startsWith('부분 적합') || label.startsWith('Partial')) return 'badge-possible';\n  return 'badge-not';\n}",
  'badgeClass'

# --- 추천 카드 ---
r "<div class=\"rec-card\"><p>Platform data unavailable.</p></div>",
  "<div class=\"rec-card\"><p>플랫폼 데이터를 불러올 수 없습니다.</p></div>"
r "<div class=\"rec-section-title\">Why this was recommended</div>",
  "<div class=\"rec-section-title\">이 플랫폼을 추천한 이유</div>"
r "Explore ${rec.headline} resources →",
  "${rec.headline} 리소스 살펴보기 →"
r "const spotlightEyebrow = startHere ? 'Start Here' : 'Featured Capability';",
  "const spotlightEyebrow = startHere ? '여기서 시작하세요' : '주요 기능';"
r "rec.first_party_label || 'Available First-Party Copilot Agents'",
  "rec.first_party_label || '사용 가능한 자사 Copilot 에이전트'"
r "<span class=\"rec-section-title\">Available Templates</span>",
  "<span class=\"rec-section-title\">사용 가능한 템플릿</span>"
r "<span class=\"rec-section-title\">Best For</span>",
  "<span class=\"rec-section-title\">이런 경우에 적합</span>"
r "<span class=\"rec-section-title\">Important Considerations</span>",
  "<span class=\"rec-section-title\">고려해야 할 사항</span>"
r "aria-label=\"Copy shareable link to clipboard\"",
  "aria-label=\"공유 링크를 클립보드에 복사\""
r "📋 Share your results", "📋 결과 공유하기"

# --- 부팅 에러 ---
r "`Could not load advisor data: ${err.message}`",
  "`어드바이저 데이터를 불러오지 못했습니다: ${err.message}`"

# --- 탐색(Exploration) ---
r "title: 'Use agents',", "title: '에이전트 사용하기',"
r "description: 'Start with built-in or ready-made agents that work inside Microsoft 365 or across your work environment.',",
  "description: 'Microsoft 365 내부 또는 업무 환경 전반에서 동작하는 내장·완성형 에이전트로 시작하세요.',"
r "title: 'Build agents',", "title: '에이전트 만들기',"
r "description: 'Choose a platform for creating, extending, governing, and operating agents for your scenario.',",
  "description: '시나리오에 맞는 에이전트를 만들고, 확장하고, 관리하고, 운영할 플랫폼을 선택하세요.',"
r "<span class=\"exploration-card-spotlight-eyebrow\">Featured</span>",
  "<span class=\"exploration-card-spotlight-eyebrow\">주요 기능</span>"
r "class=\"exploration-card-link\">Explore resources →</a>",
  "class=\"exploration-card-link\">리소스 살펴보기 →</a>"

# --- 설문 ---
r "`Question ${currentQuestionIndex + 1} of ${total}`;",
  "`질문 ${currentQuestionIndex + 1} / ${total}`;"
r "? 'Get Recommendation ▶' : 'Next ▶';",
  "? '추천 결과 보기 ▶' : '다음 ▶';"

# --- 질문 축약 라벨 ---
r "const Q_SHORT_LABELS = {\n  q1: 'Builder',\n  q8: 'Audience',\n  q2: 'Deployment',\n  q4: 'Task type',\n  q3: 'Data access',\n};",
  "const Q_SHORT_LABELS = {\n  q1: '제작자',\n  q8: '사용 대상',\n  q2: '배포 위치',\n  q4: '작업 유형',\n  q3: '데이터 접근',\n};",
  'Q_SHORT_LABELS'

# --- 점수 사유 ---
r "if (perfectCount === 5) return 'Perfect fit — scored highest on every dimension.';",
  "if (perfectCount === 5) return '완벽한 적합 — 모든 항목에서 최고 점수를 기록했습니다.';"
r "if (perfectCount >= 4) return 'Strong match across nearly all dimensions.';",
  "if (perfectCount >= 4) return '거의 모든 항목에서 높은 적합도를 보였습니다.';"
r "return `Strongest on ${tops.join(' and ')}.`;",
  "return `${tops.join(', ')} 항목에서 가장 강점을 보였습니다.`;"
r "return `Close — lost ground on ${weakQs.join(' and ').toLowerCase()}.`;",
  "return `근소한 차이 — ${weakQs.join(', ')} 항목에서 뒤처졌습니다.`;"
r "return rec ? rec.scoring_summary : 'Limited fit for this scenario.';",
  "return rec ? rec.scoring_summary : '이 시나리오에는 적합도가 제한적입니다.';"
r "return `Weaker fit on ${weakQs.join(' and ').toLowerCase()}.`;",
  "return `${weakQs.join(', ')} 항목에서 적합도가 낮습니다.`;"
r "if (tops.length > 0) return `Best on ${tops.join(' and ')}, but outscored overall.`;",
  "if (tops.length > 0) return `${tops.join(', ')} 항목은 우수하지만 종합 점수에서 밀렸습니다.`;"

# --- 점수 그리드 ---
r "title=\"Disqualified\">—</span>", "title=\"제외됨\">—</span>"
r "const title = score === 3 ? 'Strong fit' : score === 2 ? 'Moderate fit' : score === 1 ? 'Weak fit' : 'No fit';",
  "const title = score === 3 ? '매우 적합' : score === 2 ? '보통' : score === 1 ? '낮음' : '부적합';"
r "const label = rankEntry ? rankEntry.label : 'Not recommended';",
  "const label = rankEntry ? rankEntry.label : '권장하지 않음';"
r "const gapText = gap === 0 ? 'Zero points separate' : `Only ${gap} point${gap !== 1 ? 's' : ''} separate${gap === 1 ? 's' : ''}`;",
  "const gapText = gap === 0 ? '상위 두 플랫폼의 점수가 동일합니다' : `상위 두 플랫폼의 점수 차이는 ${gap}점에 불과합니다`;"
r "closeCallout = `<p class=\"sc-close-callout\">📊 ${gapText} the top two platforms — your choice may come down to team skills and existing tooling.</p>`;",
  "closeCallout = `<p class=\"sc-close-callout\">📊 ${gapText} — 팀 역량과 기존 도구 환경이 선택의 기준이 될 수 있습니다.</p>`;"
r "<div class=\"sc-heading\">Score Breakdown</div>",
  "<div class=\"sc-heading\">점수 상세</div>"
r "<div class=\"sc-grid-heading\">Per-question fit</div>",
  "<div class=\"sc-grid-heading\">질문별 적합도</div>"
r "<span class=\"pq-dot pq-strong\"></span> Strong\n          <span class=\"pq-dot pq-moderate\"></span> Moderate\n          <span class=\"pq-dot pq-weak\"></span> Weak\n          <span class=\"pq-dot pq-none\"></span> None\n          <span class=\"pq-dot pq-zeroed\">—</span> Disqualified",
  "<span class=\"pq-dot pq-strong\"></span> 매우 적합\n          <span class=\"pq-dot pq-moderate\"></span> 보통\n          <span class=\"pq-dot pq-weak\"></span> 낮음\n          <span class=\"pq-dot pq-none\"></span> 해당 없음\n          <span class=\"pq-dot pq-zeroed\">—</span> 제외됨",
  'pq-legend'

# --- 위임(Delegate) 결과 ---
r "'<strong>Consider both.</strong> Scout can be the always-on layer that monitors and coordinates, ' +\n      'while Cowork assembles the Microsoft 365 deliverables on demand.';",
  "'<strong>두 가지를 함께 고려하세요.</strong> Scout는 상시 모니터링과 조율을 담당하고, ' +\n      'Cowork는 필요할 때 Microsoft 365 산출물을 완성하는 역할을 맡을 수 있습니다.';",
  'Consider both banner'
r "secondLabel.textContent = 'Also consider';", "secondLabel.textContent = '함께 고려할 선택지';"

# --- 추천 실패 ---
r "'<div class=\"rec-card\"><p>Unable to generate a recommendation. Please contact the CAT team.</p></div>';",
  "'<div class=\"rec-card\"><p>추천 결과를 생성할 수 없습니다. CAT 팀에 문의해 주세요.</p></div>';"

# --- 보조 카드 라벨 ---
r "secondLabel.textContent = 'Complementary platform:';",
  "secondLabel.textContent = '함께 쓰면 좋은 플랫폼:';"
r "secondLabel.textContent = 'Also consider:';",
  "secondLabel.textContent = '함께 고려할 선택지:';"

# --- Why not 설명 ---
r "return `${winnerMeta.label} edged out ${runnerMeta.label} on <strong>${dimension.toLowerCase()}</strong> — you selected \"${bestDelta.optionLabel}\".`;",
  "return `<strong>${dimension}</strong> 항목에서 ${winnerMeta.label}이(가) ${runnerMeta.label}보다 앞섰습니다 — 선택하신 답변: \"${bestDelta.optionLabel}\"`;"

# --- 결정 카드 ---
r "const dateStr = originalDate ? formatDateDisplay(originalDate) : 'a previous visit';",
  "const dateStr = originalDate ? formatDateDisplay(originalDate) : '이전 방문 시점';"
r "bannerEl.innerHTML = `Your recommendation has changed since ${dateStr}. The platform landscape has been updated. <a href=\"javascript:void(0)\" onclick=\"restart()\">Retake assessment →</a>`;",
  "bannerEl.innerHTML = `${dateStr} 이후 추천 결과가 변경되었습니다. 플랫폼 정보가 업데이트되었습니다. <a href=\"javascript:void(0)\" onclick=\"restart()\">다시 진단하기 →</a>`;"
r "driftEl.textContent = 'ℹ Some evaluation criteria have been updated since this recommendation was generated.';",
  "driftEl.textContent = 'ℹ 이 추천이 생성된 이후 일부 평가 기준이 업데이트되었습니다.';"

# --- 공유 버튼 ---
r "btn.textContent = '✓ Copied!';", "btn.textContent = '✓ 복사되었습니다';"
r "btn.textContent = 'Copy failed';", "btn.textContent = '복사 실패';"

# --- 탭 제목 ---
r "document.title = `APA: ${platformMeta.label} recommended`;",
  "document.title = `APA: ${platformMeta.label} 추천`;"
r "document.title = `APA: ${apa.recommendations[recommendedPlatformId].headline} recommended`;",
  "document.title = `APA: ${apa.recommendations[recommendedPlatformId].headline} 추천`;"

R.each { |from, to, label| js = sub!(js, from, to, "JS: #{label}") }
File.write(JS_DST, js, mode: 'wb:UTF-8')

# ============================================================================
# platform-advisor.html
# ============================================================================
html = File.read(HTML_SRC, mode: 'rb:UTF-8')
H = []
def h(from, to, label = nil)
  H << [from, to, label || from[0, 50]]
end

h '<p class="status-text">Loading advisor data…</p>', '<p class="status-text">어드바이저 데이터를 불러오는 중…</p>'
h '<h2 class="error-heading">Unable to load advisor</h2>', '<h2 class="error-heading">어드바이저를 불러올 수 없습니다</h2>'
h '<button class="btn btn-primary" onclick="boot()">Try Again</button>', '<button class="btn btn-primary" onclick="boot()">다시 시도</button>'

# Welcome
h "Answer a few questions about what you want from agents, and we'll recommend the best Microsoft platform for your agent needs.",
  '에이전트로 무엇을 하고 싶은지 몇 가지 질문에 답하시면, 요구에 가장 알맞은 Microsoft 플랫폼을 추천해 드립니다.'
h 'Here\'s what the advisor chooses between — select <strong>Get Started</strong> below to find your fit.',
  '어드바이저가 비교하는 대상은 다음과 같습니다. 아래 <strong>시작하기</strong>를 눌러 나에게 맞는 플랫폼을 찾아보세요.'
h '<div class="delegate-group-label">Use agents</div>', '<div class="delegate-group-label">에이전트 사용하기</div>'
h '<div class="delegate-group-label">Build agents</div>', '<div class="delegate-group-label">에이전트 만들기</div>'
h '<p class="platform-preview-desc">Get answers, draft content, and surface insights in seconds with secure AI chat</p>',
  '<p class="platform-preview-desc">안전한 AI 채팅으로 몇 초 만에 답변을 얻고, 콘텐츠를 작성하고, 인사이트를 발견하세요</p>'
h '<p class="platform-preview-desc">Describe the outcome you want, grounded in the work in your emails, meetings, messages, files, and data.</p>',
  '<p class="platform-preview-desc">원하는 결과를 설명하면 메일, 회의, 메시지, 파일, 데이터를 근거로 업무를 처리합니다</p>'
h '<p class="platform-preview-desc">Use always-on agents that work autonomously, with their own identity, grounded in your enterprise data </p>',
  '<p class="platform-preview-desc">자체 ID를 갖고 기업 데이터를 근거로 자율 동작하는 상시 실행 에이전트를 사용하세요</p>'
h '<p class="platform-preview-desc">Quickly build declarative agents by using natural language</p>',
  '<p class="platform-preview-desc">자연어만으로 선언형 에이전트를 빠르게 만드세요</p>'
h '<p class="platform-preview-desc">Create custom agents with natural language or a graphical interface</p>',
  '<p class="platform-preview-desc">자연어 또는 그래픽 인터페이스로 커스텀 에이전트를 만드세요</p>'
h '<p class="platform-preview-desc">Pro-code platform to build, ground, and govern AI apps and agents at scale</p>',
  '<p class="platform-preview-desc">AI 앱과 에이전트를 대규모로 구축·그라운딩·거버넌스하는 프로코드 플랫폼</p>'
h "      Get Started <span class=\"icon icon-chevron-right\"></span>",
  "      시작하기 <span class=\"icon icon-chevron-right\"></span>"

# Prescreen
h "      Where would you like to begin?\n", "      어디에서 시작하시겠어요?\n"
h '      Choose a starting point. This helps us tailor the best recommendation for you.',
  '      시작점을 선택하세요. 더 정확한 추천을 제공하는 데 도움이 됩니다.'
h '            Help me find the right place to get work done',
  '            업무를 처리하기에 알맞은 곳을 찾고 싶어요'
h "            Answer a few quick questions about how you want the work to happen, and we'll point you to the best place to do it",
  '            업무를 어떤 방식으로 진행하고 싶은지 몇 가지 질문에 답하시면 가장 알맞은 곳을 안내해 드립니다'
h "            I'd like to build a custom agent with specific requirements",
  '            구체적인 요구사항이 있는 커스텀 에이전트를 만들고 싶어요'
h '            Answer a few quick questions so we can recommend the right agent approach for your scenario',
  '            몇 가지 질문에 답하시면 시나리오에 맞는 에이전트 접근 방식을 추천해 드립니다'
h "            I'm exploring what's possible with agents",
  '            에이전트로 무엇이 가능한지 둘러보고 싶어요'
h '            Browse the ways to use or build agents and learn which scenarios each one is designed for',
  '            에이전트를 사용하거나 만드는 방법을 살펴보고 각각 어떤 시나리오에 적합한지 알아보세요'

# Delegate
h '<a href="#" class="exploration-back" onclick="showSection(\'prescreen-section\');pushState(\'prescreen-section\');return false">← Back to options</a>',
  '<a href="#" class="exploration-back" onclick="showSection(\'prescreen-section\');pushState(\'prescreen-section\');return false">← 선택지로 돌아가기</a>'
h '<h2 class="prescreen-heading">Where should you get this work done?</h2>',
  '<h2 class="prescreen-heading">이 업무는 어디에서 처리하는 게 좋을까요?</h2>'
h "      Microsoft 365 Copilot, Cowork, and Scout are all places to get work done. Answer a couple of\n      quick questions and we'll point you to the best entry point — and where to start inside it.",
  '      Microsoft 365 Copilot, Cowork, Scout는 모두 업무를 처리하는 공간입니다. 몇 가지 질문에 답하시면\n      가장 알맞은 시작점과 그 안에서 어디부터 시작할지 안내해 드립니다.'
h '<h3 class="delegate-question-title">How hands-on do you want to be?</h3>',
  '<h3 class="delegate-question-title">얼마나 직접 관여하고 싶으신가요?</h3>'
h "<div class=\"option-label\">I'll ask questions and work through it myself</div>",
  '<div class="option-label">직접 질문하며 제가 처리하겠습니다</div>'
h '<div class="option-label">Hand off the whole task and give me the result</div>',
  '<div class="option-label">업무 전체를 위임하고 결과만 받겠습니다</div>'
h '<h3 class="delegate-question-title">What kind of task is it?</h3>',
  '<h3 class="delegate-question-title">어떤 종류의 업무인가요?</h3>'
h '<div class="option-label">General help — brainstorm, find info, catch up on email or meetings, draft and edit documents</div>',
  '<div class="option-label">일반 업무 — 브레인스토밍, 정보 검색, 메일·회의 따라잡기, 문서 작성 및 편집</div>'
h '<div class="option-label">A specialized task — deep research, data analysis, meeting facilitation, or translation</div>',
  '<div class="option-label">전문 업무 — 심층 리서치, 데이터 분석, 회의 진행 또는 통번역</div>'
h '<h3 class="delegate-question-title">Should it finish and hand back, or keep working over time?</h3>',
  '<h3 class="delegate-question-title">한 번에 끝내고 결과를 받을까요, 계속 이어서 진행할까요?</h3>'
h '<div class="option-label">Finish a multi-step job in one go — several artifacts, or a process across systems — and hand me the result</div>',
  '<div class="option-label">다단계 업무를 한 번에 완료 — 여러 산출물이나 시스템 간 프로세스를 처리하고 결과를 전달</div>'
h '<div class="option-label">Stay always-on — manage and coordinate my day, following up and acting over time</div>',
  '<div class="option-label">상시 실행 — 하루 일정을 관리·조율하며 시간에 걸쳐 후속 조치를 수행</div>'
h '<h3 class="delegate-question-title">Where does it need to reach?</h3>',
  '<h3 class="delegate-question-title">어디까지 접근할 수 있어야 하나요?</h3>'
h '<div class="option-label">Inside Microsoft 365 — email, meetings, files, Teams</div>',
  '<div class="option-label">Microsoft 365 내부 — 메일, 회의, 파일, Teams</div>'
h '<div class="option-label">Also my desktop, browser, local files, and command line</div>',
  '<div class="option-label">데스크톱, 브라우저, 로컬 파일, 명령줄까지 포함</div>'
h '<div class="option-label">Not sure yet</div>', '<div class="option-label">아직 모르겠습니다</div>'
h "        See recommendation <span class=\"icon icon-chevron-right\"></span>",
  "        추천 결과 보기 <span class=\"icon icon-chevron-right\"></span>"

# Exploration
h '<h2 class="welcome-heading" style="font-size:2rem">Explore ways to use or build agents</h2>',
  '<h2 class="welcome-heading" style="font-size:2rem">에이전트를 사용하거나 만드는 방법 살펴보기</h2>'
h '<p class="welcome-description">Compare available agents and platforms for building your own.</p>',
  '<p class="welcome-description">사용 가능한 에이전트와 직접 만들 수 있는 플랫폼을 비교해 보세요.</p>'
h '<h3 class="exploration-cta-heading">Not sure which fits? Let the assessment guide you</h3>',
  '<h3 class="exploration-cta-heading">어떤 것이 맞을지 모르겠다면 진단을 통해 확인해 보세요</h3>'
h '<button class="btn btn-primary btn-lg" onclick="handlePrescreenNo()">Start the Assessment →</button>',
  '<button class="btn btn-primary btn-lg" onclick="handlePrescreenNo()">진단 시작하기 →</button>'

# Assessment nav
h "        <span class=\"icon icon-chevron-left\"></span> Back",
  "        <span class=\"icon icon-chevron-left\"></span> 이전"
h "        Next <span class=\"icon icon-chevron-right\"></span>",
  "        다음 <span class=\"icon icon-chevron-right\"></span>"

# Recommendation nav
h '>Recommendation</a>', '>추천 결과</a>'
h '>Also Consider</a>', '>함께 고려할 선택지</a>'
h '>Score Breakdown</a>', '>점수 상세</a>'
h "      See how we scored this <span class=\"score-toggle-chevron\">▾</span>",
  "      점수 산정 방식 보기 <span class=\"score-toggle-chevron\">▾</span>"
h "              If you need more customization, try the full assessment",
  '              더 많은 커스터마이징이 필요하다면 전체 진단을 진행해 보세요'
h '              Take the Full Assessment', '              전체 진단 시작하기'
h "              This recommendation was generated by the Agent Platform Advisor based on specific scenario answers.\n              <a href=\"javascript:void(0)\" onclick=\"restart()\">Take your own assessment →</a>",
  '              이 추천은 Agent Platform Advisor가 특정 시나리오 답변을 바탕으로 생성한 결과입니다.\n              <a href="javascript:void(0)" onclick="restart()">직접 진단해 보기 →</a>'
h "              ↩ Start Over", '              ↩ 처음부터 다시'

# Header / footer
h 'aria-label="Go to Get Started page">Agent Platform Advisor</a>',
  'aria-label="시작 페이지로 이동">Agent Platform Advisor</a>'
h 'aria-label="Switch color theme"', 'aria-label="테마 전환"'
h "      Created by\n", "      제작:\n"
h 'aria-label="Project documentation"', 'aria-label="프로젝트 문서"'
h '<p>If you encounter a problem, please', '<p>문제가 발생하면'
h '>create an issue</a>', '>이슈를 등록해 주세요</a>'

# <html lang>
h '<html lang="en">', '<html lang="ko">'

H.each { |from, to, label| html = sub!(html, from, to, "HTML: #{label}") }
File.write(HTML_DST, html, mode: 'wb:UTF-8')

# ============================================================================
puts "applied replacements : #{$applied}"
puts "failed               : #{$errors.size}"
if $errors.any?
  puts '--- NOT FOUND ---'
  $errors.each { |e| puts "  ! #{e}" }
  exit 1
end
puts 'OK'
