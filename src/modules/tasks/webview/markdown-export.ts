import { TaskPriority, TaskStatus } from '../types';

export interface MarkdownTaskDto {
    id: string;
    title: string;
    status: TaskStatus | null;
    priority: TaskPriority;
    sprint: string | null;
    labels: string[];
    summary: string;
}

export interface MarkdownMetaDto {
    statuses: readonly TaskStatus[];
    statusLabels: Record<TaskStatus, string>;
    priorityLabels: Record<TaskPriority, string>;
    priorityRank: Record<TaskPriority, number>;
}

export interface BuildMarkdownOptions {
    onlyStatus?: TaskStatus | null;
}

const NO_STATUS_LABEL = 'No Status';
const TABLE_HEADER = '| Title | Priority | Sprint | Labels | Summary |\n|---|---|---|---|---|';

export function buildTasksMarkdown(
    tasks: readonly MarkdownTaskDto[],
    meta: MarkdownMetaDto,
    options: BuildMarkdownOptions = {},
): string {
    const onlyStatusSpecified = 'onlyStatus' in options;
    const onlyStatus = options.onlyStatus;

    const filtered = onlyStatusSpecified
        ? tasks.filter(t => t.status === onlyStatus)
        : tasks.slice();

    const sections: string[] = [];

    if (onlyStatusSpecified) {
        const label = onlyStatus == null ? NO_STATUS_LABEL : (meta.statusLabels[onlyStatus] ?? onlyStatus);
        const sorted = filtered.slice().sort(byPriority(meta));
        const block = renderSection(label, sorted);
        if (block) sections.push(block);
    } else {
        for (const status of meta.statuses) {
            const list = filtered.filter(t => t.status === status).sort(byPriority(meta));
            const block = renderSection(meta.statusLabels[status] ?? status, list);
            if (block) sections.push(block);
        }
        const noStatusList = filtered.filter(t => t.status === null).sort(byPriority(meta));
        const noStatusBlock = renderSection(NO_STATUS_LABEL, noStatusList);
        if (noStatusBlock) sections.push(noStatusBlock);
    }

    return sections.join('\n\n');
}

function byPriority(meta: MarkdownMetaDto): (a: MarkdownTaskDto, b: MarkdownTaskDto) => number {
    return (a, b) => {
        const ra = meta.priorityRank[a.priority] ?? 99;
        const rb = meta.priorityRank[b.priority] ?? 99;
        if (ra !== rb) return ra - rb;
        return a.title.localeCompare(b.title);
    };
}

function renderSection(label: string, tasks: readonly MarkdownTaskDto[]): string {
    if (tasks.length === 0) return '';
    const rows = tasks.map(renderRow).join('\n');
    return `## ${label}\n\n${TABLE_HEADER}\n${rows}`;
}

function renderRow(task: MarkdownTaskDto): string {
    const title = escapeCell(task.title);
    const priority = escapeCell(task.priority);
    const sprint = escapeCell(task.sprint ?? '');
    const labels = escapeCell((task.labels ?? []).join(', '));
    const summary = escapeCell(task.summary ?? '');
    return `| ${title} | ${priority} | ${sprint} | ${labels} | ${summary} |`;
}

function escapeCell(value: string): string {
    return String(value)
        .replace(/\r\n|\r|\n/g, ' ')
        .replace(/\|/g, '\\|')
        .trim();
}
