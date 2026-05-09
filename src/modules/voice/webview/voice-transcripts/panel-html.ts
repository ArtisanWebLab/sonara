import { buildWebviewHtml } from '../../../../shared/webview/html-template';
import { TRANSCRIPTS_PANEL_STYLES } from './panel-styles';
import { TRANSCRIPTS_PANEL_SCRIPT } from './panel-script';

export function buildTranscriptsPanelHtml(): string {
    return buildWebviewHtml({
        title: 'Voice Transcripts',
        extraStyles: TRANSCRIPTS_PANEL_STYLES,
        body: `<div class="transcript-list" id="list"></div>`,
        script: TRANSCRIPTS_PANEL_SCRIPT,
    });
}
