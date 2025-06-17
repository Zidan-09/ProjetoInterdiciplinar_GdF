import { RowDataPacket } from "mysql2";

export interface Logged {
    user: string,
    token: string,
    role: RowDataPacket
}