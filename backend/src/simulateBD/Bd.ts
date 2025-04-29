import { Attend, Triage, Consult } from "../models/careFlow";
import { Doctor, Nurse, Recepcionist } from "../models/hospitalStaff";
import { Patient } from "../models/patient";

export class DataBase {
    name: string = 'GdF_DB';
    patients: Patient[];
    recepcionists: Recepcionist[];
    nurses: Nurse[];
    doctors: Doctor[];
    attends: Attend[];
    triages: Triage[];
    consults: Consult[];

    constructor () {
        this.patients = [];
        this.recepcionists = [];
        this.nurses = [];
        this.doctors = [];
        this.attends = [];
        this.triages = [];
        this.consults = [];
    }

    static searchById(id: number): Patient | undefined {
        for (let i of DB.patients) {
            if (i.id == id) {
                return i;
            }
        }
    }

    static searchNurse(id: number): Nurse | undefined {
        for (let i of DB.nurses) {
            if (i.id == id) {
                return i;
            }
        }
    }

    static searchRecepcionist(id: number): Recepcionist {
        let recepcionist: Recepcionist;
        for (let i of DB.recepcionists) {
            if (i.id == id) {
                recepcionist = i;
                break;
            }
        }
        return recepcionist!;
    }

    static searchAttend(id: number): string | undefined {
        for (let i of DB.attends) {
            if (i.id == id) {
                return i.ticket;
            }
        }
    }

    static searchByName(name: string): Patient | undefined {
        let patient: Patient | undefined;
        for (let i of DB.patients) {
            if (i.name == name) {
                patient = i;
            }
        }
        return patient;
    }
}

export const DB: DataBase = new DataBase();