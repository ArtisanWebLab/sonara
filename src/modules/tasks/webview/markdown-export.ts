import { TaskPriority, TaskStatus } from '../types';

export type CopyMarkdownMode = 'full' | 'summary';

export interface MarkdownTaskDto {
    id: string;
    title: string;
    status: TaskStatus | null;
    priority: TaskPriority;
    sprint: string | null;
    labels: string[];
    summary: string;
    relativePath: string;
    rawContent: string | null;
}

export interface MarkdownMetaDto {
    statuses: readonly TaskStatus[];
    statusLabels: Record<TaskStatus, string>;
    priorityLabels: Record<TaskPriority, string>;
    priorityRank: Record<TaskPriority, number>;
}

export interface BuildMarkdownOptions {
    mode: CopyMarkdownMode;
    onlyStatus?: TaskStatus | null;
}

export function buildTasksMarkdown(
    tasks: readonly MarkdownTaskDto[],
    meta: MarkdownMetaDto,
    options: BuildMarkdownOptions,
): string {
    const onlyStatusSpecified = 'onlyStatus' in options;
    const onlyStatus = options.onlyStatus;

    const filtered = onlyStatusSpecified
        ? tasks.filter(t => t.status === onlyStatus)
        : tasks.slice();

    const ordered: MarkdownTaskDto[] = [];
    if (onlyStatusSpecified) {
        ordered.push(...filtered.slice().sort(byPriority(meta)));
    } else {
        for (const status of meta.statuses) {
            ordered.push(...filtered.filter(t => t.status === status).sort(byPriority(meta)));
        }
        ordered.push(...filtered.filter(t => t.status === null).sort(byPriority(meta)));
    }

    return ordered.map(task => renderTask(task, options.mode)).join('\n\n');
}

function byPriority(meta: MarkdownMetaDto): (a: MarkdownTaskDto, b: MarkdownTaskDto) => number {
    return (a, b) => {
        const ra = meta.priorityRank[a.priority] ?? 99;
        const rb = meta.priorityRank[b.priority] ?? 99;
        if (ra !== rb) return ra - rb;
        return a.title.localeCompare(b.title);
    };
}

function renderTask(task: MarkdownTaskDto, mode: CopyMarkdownMode): string {
    const body = buildTaskBody(task, mode);
    return `>>> TASK: ${task.relativePath}\n\n${body}\n\n<<< END TASK`;
}

function buildTaskBody(task: MarkdownTaskDto, mode: CopyMarkdownMode): string {
    if (task.rawContent === null) {
        return `> [File not accessible: ${task.relativePath}]`;
    }
    const parts = splitFrontmatter(task.rawContent);
    if (!parts) return task.rawContent.trim();
    const { frontmatter, body } = parts;
    if (mode === 'full') {
        const tail = body.replace(/^\s+/, '').replace(/\s+$/, '');
        const head = frontmatter.replace(/\s+$/, '');
        return tail ? `${head}\n\n${tail}` : head;
    }
    const head = frontmatter.replace(/\s+$/, '');
    if (/^summary:\s*\S/m.test(frontmatter)) return head;
    const firstParagraph = extractFirstParagraph(body);
    return firstParagraph ? `${head}\n\n${firstParagraph}` : head;
}

function splitFrontmatter(raw: string): { frontmatter: string; body: string } | null {
    const text = raw.replace(/^﻿/, '');
    const openMatch = text.match(/(^|\r?\n)---\s*\r?\n/);
    if (!openMatch || openMatch.index === undefined) return null;
    const openOffset = openMatch.index + openMatch[1].length;
    const rest = text.slice(openOffset);
    const afterOpen = rest.slice(rest.indexOf('\n') + 1);
    const closeMatch = afterOpen.match(/(^|\r?\n)---\s*(?:\r?\n|$)/);
    if (!closeMatch || closeMatch.index === undefined) return null;
    const afterOpenStart = rest.indexOf('\n') + 1;
    const frontmatterEnd = afterOpenStart + closeMatch.index + closeMatch[0].length;
    const frontmatter = rest.slice(0, frontmatterEnd);
    const body = rest.slice(frontmatterEnd);
    return { frontmatter, body };
}

function extractFirstParagraph(body: string): string {
    const trimmed = body.replace(/^\s*\r?\n/, '');
    if (!trimmed) return '';
    const lines = trimmed.split(/\r?\n/);
    const collected: string[] = [];
    for (const line of lines) {
        if (line.trim() === '') {
            if (collected.length > 0) break;
            continue;
        }
        collected.push(line);
    }
    return collected.join('\n').trim();
}
