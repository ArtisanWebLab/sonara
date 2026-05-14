import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { ensureDir } from './fs-utils';
import { TASKS_README_CONTENT } from '../modules/tasks/templates/tasks-readme';
import { VOCABULARY_TEMPLATE } from '../modules/voice/templates/vocabulary-template';
import { VOICE_TRANSCRIPTS_README_CONTENT } from '../modules/voice/templates/voice-transcripts-readme';

const SONARA_ROOT = '.vscode/sonara';

export const TASKS_FOLDER_NAME = `${SONARA_ROOT}/tasks`;
export const VOICE_LOG_FOLDER_NAME = `${SONARA_ROOT}/voice-log`;
export const VOICE_TRANSCRIPTS_FOLDER_NAME = `${SONARA_ROOT}/voice-transcripts`;

const ROOT_README_FILE = 'README.md';

const ROOT_README_CONTENT = `# Sonara

This folder is created and maintained by the Sonara VS Code extension. It holds project-scoped data for three tools:

- \`tasks/\` - markdown task files (one task per file).
- \`voice-log/\` - dictation log + project-specific Whisper vocabulary.
- \`voice-transcripts/\` - file transcripts.

Whether this folder (or parts of it) is committed to git is up to your project. The extension does not manage \`.gitignore\` - add the paths you want to ignore to your project's \`.gitignore\` if needed. Voice data may contain personal recordings; consider excluding \`voice-log/\` and \`voice-transcripts/\` from shared repositories.

If your workspace has multiple folders, switch between them using the Active Project selector at the top of the Sonara sidebar. Each folder has its own independent dataset.

## For AI agents

- Before creating, modifying, or closing any task in \`tasks/\`, read \`tasks/README.md\` for the file format and rules.
- \`vocabulary.md\` biases Whisper dictation across the whole project (voice-log, voice-transcripts, dictated task input). One term per line; \`#\` lines are comments. When the user corrects a misrecognized term, propose adding it. Write to the file only on explicit confirmation.
`;

export function sonaraRoot(folder: vscode.WorkspaceFolder): string {
    return path.join(folder.uri.fsPath, SONARA_ROOT);
}

export function tasksDir(folder: vscode.WorkspaceFolder): string {
    return path.join(folder.uri.fsPath, TASKS_FOLDER_NAME);
}

export function voiceLogDir(folder: vscode.WorkspaceFolder): string {
    return path.join(folder.uri.fsPath, VOICE_LOG_FOLDER_NAME);
}

export function voiceLogFile(folder: vscode.WorkspaceFolder): string {
    return path.join(voiceLogDir(folder), 'voice-log.jsonl');
}

export function vocabularyFile(folder: vscode.WorkspaceFolder): string {
    return path.join(sonaraRoot(folder), 'vocabulary.md');
}

export function transcriptsDir(folder: vscode.WorkspaceFolder): string {
    return path.join(folder.uri.fsPath, VOICE_TRANSCRIPTS_FOLDER_NAME);
}

interface SeedFile {
    path: string;
    content: string;
}

export function ensureSonaraProject(folder: vscode.WorkspaceFolder): void {
    ensureDir(sonaraRoot(folder));
    ensureDir(tasksDir(folder));
    ensureDir(voiceLogDir(folder));
    ensureDir(transcriptsDir(folder));

    const seeds: SeedFile[] = [
        { path: path.join(sonaraRoot(folder), ROOT_README_FILE), content: ROOT_README_CONTENT },
        { path: path.join(tasksDir(folder), ROOT_README_FILE), content: TASKS_README_CONTENT },
        { path: path.join(transcriptsDir(folder), ROOT_README_FILE), content: VOICE_TRANSCRIPTS_README_CONTENT },
        { path: vocabularyFile(folder), content: VOCABULARY_TEMPLATE },
    ];

    for (const seed of seeds) {
        if (!fs.existsSync(seed.path)) {
            fs.writeFileSync(seed.path, seed.content, 'utf8');
        }
    }
}

export { ensureDir };
