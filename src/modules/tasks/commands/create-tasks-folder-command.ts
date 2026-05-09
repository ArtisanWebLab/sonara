import * as vscode from 'vscode';
import { TaskStore } from '../store/task-store';
import { ensureTasksFolder } from './ensure-tasks-folder';
import { INITIAL_TASK_FILENAME } from '../templates/initial-task';
import { openInEditor } from '../../../shared/fs-utils';

export async function executeCreateTasksFolder(store: TaskStore): Promise<void> {
    const ensured = await ensureTasksFolder(store);
    if (!ensured) {
        return;
    }

    if (ensured.initialized) {
        const welcomeUri = vscode.Uri.joinPath(ensured.tasksDir, INITIAL_TASK_FILENAME);
        try {
            await openInEditor(welcomeUri);
        } catch {
            // welcome file not present, skip silently
        }
    }
}
