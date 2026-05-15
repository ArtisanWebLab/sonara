function pad2(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
}

function offsetString(date: Date): string {
    const offsetMin = -date.getTimezoneOffset();
    const sign = offsetMin >= 0 ? '+' : '-';
    const abs = Math.abs(offsetMin);
    return `${sign}${pad2(Math.floor(abs / 60))}:${pad2(abs % 60)}`;
}

export function localDateKey(date: Date): string {
    return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

export function slotStartIso(date: Date): string {
    const slotMinute = Math.floor(date.getMinutes() / 15) * 15;
    const slot = new Date(date);
    slot.setMinutes(slotMinute, 0, 0);
    const y = slot.getFullYear();
    const m = pad2(slot.getMonth() + 1);
    const d = pad2(slot.getDate());
    const hh = pad2(slot.getHours());
    const mm = pad2(slot.getMinutes());
    return `${y}-${m}-${d}T${hh}:${mm}:00${offsetString(slot)}`;
}

export function formatHms(totalSeconds: number): string {
    const sec = Math.max(0, Math.floor(totalSeconds));
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}h ${m}m ${s}s`;
}
