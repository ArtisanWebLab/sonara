export const SHARED_STYLES = `
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
    font-family: var(--vscode-font-family);
    font-size: var(--vscode-font-size);
    color: var(--vscode-foreground);
    background: var(--vscode-sideBar-background);
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

body, body * { font-style: normal !important; }

.header {
    padding: 8px 10px 6px;
    border-bottom: 1px solid var(--vscode-sideBarSectionHeader-border);
    flex-shrink: 0;
}

.search-box {
    width: 100%;
    padding: 4px 8px;
    background: var(--vscode-input-background);
    border: 1px solid var(--vscode-input-border);
    color: var(--vscode-input-foreground);
    border-radius: 3px;
    font-size: 12px;
    outline: none;
}
.search-box:focus { border-color: var(--vscode-focusBorder); }
.search-box::placeholder { color: var(--vscode-input-placeholderForeground); }

.action-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--vscode-textLink-foreground);
    font-size: 11px;
    padding: 1px 0;
    font-family: inherit;
    transition: color 0.1s;
}
.action-btn:hover { text-decoration: underline; }
.action-btn.copied { color: var(--vscode-charts-green); }

/* Unified icon-button used in both tasks and voice webviews. */
.icon-btn {
    background: none;
    border: 0;
    cursor: pointer;
    padding: 3px 5px;
    border-radius: 3px;
    color: var(--vscode-icon-foreground);
    line-height: 0;
    opacity: 0.65;
    transition: opacity 0.1s, background 0.1s, color 0.1s;
}
.icon-btn svg { display: block; width: 14px; height: 14px; }
.icon-btn:hover { opacity: 1; background: var(--vscode-toolbar-hoverBackground); }
.icon-btn.copied { color: var(--vscode-charts-green); opacity: 1; }
.icon-btn.active { opacity: 1; color: var(--vscode-charts-yellow); }
.icon-btn.icon-btn-flipped svg { transform: rotate(180deg); }
.icon-btn-danger:hover { color: var(--vscode-charts-red); }

/* Card header layout shared between tasks and voice log. */
.card-top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
    min-height: 20px;
}
.card-actions {
    display: flex;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
}

`;
