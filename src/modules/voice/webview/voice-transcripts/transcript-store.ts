import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import matter from 'gray-matter';

import { TranscriptFile } from './types';
import { SUMMARY_PLACEHOLDER } from './transcript-formatter';

const TRANSCRIPT_EXTENSION = '.md';
const SUMMARY_SECTION_PATTERN = /^##\s+Summary\s*$/m;
const PREAMBLE_BYTES = 4096;
const NON_TRANSCRIPT_FILES = new Set(['README.md']);

interface TranscriptHeader {
    source?: string;
    created?: string;
    duration_sec?: number;
    language?: string;
}

export class TranscriptStore implements vscode.Disposable {
    private readonly onChangedEmitter = new vscode.EventEmitter<void>();
    readonly onChanged = this.onChangedEmitter.event;

    private watcher: fs.FSWatcher | null = null;

    constructor(public readonly storageDir: string | null) {
        this.startWatching();
    }

    refresh(): void {
        if (!this.watcher) {
            this.startWatching();
        }
        this.onChangedEmitter.fire();
    }

    async list(): Promise<TranscriptFile[]> {
        if (!this.storageDir || !fs.existsSync(this.storageDir)) {
            return [];
        }

        const entries = fs.readdirSync(this.storageDir, { withFileTypes: true });
        const files: TranscriptFile[] = [];

        for (const entry of entries) {
            if (!entry.isFile() || !entry.name.endsWith(TRANSCRIPT_EXTENSION)) {
                continue;
            }
            if (NON_TRANSCRIPT_FILES.has(entry.name)) {
                continue;
            }

            const fullPath = path.join(this.storageDir, entry.name);
            const stat = fs.statSync(fullPath);
            const preamble = this.readPreamble(fullPath);
            const header = this.parseHeader(preamble);
            const summary = this.parseSummary(preamble);

            files.push({
                id: entry.name,
                sourceName: header.source ?? path.parse(entry.name).name,
                createdAt: header.created ?? stat.mtime.toISOString(),
                durationSec: header.duration_sec,
                language: header.language,
                summary,
            });
        }

        files.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        return files;
    }

    private readPreamble(filePath: string): string {
        try {
            const fd = fs.openSync(filePath, 'r');
            const buffer = Buffer.alloc(PREAMBLE_BYTES);
            const bytesRead = fs.readSync(fd, buffer, 0, PREAMBLE_BYTES, 0);
            fs.closeSync(fd);
            return buffer.toString('utf8', 0, bytesRead);
        } catch {
            return '';
        }
    }

    private parseHeader(preamble: string): TranscriptHeader {
        const forParser = stripLeadingHtmlComments(preamble.replace(/^﻿/, ''));
        if (!/^---\s*\r?\n/.test(forParser)) {
            return {};
        }
        try {
            const data = matter(forParser).data as Record<string, unknown>;
            const header: TranscriptHeader = {};
            if (typeof data.source === 'string') header.source = data.source;
            if (typeof data.created === 'string') {
                header.created = data.created;
            } else if (data.created instanceof Date) {
                header.created = data.created.toISOString();
            }
            if (typeof data.duration_sec === 'number') header.duration_sec = data.duration_sec;
            if (typeof data.language === 'string') header.language = data.language;
            return header;
        } catch {
            return {};
        }
    }

    private parseSummary(preamble: string): string | undefined {
        const match = preamble.match(SUMMARY_SECTION_PATTERN);
        if (!match || match.index === undefined) {
            return undefined;
        }
        const afterHeading = preamble.slice(match.index + match[0].length);
        const stopIndex = afterHeading.search(/\n---\s*\n|\n##\s+|\n\*\*[A-Za-z]/);
        const body = (stopIndex === -1 ? afterHeading : afterHeading.slice(0, stopIndex)).trim();
        if (!body || body === SUMMARY_PLACEHOLDER) {
            return undefined;
        }
        return body;
    }

    async delete(fileName: string): Promise<void> {
        if (!this.storageDir) {
            return;
        }
        const fullPath = path.join(this.storageDir, fileName);
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            this.onChangedEmitter.fire();
        }
    }

    private startWatching(): void {
        if (!this.storageDir || !fs.existsSync(this.storageDir)) {
            return;
        }
        try {
            this.watcher = fs.watch(this.storageDir, { persistent: false }, (_event, fileName) => {
                if (fileName && fileName.endsWith(TRANSCRIPT_EXTENSION)) {
                    this.onChangedEmitter.fire();
                }
            });
        } catch {
            // Watch failed - fine, panel will refresh on visibility change
        }
    }

    private stopWatching(): void {
        this.watcher?.close();
        this.watcher = null;
    }

    dispose(): void {
        this.stopWatching();
        this.onChangedEmitter.dispose();
    }
}

function stripLeadingHtmlComments(text: string): string {
    let rest = text.replace(/^\s+/, '');
    while (rest.startsWith('<!--')) {
        const end = rest.indexOf('-->');
        if (end === -1) {
            break;
        }
        rest = rest.slice(end + 3).replace(/^\s+/, '');
    }
    return rest;
}
