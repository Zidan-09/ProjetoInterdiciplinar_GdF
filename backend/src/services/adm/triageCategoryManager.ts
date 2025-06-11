import { openDb } from "../../db";
import { TriageCategory } from "../../entities/criteria";

export const TriageCategoryManager = {
    async createCategory(newTriageCategory: TriageCategory) {
        const db = await openDb();

        try {
            await db.run('INSERT INTO TriageCategory (name, color, limitMinutes, priority) VALUES (?, ?, ?, ?)', [newTriageCategory.name, newTriageCategory.color, newTriageCategory.limitMinutes, newTriageCategory.priority]);
            return newTriageCategory;

        } catch (error) {
            console.error(error);
        }
    },

    async updateCategory(name: string, newLimitMinutes: number) {
        const db = await openDb();

        try {
            const result = await db.run('UPDATE TriageCategory SET limitMinutes = ? WHERE name = ?', [newLimitMinutes, name]);
            return result;

        } catch (error) {
            console.error(error)
        }
    },

    async listCategories() {
        const db = await openDb();

        try {
            const categories = await db.all('SELECT * FROM TriageCategoty');
            return categories;
        } catch (error) {
            console.error(error);
        }
    },

    async findByName(name: string) {
        const db = await openDb();

        try {
            const triageCategory = await db.get('SELECT * FROM TriageCategory WHERE name = ?', [name]);
            return triageCategory;
            
        } catch (error) {
            console.error(error);
        }
    }
}