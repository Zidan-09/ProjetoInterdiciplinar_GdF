export interface CriteriaData {
    immediate: number;
    veryUrgent: number;
    urgent: number;
    standard: number;
    nonUrgent: number;
};

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

export const criteria: Criteria = new Criteria();