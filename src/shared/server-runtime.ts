import * as path from 'path';

const PYTHON_VENV_DIR = 'python-venv';
const MODELS_DIR = 'models';
const LOGS_DIR = 'logs';
const SERVER_TOKEN_FILE = 'server.token';
const SERVER_PORT_FILE = 'server.port';
const SERVER_LOG_FILE = 'server.log';

export function pythonVenvDir(globalStorageDir: string): string {
    return path.join(globalStorageDir, PYTHON_VENV_DIR);
}

export function pythonExecutable(globalStorageDir: string): string {
    return path.join(pythonVenvDir(globalStorageDir), 'bin', 'python');
}

export function pythonPipExecutable(globalStorageDir: string): string {
    return path.join(pythonVenvDir(globalStorageDir), 'bin', 'pip');
}

export function modelsDir(globalStorageDir: string): string {
    return path.join(globalStorageDir, MODELS_DIR);
}

export function serverTokenFile(globalStorageDir: string): string {
    return path.join(globalStorageDir, SERVER_TOKEN_FILE);
}

export function serverPortFile(globalStorageDir: string): string {
    return path.join(globalStorageDir, SERVER_PORT_FILE);
}

export function serverLogFile(globalStorageDir: string): string {
    return path.join(globalStorageDir, LOGS_DIR, SERVER_LOG_FILE);
}
