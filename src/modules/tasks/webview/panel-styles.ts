export const PANEL_STYLES = `
.body {
    flex: 1;
    overflow-y: auto;
    padding: 0 10px;
}

.welcome {
    padding: 18px 14px;
    color: var(--vscode-descriptionForeground);
    font-size: 12px;
    line-height: 1.5;
}
.welcome p { margin-bottom: 10px; }
.welcome-btn {
    display: inline-block;
    margin-top: 4px;
    padding: 6px 12px;
    background: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
}
.welcome-btn:hover { background: var(--vscode-button-hoverBackground); }

.section {
    border-bottom: 1px solid var(--vscode-sideBarSectionHeader-border);
    margin-bottom: 4px;
}

.section-header {
    display: flex;
    align-items: center;
    height: 22px;
    padding: 0 4px 0 6px;
    background: var(--vscode-sideBarSectionHeader-background);
    color: var(--vscode-sideBarSectionHeader-foreground);
    cursor: pointer;
    user-select: none;
    gap: 4px;
    border-radius: 3px;
}
.section-header:hover { background: var(--vscode-list-hoverBackground); }

.section-chevron {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--vscode-icon-foreground);
}
.section-chevron svg {
    width: 16px;
    height: 16px;
    transition: transform 0.12s ease;
}
.section.collapsed .section-chevron svg { transform: rotate(-90deg); }

.section-title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    flex-shrink: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.section-count {
    margin-left: 4px;
    color: var(--vscode-descriptionForeground);
    font-weight: 500;
}
.section-add {
    margin-left: auto;
    background: none;
    border: none;
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 3px;
    color: var(--vscode-icon-foreground);
    font-size: 14px;
    line-height: 1;
    opacity: 0;
    transition: opacity 0.1s, background 0.1s;
}
.section-header:hover .section-add { opacity: 0.8; }
.section-add:hover { opacity: 1; background: var(--vscode-toolbar-hoverBackground); }

.section.collapsed .section-list { display: none; }

.section-list {
    padding: 2px 0 6px;
    min-height: 4px;
}

.empty-section {
    padding: 6px 12px;
    font-size: 11px;
    color: var(--vscode-descriptionForeground);
}

.card {
    position: relative;
    padding: 6px 10px;
    margin-bottom: 2px;
    cursor: default;
    transition: background 0.1s;
    border-radius: 3px;
}
.card:last-child { margin-bottom: 0; }
.card:hover { background: var(--vscode-list-hoverBackground); }

.card[data-priority="highest"] { border-left: 2px solid var(--vscode-charts-red); }
.card[data-priority="high"]    { border-left: 2px solid #ff9100; }
.card[data-priority="medium"]  { border-left: 2px solid #a3b300; }
.card[data-priority="low"]     { border-left: 2px solid var(--vscode-charts-blue); }
.card[data-priority="lowest"]  { border-left: 2px solid var(--vscode-charts-foreground); }

.card.error { border-left: 2px solid var(--vscode-charts-red); }

.card-title {
    font-size: 12px;
    font-weight: 600;
    color: var(--vscode-foreground);
    line-height: 1.3;
    word-break: break-word;
    cursor: pointer;
}
.card-title:hover { text-decoration: underline; }

.card-summary {
    margin-top: 3px;
    font-size: 11px;
    color: var(--vscode-descriptionForeground);
    line-height: 1.4;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}


.card-error-msg {
    margin-top: 3px;
    font-size: 11px;
    color: var(--vscode-charts-red);
    word-break: break-word;
}

.card-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    color: var(--vscode-descriptionForeground);
    flex-wrap: wrap;
    min-width: 0;
}

.card-status {
    display: inline-flex;
    align-items: center;
    height: 18px;
    padding: 0 7px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0;
    text-transform: none;
    border-radius: 9px;
    background: color-mix(in srgb, var(--vscode-charts-foreground) 22%, transparent);
    color: var(--vscode-charts-foreground);
    white-space: nowrap;
}
.chip-clickable {
    cursor: pointer;
    transition: filter 0.1s;
}
.chip-clickable:hover { filter: brightness(1.2); }
.card-status[data-status="activity"]    { background: color-mix(in srgb, var(--vscode-charts-foreground) 16%, transparent); color: var(--vscode-charts-foreground); }
.card-status[data-status="backlog"]     { background: color-mix(in srgb, var(--vscode-charts-foreground) 22%, transparent); color: var(--vscode-charts-foreground); }
.card-status[data-status="todo"]        { background: color-mix(in srgb, var(--vscode-charts-yellow) 22%, transparent); color: var(--vscode-charts-yellow); }
.card-status[data-status="in-progress"] { background: color-mix(in srgb, var(--vscode-charts-blue) 22%, transparent); color: var(--vscode-charts-blue); }
.card-status[data-status="review"]      { background: color-mix(in srgb, var(--vscode-charts-purple) 22%, transparent); color: var(--vscode-charts-purple); }
.card-status[data-status="done"]        { background: color-mix(in srgb, var(--vscode-charts-green) 22%, transparent); color: var(--vscode-charts-green); }
.card-status[data-status="released"]    { background: color-mix(in srgb, var(--vscode-charts-foreground) 18%, transparent); color: var(--vscode-charts-foreground); opacity: 0.7; }
.card-status[data-status="cancelled"]   { background: color-mix(in srgb, var(--vscode-charts-foreground) 14%, transparent); color: var(--vscode-charts-foreground); opacity: 0.55; text-decoration: line-through; }
.card-status[data-status="error"]       { background: color-mix(in srgb, var(--vscode-charts-red) 22%, transparent); color: var(--vscode-charts-red); }

.card-priority {
    display: inline-flex;
    align-items: center;
    height: 18px;
    padding: 0 7px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0;
    text-transform: none;
    border-radius: 9px;
    background: color-mix(in srgb, currentColor 22%, transparent);
    white-space: nowrap;
}
.card-priority[data-priority="highest"] { color: var(--vscode-charts-red); }
.card-priority[data-priority="high"]    { color: #ff9100; }
.card-priority[data-priority="medium"]  { color: #a3b300; }
.card-priority[data-priority="low"]     { color: var(--vscode-charts-blue); }
.card-priority[data-priority="lowest"]  { color: var(--vscode-charts-foreground); }

.card-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 5px;
}
.chip {
    display: inline-flex;
    align-items: center;
    height: 18px;
    padding: 0 7px;
    font-size: 10px;
    font-weight: 500;
    border-radius: 9px;
    cursor: pointer;
    user-select: none;
    transition: filter 0.1s;
    white-space: nowrap;
}
.chip:hover { filter: brightness(1.15); }
.chip-sprint {
    background: color-mix(in srgb, var(--vscode-charts-blue) 22%, transparent);
    color: var(--vscode-charts-blue);
}
.chip-label {
    background: color-mix(in srgb, var(--vscode-charts-purple) 22%, transparent);
    color: var(--vscode-charts-purple);
}
.chip-placeholder {
    background: transparent;
    color: var(--vscode-descriptionForeground);
    border: 1px dashed color-mix(in srgb, var(--vscode-foreground) 25%, transparent);
    opacity: 0.7;
}
.chip-placeholder:hover { opacity: 1; }

.filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 6px;
    align-items: center;
}
.filter-bar:empty { margin-top: 0; }
.chip:has(.chip-icon-add) { padding-left: 5px; }
.chip:has(.chip-icon-remove) { padding-right: 5px; }
.chip-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    opacity: 0.8;
    transition: opacity 0.1s, background 0.1s;
}
.chip-icon svg { display: block; }
.chip-icon-add { margin-right: 3px; }
.chip-icon-remove { margin-left: 3px; }
.chip:hover .chip-icon {
    opacity: 1;
    background: color-mix(in srgb, currentColor 20%, transparent);
}
.filter-actions-break { flex-basis: 100%; height: 0; }
.filter-clear {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 18px;
    padding: 0 7px;
    font-size: 10px;
    font-weight: 500;
    border-radius: 9px;
    border: none;
    background: transparent;
    color: var(--vscode-descriptionForeground);
    cursor: pointer;
    transition: background 0.1s, color 0.1s;
}
.filter-clear:hover {
    color: var(--vscode-charts-red);
    background: color-mix(in srgb, var(--vscode-charts-red) 15%, transparent);
}
.filter-clear-icon { display: inline-flex; align-items: center; }
.filter-clear-icon svg { display: block; }

.filter-copy-md {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 18px;
    padding: 0 7px;
    font-size: 10px;
    font-weight: 500;
    border-radius: 9px;
    border: none;
    background: transparent;
    color: var(--vscode-descriptionForeground);
    cursor: pointer;
    transition: background 0.1s, color 0.1s;
}
.filter-copy-md:hover {
    color: var(--vscode-charts-green);
    background: color-mix(in srgb, var(--vscode-charts-green) 15%, transparent);
}
.filter-copy-md + .filter-copy-md { margin-left: 2px; }
.filter-copy-md-icon { display: inline-flex; align-items: center; }
.filter-copy-md-icon svg { width: 11px; height: 11px; display: block; }
.filter-copy-md.copied { color: var(--vscode-charts-green); }

.section-copy-md {
    background: none;
    border: none;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 3px;
    color: var(--vscode-icon-foreground);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.1s, background 0.1s;
}
.section-copy-md.section-copy-md-alone { margin-left: auto; }
.section-copy-md + .section-copy-md { margin-left: 2px; }
.section-header:hover .section-copy-md { opacity: 0.8; }
.section-copy-md:hover { opacity: 1; background: var(--vscode-toolbar-hoverBackground); }
.section-copy-md svg { width: 13px; height: 13px; display: block; }
.section-copy-md.copied { color: var(--vscode-charts-green); opacity: 1; }
`;
