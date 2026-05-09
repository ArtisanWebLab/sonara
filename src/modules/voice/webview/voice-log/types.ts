export interface VoiceRecord {
    id: string;
    timestamp: string;
    text: string;
    language: string;
    duration_sec: number;
    model: string;
    tags: string[];
    copied?: boolean;
}
