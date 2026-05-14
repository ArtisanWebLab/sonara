import { TranscribedSegment } from '../../server/api-client';
import { formatDateTime, formatDuration, pad2 } from '../../../../shared/date-format';

const TIMESTAMP_INTERVAL_SEC = 60;
const HEADER_COMMENT = '<!-- Sonara voice transcript. Format and rules: .vscode/sonara/voice-transcripts/README.md -->';

export const SUMMARY_PLACEHOLDER =
    '_No summary yet. Replace this line with a 2-3 bullet summary, under 200 characters total. The UI only renders the first 3 lines - anything longer is invisible. Keep it short and in the transcript language._';

export interface TranscriptMeta {
    source: string;
    createdAt: string;
    durationSec: number;
    language: string;
    processingTimeSec: number;
    model: string;
}

export function formatTranscriptMarkdown(segments: TranscribedSegment[], meta: TranscriptMeta): string {
    const lines: string[] = [];
    lines.push('---');
    lines.push(`source: ${meta.source}`);
    lines.push(`created: ${meta.createdAt}`);
    lines.push(`duration_sec: ${meta.durationSec}`);
    lines.push(`language: ${meta.language}`);
    lines.push(`model: ${meta.model}`);
    lines.push(`processing_time_sec: ${meta.processingTimeSec}`);
    lines.push('---');
    lines.push('');
    lines.push(HEADER_COMMENT);
    lines.push('');
    lines.push('## Summary');
    lines.push('');
    lines.push(SUMMARY_PLACEHOLDER);
    lines.push('');
    lines.push('---');
    lines.push('');
    lines.push(`**Transcribed:** ${formatDateTime(new Date(meta.createdAt))}  `);
    lines.push(`**Duration:** ${formatDuration(meta.durationSec)}  `);
    lines.push(`**Language:** ${meta.language}  `);
    lines.push(`**Model:** ${meta.model}`);
    lines.push('');

    let lastTimestamp = -TIMESTAMP_INTERVAL_SEC;

    for (const segment of segments) {
        if (segment.start - lastTimestamp >= TIMESTAMP_INTERVAL_SEC) {
            lines.push('');
            lines.push(`[${formatTimecode(segment.start)}]`);
            lastTimestamp = segment.start;
        }
        lines.push(segment.text.trim());
    }

    lines.push('');
    return lines.join('\n');
}

export function formatTimestampForFileName(date: Date): string {
    return (
        `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}` +
        `_${pad2(date.getHours())}-${pad2(date.getMinutes())}-${pad2(date.getSeconds())}`
    );
}

export function sanitizeFileName(source: string): string {
    return source
        .replace(/\.[^.]+$/, '')
        .replace(/[^a-zA-Zа-яА-Я0-9._-]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80)
        || 'transcript';
}

function formatTimecode(seconds: number): string {
    const total = Math.floor(seconds);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
}
