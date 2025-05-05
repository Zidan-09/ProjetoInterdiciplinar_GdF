export class NodeRecep {
    public ticket: string | undefined;
    priority: number;
    pointer: undefined | NodeRecep;

    constructor(priority: number) {
        this.ticket = undefined;
        this.priority = priority;
        this.pointer = undefined;
    }
}