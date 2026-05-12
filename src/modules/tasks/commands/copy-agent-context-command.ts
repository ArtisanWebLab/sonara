import * as vscode from 'vscode';
import * as path from 'path';
import { ActiveProject } from '../../../shared/active-project';

export async function executeCopyAgentContext(activeProject: ActiveProject): Promise<void> {
    const project = activeProject.get();
    if (!project) {
        vscode.window.showWarningMessage('No active Sonara project. Switch to a project first.');
        return;
    }

    const absolutePath = path.join(project.uri.fsPath, '.vscode', 'sonara', 'tasks', 'README.md');
    const message = `Read ${absolutePath} first to learn how Sonara tasks work in this project, then proceed.`;

    await vscode.env.clipboard.writeText(message);
    vscode.window.showInformationMessage('Sonara agent context copied to clipboard.');
}
