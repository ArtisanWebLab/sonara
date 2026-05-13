import * as vscode from 'vscode';

import { CommandDeps } from './types';

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
    );
}
