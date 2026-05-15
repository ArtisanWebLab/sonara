export const TIME_TRACKER_README_CONTENT = `# Time Tracker

This folder stores time-tracking data for tasks under \`tasks/\`. It is created and maintained by the Sonara extension.

## File layout

\`\`\`
time-tracker/
  days/
    {userKey}/
      {YYYY-MM-DD}.json
\`\`\`

- \`userKey\` - a filename-safe key derived from your git email or a name you entered manually. You are asked once on the first time you start a timer.
- One JSON file per user per day. Times for all tasks worked on that day live in the same file.

## Day file format

\`\`\`json
{
  "date": "2026-05-14",
  "tasks": {
    "add-time-tracker-module": {
      "total": 2400,
      "slots": [
        {"start": "2026-05-14T09:00:00+03:00", "seconds": 900},
        {"start": "2026-05-14T09:15:00+03:00", "seconds": 900},
        {"start": "2026-05-14T10:00:00+03:00", "seconds": 600}
      ]
    }
  }
}
\`\`\`

- Key under \`tasks\` is the task slug (the markdown filename in \`tasks/\` without \`.md\`).
- \`total\` is the sum of seconds for that task on this day. Source of truth for the time shown on a task card.
- \`slots\` is a flat list of 15-minute slots. Each \`start\` is an ISO 8601 timestamp with the local UTC offset, not bare UTC. Two records with the same wall-clock time but different offsets (DST transition) are kept as separate slots.

## How tracking works

- The active task slug is stored in VS Code \`globalState\`. There can be at most one active timer at a time.
- While a timer is active, the extension writes \`+15\` seconds into the current slot every 15 seconds (configurable).
- If you close VS Code while a timer is active, no ticks are recorded until you open VS Code again. On startup the extension asks whether to continue or stop.
- If the task markdown file is renamed or deleted while its timer is active, the timer stops automatically. The accumulated time remains in the day file under the old slug.

## Hand edits

The day file is plain JSON. You can edit it. On the next \`Start\` or \`Stop\` for that day, the extension recomputes \`total\` as the sum of \`slots[*].seconds\`.
`;
