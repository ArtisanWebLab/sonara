import * as path from 'path';

export function taskFileSlug(fsPath: string): string | null {
    const base = path.basename(fsPath);
    if (!base.toLowerCase().endsWith('.md')) return null;
    return base.slice(0, -3);
}
