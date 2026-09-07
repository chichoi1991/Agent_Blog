---
layout: "chapter"
lang: en
date: 2026-06-15
title: "Part 3 · Add connectors and MCP (Mail · OneDrive)"
short_title: "Add connectors and MCP"
description: "Add the tools needed for sending email and attaching links with minimal curation."
order: 5
category: "newcs"
parent: "ncs3"
---

## 6. Add connectors and MCP (Mail · OneDrive)

> **▶ Goal:** Attach the tools needed to actually perform the tasks encoded in the skills (sending email and attaching links). Use **minimal curation** (no overlapping tools, Part 2, Chapter 3).

### 6.1 Tools to add

| Tool | Purpose | Notes |
|---|---|---|
| **Work IQ Mail (MCP)** | Create and send email drafts | Use **only one** mail tool |
| **OneDrive (MCP)** | Attach the dashboard as a link | Avoid token explosion from direct attachments (Base64) |
| (Automatic) code interpreter | Analyze Excel and generate HTML | New core capability; no separate connector required |

1. In **Tools → Add a tool**, choose **Office 365 Outlook** and **OneDrive for Business**.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/3-tools-add.png' | relative_url }}" alt="Select Office 365 Outlook and OneDrive for Business in Tools → Add a tool" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Select Office 365 Outlook and OneDrive for Business in Tools → Add a tool</figcaption>
</figure>

2. In Office 365 Outlook, select **Use an MCP server → Work IQ Mail MCP** (as an MCP server, not a one-off action).

<figure class="screenshot">
  <img src="{{ '/assets/newcs/3-tools-mcp.png' | relative_url }}" alt="Select Office 365 Outlook → Use an MCP server → Work IQ Mail MCP" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Select Office 365 Outlook → Use an MCP server → Work IQ Mail MCP</figcaption>
</figure>

### 6.2 Steps

1. On the Build page, go to **Tools → Add tool**.
2. Add **Mail MCP** → connect it (sign in / consent to permissions).
3. Add **OneDrive MCP** → connect it.
4. Confirm that the tools are visible in the session.

### 6.3 Tool tips (Part 2, Chapter 3)

- **Do not add overlapping tools** — If you attach two mail connectors, the agent gets confused every time. Use only Mail MCP.
- **Do not add tools for things code can do** — docx/pptx/HTML generation is covered by the code interpreter → no document-generation connector needed.
- **Use OneDrive to avoid attachment-token issues** — If you attach HTML directly, Base64 conversion can blow up the token count. Upload → attach link is the standard pattern (encoded in the email/report skill).

> **Checkpoint:** If the OneDrive tool is not visible when the session starts, reconnect the MCP. If email attachments fail, check the tool connection first.

---
