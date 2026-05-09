import * as vscode from 'vscode';

import { CommandDeps } from './types';
import { voiceLogDir } from '../../../shared/project-layout';

export function registerStorageCommands(deps: CommandDeps): void {
    const { extensionContext, activeProject } = deps;

    extensionContext.subscriptions.push(
        vscode.commands.registerCommand('sonara.voice.openStorageFolder', async () => {
            const folder = activeProject.get();
            if (!folder) {
                vscode.window.showInformationMessage('Open a folder to use voice features.');
                return;
            }
            await vscode.env.openExternal(vscode.Uri.file(voiceLogDir(folder)));
        }),

        vscode.commands.registerCommand('sonara.voice.openGlobalStorageFolder', async () => {
            vscode.window.showInformationMessage(
                'Voice log and transcripts now live inside your workspace folders, not in global storage. ' +
                'Use "Voice: Open Project Storage Folder" to open the current project\'s storage.'
            );
        }),
    );
}
