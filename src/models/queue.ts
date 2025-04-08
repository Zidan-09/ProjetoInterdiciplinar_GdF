import { Patient } from "./patient";

export class Queue {
    first: undefined | Patient;
    last: undefined | Patient;

    constructor() {
        this.first = undefined;
        this.last = undefined;
    }
}