import { Recepcionist } from "../models/hospitalStaff";

export type Status = 'In triage queue'| 'In consult queue' | 'In consult' | 'Was treated' | 'Left before consult'

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