import { Attend } from "../models/attend";

export class NoTriage {
    attend: Attend;
    pointer: null | NoTriage;

    constructor(attend: Attend) {
        this.attend = attend;
        this.pointer = null;
    }
}