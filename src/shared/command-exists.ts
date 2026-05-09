import * as cp from 'child_process';

export function commandExists(cmd: string): Promise<boolean> {
    return new Promise(resolve => {
        cp.exec(`which ${cmd}`, err => resolve(!err));
    });
}
