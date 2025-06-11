export interface TriageCategory {
    name: string;
    color: string;
    limitMinutes: number;
    priority: number;
}

export interface UpdateTriageCategory {
    name: string;
    limitMinutes: number;
}