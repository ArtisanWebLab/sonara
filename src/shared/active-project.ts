import * as vscode from 'vscode';

const STATE_KEY = 'sonara.activeProjectUri';

export class ActiveProject implements vscode.Disposable {
    private readonly emitter = new vscode.EventEmitter<vscode.WorkspaceFolder | undefined>();
    readonly onDidChange = this.emitter.event;

    private current: vscode.WorkspaceFolder | undefined;
    private readonly disposables: vscode.Disposable[] = [];

    constructor(private readonly state: vscode.Memento) {}

    init(): void {
        this.current = this.resolve();
        this.disposables.push(
            vscode.workspace.onDidChangeWorkspaceFolders(() => {
                const updated = this.resolve();
                if (updated?.uri.toString() !== this.current?.uri.toString()) {
                    this.current = updated;
                    this.emitter.fire(this.current);
                }
            }),
        );
    }

    get(): vscode.WorkspaceFolder | undefined {
        return this.current;
    }

    async set(folder: vscode.WorkspaceFolder): Promise<void> {
        this.current = folder;
        await this.state.update(STATE_KEY, folder.uri.toString());
        this.emitter.fire(this.current);
    }

    private resolve(): vscode.WorkspaceFolder | undefined {
        const folders = vscode.workspace.workspaceFolders;
        if (!folders || folders.length === 0) {
            return undefined;
        }
        const saved = this.state.get<string>(STATE_KEY);
        if (saved) {
            const match = folders.find(f => f.uri.toString() === saved);
            if (match) {
                return match;
            }
        }
        return folders[0];
    }

    dispose(): void {
        this.disposables.forEach(d => d.dispose());
        this.emitter.dispose();
    }
}
