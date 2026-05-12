import * as vscode from 'vscode';
import { ActiveProject } from './shared/active-project';
import { registerActiveProjectPicker } from './shared/active-project-view';
import { healSonaraProject } from './shared/project-layout';
import { TASKS_README_CONTENT } from './modules/tasks/templates/tasks-readme';
import { registerTasksModule } from './modules/tasks';
import { registerVoiceModule } from './modules/voice';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
    const activeProject = new ActiveProject(context.workspaceState);
    activeProject.init();
    context.subscriptions.push(activeProject);

    const initial = activeProject.get();
    if (initial) {
        healSonaraProject(initial, TASKS_README_CONTENT);
    }
    context.subscriptions.push(
        activeProject.onDidChange(folder => {
            if (folder) {
                healSonaraProject(folder, TASKS_README_CONTENT);
            }
        }),
    );

    registerActiveProjectPicker(context, activeProject);

    await registerTasksModule(context, activeProject);
    // Voice setup may block on Whisper installation. Run it in the background so
    // Tasks and the Active Project view become interactive immediately.
    registerVoiceModule(context, activeProject).catch(err => {
        console.error('Sonara: voice module failed to initialize', err);
    });
}

export function deactivate(): void {
    // Disposables registered in subscriptions handle cleanup.
}
