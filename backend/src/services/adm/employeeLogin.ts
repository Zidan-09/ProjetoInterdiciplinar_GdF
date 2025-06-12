import { User } from "../../entities/hospitalStaff";
import { db } from "../../db";
import bcrypt from 'bcryptjs';
import { Hash, Jwt } from "../../utils/systemUtils/security";
import { sendEmail } from "../../utils/personsUtils/email";


export const Login = {
    async loginUser(data: User) {
        try {
            const userData: any = await db.execute('SELECT * FROM User WHERE username = ?', [data.username]);
            const role: any = await db.execute('SELECT accessLevel FROM Employee WHERE id = ?', [userData.user_id])

            if (userData) {
                const valid: boolean = await bcrypt.compare(data.password, userData.password);

                if (valid) {
                    const token = Jwt.generateLoginToken(userData.user_id);

                    return {
                        user: userData.username,
                        token: token,
                        role: role
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
        try {
            const password = Hash.hash(data);
            await db.execute('UPDATE User SET password = ?', [password]);

        } catch (error) {
            console.error(error);
        }
    }
}