class Criteria {
    immediate: number;
    veryUrgent: number;
    urgent: number;
    standard: number;
    nonUrgent: number;

    constructor() {
        this.immediate = 0;
        this.veryUrgent = 10;
        this.urgent = 60;
        this.standard = 120;
        this.nonUrgent = 240;
    }
}

export interface TriageCategory {
    name: string;
    color: string;
    limitMinutes: number;
    priority: number;
}

export const criteria: Criteria = new Criteria();