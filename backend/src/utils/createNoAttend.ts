export class NoAttend {
    public ticket: string | undefined;
    priority: number;
    pointer: null | undefined | NoAttend;

    constructor(priority: number) {
        this.ticket = undefined;
        this.priority = priority;
        this.pointer = null;
    }
}