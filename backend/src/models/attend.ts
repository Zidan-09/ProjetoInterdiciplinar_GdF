import { Recepcionist } from "../models/hospitalStaff";
import { Status } from "../models/patient";

export class Attend {
    id: number;
    ticket: string;
    recepcionist: Recepcionist;
    checkIn: Date;
    status: Status;

    constructor(ticket: string, recepcionist: Recepcionist) {
        this.id = 0;
        this.ticket = ticket;
        this.recepcionist = recepcionist;
        this.checkIn = new Date();
        this.status = 'In triage queue';
    }
}