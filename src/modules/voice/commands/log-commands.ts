import * as vscode from 'vscode';

import { CommandDeps } from './types';
import { voiceLogFile } from '../../../shared/project-layout';
import { openInEditor, pathExists } from '../../../shared/fs-utils';

export function registerLogCommands(deps: CommandDeps): void {
    const { extensionContext, voiceLogPanel, activeProject } = deps;

    function currentLogStore() {
        return voiceLogPanel.getCurrentLogStore();
    }

    extensionContext.subscriptions.push(
        vscode.commands.registerCommand('sonara.voice.showLog', () => {
            vscode.commands.executeCommand('sonara.voice.log.focus');
        }),

        vscode.commands.registerCommand('sonara.voice.copyLastTranscription', async () => {
            const records = await currentLogStore().list();
            if (records.length === 0) {
                vscode.window.showInformationMessage('No voice records yet.');
                return;
            }
            await vscode.env.clipboard.writeText(records[0].text);
            vscode.window.showInformationMessage('Copied last transcription.');
        }),

        vscode.commands.registerCommand('sonara.voice.searchLog', () => {
            vscode.commands.executeCommand('sonara.voice.showLog');
            voiceLogPanel.focusSearch();
        }),

        vscode.commands.registerCommand('sonara.voice.toggleShowAll.expand', () => {
            voiceLogPanel.toggleShowAll();
        }),
        vscode.commands.registerCommand('sonara.voice.toggleShowAll.collapse', () => {
            voiceLogPanel.toggleShowAll();
        }),

        vscode.commands.registerCommand('sonara.voice.clearProjectLog', async () => {
            const confirm = await vscode.window.showWarningMessage(
                'Clear all voice log records for this project?',
                { modal: true },
                'Clear All'
            );
            if (confirm === 'Clear All') {
                await currentLogStore().clear();
            }
        }),

        vscode.commands.registerCommand('sonara.voice.exportLogMarkdown', async () => {
            const markdown = await currentLogStore().exportMarkdown();
            const doc = await vscode.workspace.openTextDocument({
                content: markdown,
                language: 'markdown',
            });
            await vscode.window.showTextDocument(doc);
        }),

        vscode.commands.registerCommand('sonara.voice.openLogFile', async () => {
            const folder = activeProject.get();
            if (!folder) {
                vscode.window.showInformationMessage('Open a folder to use voice features.');
                return;
            }
            const logPath = voiceLogFile(folder);
            if (!(await pathExists(logPath))) {
                vscode.window.showInformationMessage('No voice log file yet.');
                return;
            }
            await openInEditor(logPath);
        }),
    );
}
