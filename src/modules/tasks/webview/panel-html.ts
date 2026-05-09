import { buildWebviewHtml } from '../../../shared/webview/html-template';
import { PANEL_STYLES } from './panel-styles';
import { PANEL_SCRIPT } from './panel-script';

export function buildPanelHtml(): string {
    return buildWebviewHtml({
        title: 'Tasks',
        extraStyles: PANEL_STYLES,
        body: `
<div class="header">
    <input class="search-box" id="searchInput" type="text" placeholder="Search tasks...">
    <div class="filter-bar" id="filterBar"></div>
</div>
<div class="body" id="root"></div>`,
        script: PANEL_SCRIPT,
    });
}
