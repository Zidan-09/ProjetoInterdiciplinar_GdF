import { Recepcionist } from "../models/hospitalStaff";
import { PatientRegistration } from "../services/patientServices";
import { PatientData } from "./convertJson";

export class ValidateRegister {
	static verify(data: PatientData, recepcionist: Recepcionist, ticket: string) {
		let creable: Boolean;
		// Procurou no bd e não encontrou cadastro com o id...
		creable = true;
		if (!creable) {
			console.log('Paciente já cadastrado!');
		} else {
			PatientRegistration.register(data, recepcionist, ticket);
		}
	}
}