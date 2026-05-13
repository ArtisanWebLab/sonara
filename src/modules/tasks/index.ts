import * as vscode from 'vscode';
import { TaskStore } from './store/task-store';
import { TasksWebviewPanel } from './webview/tasks-webview-panel';
import { executeNewTask } from './commands/new-task-command';
import { executeRefresh } from './commands/refresh-command';
import { executeCopyAgentContext } from './commands/copy-agent-context-command';
import { ActiveProject } from '../../shared/active-project';

export async function registerTasksModule(
    context: vscode.ExtensionContext,
    activeProject: ActiveProject,
): Promise<void> {
    const store = new TaskStore(activeProject);
    context.subscriptions.push(store);

    const panel = new TasksWebviewPanel(store, context.extensionUri, context.workspaceState);
    context.subscriptions.push(panel);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(TasksWebviewPanel.VIEW_ID, panel, {
            webviewOptions: { retainContextWhenHidden: true },
        }),
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('sonara.tasks.new', () => executeNewTask(store)),
        vscode.commands.registerCommand('sonara.tasks.copyAgentContext', () => executeCopyAgentContext(activeProject)),
        vscode.commands.registerCommand('sonara.tasks.refresh', () => executeRefresh(store)),
    );

    await store.initialize();
}
