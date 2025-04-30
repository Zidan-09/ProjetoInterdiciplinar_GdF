class Criteria {
    immediate: number;
    veryUrgent: number;
    urgent: number;
    lowUrgency: number;
    nonUrgent: number;

    constructor() {
        this.immediate = 0;
        this.veryUrgent = 10;
        this.urgent = 60;
        this.lowUrgency = 120;
        this.nonUrgent = 240;
    }
}

export const criteria: Criteria = new Criteria();