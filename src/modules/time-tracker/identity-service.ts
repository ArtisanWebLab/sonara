import * as vscode from 'vscode';
import { exec } from 'child_process';

const USER_KEY_STATE = 'sonara.timeTracker.userKey';

export class IdentityService {
    public constructor(private readonly state: vscode.Memento) {}

    public get(): string | undefined {
        return this.state.get<string>(USER_KEY_STATE);
    }

    public async resolve(): Promise<string | undefined> {
        const existing = this.get();
        if (existing) {
            return existing;
        }
        return this.ask();
    }

    private async ask(): Promise<string | undefined> {
        const gitEmail = await this.readGitEmail();
        const items: vscode.QuickPickItem[] = [];
        if (gitEmail) {
            items.push({ label: `Use git email (${gitEmail})`, description: 'from git config user.email' });
        }
        items.push({ label: 'Enter name manually', description: 'arbitrary string' });

        const picked = await vscode.window.showQuickPick(items, {
            title: 'Sonara Time Tracker: identify user',
            placeHolder: 'How should we label your time-tracking data?',
        });
        if (!picked) {
            return undefined;
        }
        let raw: string | undefined;
        if (picked.label.startsWith('Use git email') && gitEmail) {
            raw = gitEmail;
        } else {
            raw = await vscode.window.showInputBox({
                title: 'Sonara Time Tracker',
                prompt: 'Enter a name to identify your time-tracking data',
                validateInput: value => (value.trim().length === 0 ? 'Name cannot be empty' : null),
            });
        }
        if (!raw) {
            return undefined;
        }
        const key = this.normalize(raw);
        if (!key) {
            return undefined;
        }
        await this.state.update(USER_KEY_STATE, key);
        return key;
    }

    private normalize(value: string): string {
        const trimmed = value.trim().toLowerCase();
        const replaced = trimmed.replace(/[^a-z0-9._-]+/g, '-');
        const collapsed = replaced.replace(/-+/g, '-').replace(/^-+|-+$/g, '');
        return collapsed;
    }

    private readGitEmail(): Promise<string | undefined> {
        return new Promise(resolve => {
            const cwd = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
            exec('git config user.email', { cwd }, (err, stdout) => {
                if (err) {
                    resolve(undefined);
                    return;
                }
                const value = stdout.trim();
                resolve(value.length > 0 ? value : undefined);
            });
        });
    }
}
