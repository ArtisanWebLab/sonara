import { buildWebviewHtml } from '../../../../shared/webview/html-template';
import { PANEL_STYLES } from './panel-styles';
import { PANEL_SCRIPT } from './panel-script';

export function buildPanelHtml(): string {
    return buildWebviewHtml({
        title: 'Voice Log',
        extraStyles: PANEL_STYLES,
        body: `
<div class="header">
    <input class="search-box" id="searchInput" type="text" placeholder="Search records...">
</div>

<div class="log-list" id="logList"></div>`,
        script: PANEL_SCRIPT,
    });
}
