import { Triage } from "../models/careFlow"
import { Consult } from "../models/hospital"

export async function validateForTest() {
    return 1
}

export async function searchBD(n: number) {
    const a: Consult = new Consult(1, 1);
    return a;
}