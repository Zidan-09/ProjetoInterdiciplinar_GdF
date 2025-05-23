import { CareFlow } from "../models/careFlow";
import { Doctor, Nurse, Receptionist, Admin } from "../models/hospitalStaff";
import { openDb } from "../db";

const db = openDb();

export class ValidateRegister {
	static async verifyPatient(patient: CareFlow['patient']): Promise<boolean> {
		try {
			const row = await (await db).get(
				'SELECT * FROM Patient WHERE name = ? AND cpf = ? AND rg = ?',
				[patient.name, patient.cpf, patient.rg]
			);

			if (row) {
				console.log('Paciente já cadastrado');
				return false;
			}

			return true;
		} catch (error) {
			console.log('Erro na verificação de paciente:', error);
			return false;
		}
	};

	static async verifyEmployee(user: Doctor | Nurse | Receptionist | Admin): Promise<boolean> {
		try {
			const row = await (await db).get(
				'SELECT * FROM Employee WHERE name = ? AND cpf = ?',
				[user.name, user.cpf]
			);
			
			if (row) {
				console.log('Empregado já cadastrado');
				return false;
			} else {
				return true;
			}
		} catch (error) {
			console.log('Erro na busca', error);
			return false;
		}
	}
}