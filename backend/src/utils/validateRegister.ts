import { Recepcionist } from "../models/hospitalStaff";
import { PatientRegistration } from "../services/patientServices";
import { PatientData } from "./convertJson";
import { DB } from "../simulateBD/Bd";
import { DataBase } from "../simulateBD/Bd";

export class ValidateRegister {
	static verify(data: PatientData) {
		const recepcionist: Recepcionist | undefined = DataBase.searchRecepcionist(0);
		const ticket: string | undefined = DataBase.searchAttend(0);
		let creable: Boolean;
		// Procurou no bd e não encontrou cadastro com o id...
		creable = true;
		if (!creable) {
			console.log('Paciente já cadastrado!');
			
		} else {
			PatientRegistration.register(data, recepcionist!, ticket!);
		}
	}
}