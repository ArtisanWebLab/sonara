export const TASKS_README_CONTENT = `# Tasks

Project task list. Each file is one task: YAML frontmatter + free-form markdown body. Files are committed with the repo.

## File layout

A task file has three sections in this exact order:

1. **HTML comment marker** (line 1, mandatory) - tells humans and tools this is a Sonara task
2. **YAML frontmatter** - metadata block fenced with \`---\`
3. **Markdown body** - free-form description

\`\`\`markdown
<!-- Sonara task. Format and rules: .vscode/sonara/tasks/README.md -->

---
title: Short task title
status: inbox
priority: medium
sprint: 2026-W19
labels: [auth, bug]
created: 2026-04-27T12:00:00.000Z
updated: 2026-04-27T12:00:00.000Z
---

Free-form markdown body.
\`\`\`

**Spacing rules:**
- One blank line between the HTML comment and the opening \`---\`
- One blank line between the closing \`---\` and the body
- No leading whitespace before the HTML comment (it must be on line 1)

**Filename:** \`kebab-case\` derived from the title, \`.md\` extension. Example: \`fix-race-condition-in-webhook-queue.md\`. The file lives directly in \`.vscode/sonara/tasks/\` (no subfolders).

## Frontmatter

| Field | Required | Notes |
|---|---|---|
| \`title\` | yes | short title |
| \`status\` | yes | see Workflow |
| \`priority\` | no | default \`medium\` |
| \`sprint\` | no | free string (e.g. \`2026-W19\`, \`sprint-12\`, \`release-0.3\`); one per task |
| \`labels\` | no | array of free strings (epics or tags); auto-aggregated across tasks |
| \`created\` | yes | ISO, set automatically |
| \`updated\` | no | ISO, update on every change |

Unknown fields are preserved as-is.

## Workflow

\`inbox\` -> \`backlog\` -> \`todo\` -> \`in-progress\` -> \`review\` -> \`done\` -> \`archived\`

- \`inbox\` - default entry point for every new task
- \`backlog\` - long-term pile, collapsed by default
- \`todo\` - selected for the current iteration
- \`in-progress\` - active work
- \`review\` - awaiting human verification
- \`done\` - accepted, collapsed by default
- \`archived\` - closed or cancelled, collapsed by default

## Priority

\`highest\`, \`high\`, \`medium\`, \`low\`, \`lowest\` (most to least urgent). Sorted within a section by priority, then by \`created\`.

## Rules for AI agents

- Default \`status\` for new tasks: \`inbox\`. Never put a new task straight into \`backlog\`/\`todo\`/further without being asked.
- When merging or rewriting a task, set its \`status\` back to \`inbox\` and ask the user where it belongs now.
- Update \`updated\` on every change.
- Move through stages in order; skipping is allowed only when the user explicitly says so.
- Never write directly to \`done\` or \`archived\` without going through \`review\`, unless the user explicitly skips it.
- Cancelled work -> \`archived\` with a short reason in the body.
- Don't modify other tasks without an explicit request.

### Body structure

Break the body into actionable checkboxes so progress is trackable:

\`\`\`markdown
- [ ] Do this
- [ ] Check that
\`\`\`

### Closing a task

Before changing status to \`done\` or \`archived\`:

1. Mark each checklist item: \`- [x]\` for done, leave unchecked with an inline note for skipped (\`- [ ] X - skipped, no longer relevant\`).
2. Append a 2-4 sentence completion summary at the bottom of the body.
`;
