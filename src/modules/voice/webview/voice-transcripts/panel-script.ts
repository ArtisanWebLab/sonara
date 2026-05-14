import { buildIconsScriptDecl } from '../../../../shared/webview/icons';

export const TRANSCRIPTS_PANEL_SCRIPT = `
${buildIconsScriptDecl()}
(function() {
    const vscode = acquireVsCodeApi();
    let items = [];

    const container = document.getElementById('list');

    container.addEventListener('click', function(event) {
        const iconBtn = event.target.closest('.icon-btn');
        if (iconBtn) {
            event.stopPropagation();
            const action = iconBtn.dataset.action;
            const card = iconBtn.closest('[data-id]');
            const id = card ? card.dataset.id : null;
            if (action && id) vscode.postMessage({ type: action, id });
            return;
        }
        // Title click opens preview.
        const name = event.target.closest('.transcript-name');
        if (name) {
            const card = name.closest('[data-id]');
            if (card && card.dataset.id) {
                vscode.postMessage({ type: 'openPreview', id: card.dataset.id });
            }
        }
    });

    window.addEventListener('message', function(event) {
        const msg = event.data;
        if (msg.type === 'items') {
            items = msg.items || [];
            render(items);
        } else if (msg.type === 'copied') {
            flashCopied(msg.id, msg.kind);
        }
    });

    function render(list) {
        container.innerHTML = '';

        if (!list || list.length === 0) {
            container.innerHTML =
                '<div class="empty-state">' +
                '<div class="empty-icon">\u{1F4DD}</div>' +
                '<div>No transcripts yet.<br>Click "Transcribe file" to start.</div>' +
                '</div>';
            return;
        }

        for (const item of list) {
            container.appendChild(buildCard(item));
        }
    }

    function buildCard(item) {
        const card = document.createElement('div');
        card.className = 'transcript-card';
        card.dataset.id = item.id;

        const topRow = document.createElement('div');
        topRow.className = 'card-top-row';

        const meta = document.createElement('div');
        meta.className = 'transcript-meta';
        const parts = [];
        parts.push('<span class="transcript-time">' + escHtml(formatDateTime(item.createdAt)) + '</span>');
        if (item.durationSec) {
            parts.push('<span class="transcript-duration">' + formatDuration(item.durationSec) + '</span>');
        }
        meta.innerHTML = parts.join('');
        topRow.appendChild(meta);

        const actions = document.createElement('div');
        actions.className = 'card-actions';
        actions.appendChild(makeIconBtn('Open preview', ICON_SHOW, 'openPreview'));
        actions.appendChild(makeIconBtn('Edit transcript file', ICON_EDIT, 'open'));
        actions.appendChild(makeIconBtn('Reveal in File Explorer', ICON_REVEAL, 'reveal'));
        actions.appendChild(makeIconBtn('Copy transcript text', ICON_COPY, 'copyText', 'text'));
        actions.appendChild(makeIconBtn('Copy file path', ICON_COPY_PATH, 'copyPath', 'path'));
        const deleteBtn = makeIconBtn('Delete transcript', ICON_DELETE, 'delete');
        deleteBtn.classList.add('icon-btn-danger');
        actions.appendChild(deleteBtn);
        topRow.appendChild(actions);

        card.appendChild(topRow);

        const name = document.createElement('div');
        name.className = 'transcript-name';
        name.textContent = item.sourceName;
        name.title = 'Open preview';
        card.appendChild(name);

        if (item.summary) {
            const summaryEl = document.createElement('div');
            summaryEl.className = 'transcript-summary';
            summaryEl.textContent = item.summary;
            card.appendChild(summaryEl);
        }

        return card;
    }

    function formatDateTime(iso) {
        const d = new Date(iso);
        if (isNaN(d.getTime())) return '';
        const pad = function (n) { return String(n).padStart(2, '0'); };
        return pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear() +
            ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    }

    function makeIconBtn(label, svg, action, copyKind) {
        const btn = document.createElement('button');
        btn.className = 'icon-btn';
        btn.title = label;
        btn.innerHTML = svg;
        btn.dataset.action = action;
        btn.dataset.iconOriginal = svg;
        if (copyKind) btn.dataset.copyKind = copyKind;
        return btn;
    }

    function flashCopied(id, kind) {
        const card = container.querySelector('[data-id="' + cssEscape(id) + '"]');
        if (!card) return;
        const selector = kind
            ? '.icon-btn[data-copy-kind="' + kind + '"]'
            : '.icon-btn[data-copy-kind]';
        const btn = card.querySelector(selector);
        if (!btn) return;
        const original = btn.dataset.iconOriginal || btn.innerHTML;
        btn.innerHTML = ICON_COPIED;
        btn.classList.add('copied');
        setTimeout(function() {
            btn.innerHTML = original;
            btn.classList.remove('copied');
        }, 1500);
    }

    function formatDuration(sec) {
        const total = Math.round(sec);
        const h = Math.floor(total / 3600);
        const m = Math.floor((total % 3600) / 60);
        const s = total % 60;
        if (h > 0) return h + 'h ' + m + 'm';
        if (m > 0) return m + 'm ' + s + 's';
        return s + 's';
    }

    function escHtml(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function cssEscape(s) {
        return String(s).replace(/[\\\\"']/g, '\\\\$&');
    }

    vscode.postMessage({ type: 'ready' });
})();
`;
