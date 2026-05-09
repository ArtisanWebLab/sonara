import * as vscode from 'vscode';
import * as fs from 'fs';

import { CommandDeps } from './types';
import { modelsDir, pythonVenvDir } from '../../../shared/server-runtime';

export function registerServerCommands(deps: CommandDeps): void {
    const { extensionContext, server, extensionLog, serverLog } = deps;

    extensionContext.subscriptions.push(
        vscode.commands.registerCommand('sonara.voice.restartServer', async () => {
            await server.restart();
            vscode.window.showInformationMessage('Voice server restarted.');
        }),

        vscode.commands.registerCommand('sonara.voice.showServerLogs', () => {
            serverLog.show();
        }),

        vscode.commands.registerCommand('sonara.voice.showExtensionLogs', () => {
            extensionLog.show();
        }),

        vscode.commands.registerCommand('sonara.voice.resetExtension', async () => {
            const confirm = await vscode.window.showWarningMessage(
                'Reset voice server? This will delete the Python venv and all downloaded models.',
                { modal: true },
                'Reset',
            );
            if (confirm !== 'Reset') {
                return;
            }
            await server.stop();
            const storageDir = extensionContext.globalStorageUri.fsPath;
            fs.rmSync(pythonVenvDir(storageDir), { recursive: true, force: true });
            fs.rmSync(modelsDir(storageDir), { recursive: true, force: true });
            vscode.window.showInformationMessage(
                'Voice server reset. Restart VS Code to set up again.',
            );
        }),
    );
}
