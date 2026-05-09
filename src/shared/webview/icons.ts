// Shared SVG icons for all webview panels.
// All icons share viewBox="0 0 18 18", stroke 1.3, no fill, round caps/joins.
// Rendered inside .icon-btn buttons (width/height 14px applied via CSS).

const SVG_OPEN = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">';
const SVG_CLOSE = '</svg>';

export const ICON_COPY =
    SVG_OPEN +
    '<rect x="6" y="6" width="9" height="9" rx="1.5"/>' +
    '<path d="M3.5 12V4.5A1.5 1.5 0 0 1 5 3h7.5"/>' +
    SVG_CLOSE;

export const ICON_COPIED =
    SVG_OPEN.replace('stroke-width="1.3"', 'stroke-width="1.8"') +
    '<polyline points="3.5,9.5 7.5,13.5 14.5,5.5"/>' +
    SVG_CLOSE;

export const ICON_COPY_PATH =
    SVG_OPEN +
    '<path d="M7.5 10.5a3 3 0 0 0 4.24 0l2.5-2.5a3 3 0 0 0-4.24-4.24l-1 1"/>' +
    '<path d="M10.5 7.5a3 3 0 0 0-4.24 0l-2.5 2.5a3 3 0 0 0 4.24 4.24l1-1"/>' +
    SVG_CLOSE;

export const ICON_SHOW =
    SVG_OPEN +
    '<path d="M1.5 9C1.5 9 4.5 4 9 4s7.5 5 7.5 5-3 5-7.5 5S1.5 9 1.5 9z"/>' +
    '<circle cx="9" cy="9" r="2.2"/>' +
    SVG_CLOSE;

export const ICON_EDIT =
    SVG_OPEN +
    '<path d="M3 15v-2.5L12.5 3 15 5.5 5.5 15z"/>' +
    '<path d="M11 4.5L13.5 7"/>' +
    SVG_CLOSE;

export const ICON_OPEN_EXTERNAL =
    SVG_OPEN +
    '<path d="M10 3h5v5"/>' +
    '<path d="M15 3l-7 7"/>' +
    '<path d="M13 10v4.5A1.5 1.5 0 0 1 11.5 16h-7A1.5 1.5 0 0 1 3 14.5v-7A1.5 1.5 0 0 1 4.5 6H9"/>' +
    SVG_CLOSE;

export const ICON_REVEAL =
    SVG_OPEN +
    '<path d="M2 6V4.5A1 1 0 0 1 3 3.5h3.5l1.5 2H15A1 1 0 0 1 16 6.5V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>' +
    SVG_CLOSE;

export const ICON_EXPAND =
    SVG_OPEN +
    '<polyline points="4,7 9,12 14,7"/>' +
    SVG_CLOSE;

export const ICON_DELETE =
    SVG_OPEN +
    '<polyline points="3,5 15,5"/>' +
    '<path d="M5 5V3.5A1 1 0 0 1 6 2.5h6a1 1 0 0 1 1 1V5"/>' +
    '<path d="M5.5 5l.7 9.5a1 1 0 0 0 1 .9h3.6a1 1 0 0 0 1-.9L12.5 5"/>' +
    SVG_CLOSE;

// Bundle for embedding into webview script strings via template literals.
// Each script sets these as JS string literals so the runtime code can use them by name.
export function buildIconsScriptDecl(): string {
    const decls: Array<[string, string]> = [
        ['ICON_COPY', ICON_COPY],
        ['ICON_COPIED', ICON_COPIED],
        ['ICON_COPY_PATH', ICON_COPY_PATH],
        ['ICON_SHOW', ICON_SHOW],
        ['ICON_EDIT', ICON_EDIT],
        ['ICON_OPEN_EXTERNAL', ICON_OPEN_EXTERNAL],
        ['ICON_REVEAL', ICON_REVEAL],
        ['ICON_EXPAND', ICON_EXPAND],
        ['ICON_DELETE', ICON_DELETE],
    ];
    return decls.map(([name, svg]) => `var ${name} = ${JSON.stringify(svg)};`).join('\n');
}
