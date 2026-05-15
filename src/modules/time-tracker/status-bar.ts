import * as vscode from 'vscode';
import { TimerService } from './timer-service';
import { formatHms } from './local-time';

export class TimeTrackerStatusBar implements vscode.Disposable {
    private readonly item: vscode.StatusBarItem;
    private readonly disposables: vscode.Disposable[] = [];

    constructor(private readonly timer: TimerService) {
        this.item = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Left,
            99,
        );
        this.item.command = 'sonara.timeTracker.statusBarAction';

        this.disposables.push(
            timer.onChange(change => this.update(change.activeSlug, change.total)),
        );

        const initialSlug = timer.getActiveSlug();
        if (initialSlug) {
            void timer.totalForSlug(initialSlug).then(total => {
                if (this.timer.getActiveSlug() === initialSlug) {
                    this.update(initialSlug, total);
                }
            });
        } else {
            this.update(null, 0);
        }
    }

    private update(activeSlug: string | null, total: number): void {
        if (!activeSlug) {
            this.item.hide();
            return;
        }
        this.item.text = `$(clock) ${activeSlug} ${formatHms(total)}`;
        this.item.tooltip = `Time tracker: ${activeSlug}`;
        this.item.show();
    }

    dispose(): void {
        this.item.dispose();
        this.disposables.forEach(d => d.dispose());
    }
}
