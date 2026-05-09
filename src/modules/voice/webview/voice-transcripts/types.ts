export interface TranscriptFile {
    id: string;
    sourceName: string;
    createdAt: string;
    durationSec?: number;
    language?: string;
    summary?: string;
}
