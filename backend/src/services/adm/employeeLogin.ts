import { User } from "../../entities/hospitalStaff";
import { openDb } from "../../db";
import bcrypt from 'bcryptjs';

const db = openDb();

export class Login {
    static async loginUser(data: User) {
        try {
            const userData: any = (await db).get('SELECT * FROM User WHERE username = ?', [data.username]);

            if (userData) {
                const valid: boolean = await bcrypt.compare(data.password, userData.password);

                if (valid) {
                    return "login feito TEMP"
                } else {
                    return "Senha incorreta"
                }
            }

        } catch (error) {
            console.error(error);
        }
    }
}