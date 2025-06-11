import { User } from "../../entities/hospitalStaff";
import { openDb } from "../../db";
import bcrypt from 'bcryptjs';
import { Hash, Jwt } from "../../utils/systemUtils/security";
import { sendEmail } from "../../utils/personsUtils/email";


export const Login = {
    async loginUser(data: User) {
        const db = await openDb();
        try {
            const userData: any = await db.get('SELECT * FROM User WHERE username = ?', [data.username]);

            if (userData) {
                const valid: boolean = await bcrypt.compare(data.password, userData.password);

                if (valid) {
                    const token = Jwt.generateLoginToken(userData.user_id);

                    return {
                        user: userData.username,
                        token: token
                    }
                }
            }

        } catch (error) {
            console.error(error);
        }
    },

    async forgotPassword() {
        // FAZER ENVIO DE EMAIL
    },

    async newPassword(data: string) {
        const db = await openDb();

        try {
            const password = Hash.hash(data);
            await db.run('UPDATE User SET password = ?', [password]);

        } catch (error) {
            console.error(error);
        }
    }
}