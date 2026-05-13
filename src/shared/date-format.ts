export const pad2 = (value: number): string => String(value).padStart(2, '0');

export function formatDate(date: Date): string {
    return `${pad2(date.getDate())}.${pad2(date.getMonth() + 1)}.${date.getFullYear()}`;
}

export function formatTime(date: Date): string {
    return `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
}

export function formatDateTime(date: Date): string {
    return `${formatDate(date)} ${formatTime(date)}`;
}

export function formatDuration(seconds: number, style: 'short' | 'long' = 'long'): string {
    const total = Math.round(seconds);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const sep = style === 'short' ? '' : ' ';
    if (h > 0) {
        return `${h}h${sep}${m}m${style === 'long' ? `${sep}${s}s` : ''}`;
    }
    if (m > 0) {
        return `${m}m${sep}${s}s`;
    }
    return `${s}s`;
}
