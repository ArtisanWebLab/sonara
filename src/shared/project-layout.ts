import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { ensureDir } from './fs-utils';

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

Before creating, modifying, or closing any task in \`tasks/\`, read \`tasks/README.md\` for the file format, workflow, and rules. Every task file also starts with an HTML comment pointing to it.
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
    return path.join(voiceLogDir(folder), 'vocabulary.md');
}

export function transcriptsDir(folder: vscode.WorkspaceFolder): string {
    return path.join(folder.uri.fsPath, VOICE_TRANSCRIPTS_FOLDER_NAME);
}

export function ensureProjectStructure(folder: vscode.WorkspaceFolder): void {
    const root = sonaraRoot(folder);
    ensureDir(root);
    ensureDir(tasksDir(folder));
    ensureDir(voiceLogDir(folder));
    ensureDir(transcriptsDir(folder));

    const readme = path.join(root, ROOT_README_FILE);
    if (!fs.existsSync(readme)) {
        fs.writeFileSync(readme, ROOT_README_CONTENT, 'utf8');
    }
}

export { ensureDir };
