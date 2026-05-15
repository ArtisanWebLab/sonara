export interface TimeTrackerSlot {
    start: string;
    seconds: number;
}

export interface TimeTrackerTaskEntry {
    total: number;
    slots: TimeTrackerSlot[];
}

export interface TimeTrackerDayFile {
    date: string;
    tasks: Record<string, TimeTrackerTaskEntry>;
}

export interface TimeTrackerSnapshot {
    activeSlug: string | null;
    totalsBySlug: Record<string, number>;
}
