import * as vscode from 'vscode';
import matter from 'gray-matter';
import { TaskStore } from '../store/task-store';
import { atomicWrite, openInEditor } from '../../../shared/fs-utils';
import { generateUniqueFilename } from '../file-system/path-utils';
import { TASK_FILE_HEADER } from '../templates/task-file-header';
import { TaskStatus } from '../types';

export async function executeNewTask(store: TaskStore, initialStatus: TaskStatus = 'inbox'): Promise<void> {
    const tasksDir = store.getTasksDir();
    if (!tasksDir) {
        await vscode.window.showErrorMessage('Open a workspace folder first to manage tasks.');
        return;
    }

    const title = await vscode.window.showInputBox({
        prompt: 'Task title',
        placeHolder: 'e.g. Add login screen',
        ignoreFocusOut: true,
        validateInput: value => (value.trim() === '' ? 'Title cannot be empty' : null),
    });
    if (!title) {
        return;
    }
    const trimmedTitle = title.trim();

    const filename = await generateUniqueFilename(tasksDir, trimmedTitle);
    const fileUri = vscode.Uri.joinPath(tasksDir, filename);

    const data: Record<string, unknown> = {
        title: trimmedTitle,
        status: initialStatus,
        priority: 'medium',
        created: new Date(),
    };
    const content = TASK_FILE_HEADER + matter.stringify('\n', data);
    await atomicWrite(fileUri, content);

    const editor = await openInEditor(fileUri);
    const document = editor.document;
    const lastLine = document.lineCount - 1;
    const cursor = new vscode.Position(lastLine, document.lineAt(lastLine).text.length);
    editor.selection = new vscode.Selection(cursor, cursor);
}
