import { db } from "../../db";
import { TriageCategory } from "../../entities/triageCategory";

export const TriageCategoryManager = {
    async createCategory(newTriageCategory: TriageCategory) {
        try {
            await db.execute('INSERT INTO TriageCategory (name, color, limitMinutes, priority) VALUES (?, ?, ?, ?)', [newTriageCategory.name, newTriageCategory.color, newTriageCategory.limitMinutes, newTriageCategory.priority]);
            return newTriageCategory;

        } catch (error) {
            console.error(error);
        }
    },

    async updateCategory(name: string, newLimitMinutes: number) {
        try {
            const result = await db.execute('UPDATE TriageCategory SET limitMinutes = ? WHERE name = ?', [newLimitMinutes, name]);
            return result;

        } catch (error) {
            console.error(error)
        }
    },

    async listCategories() {
        try {
            const categories = await db.execute('SELECT * FROM TriageCategory');
            return categories;
        } catch (error) {
            console.error(error);
        }
    },

    async findByName(name: string) {
        try {
            const triageCategory = await db.execute('SELECT * FROM TriageCategory WHERE name = ?', [name]);
            return triageCategory;
            
        } catch (error) {
            console.error(error);
        }
    },

    async delete(name: string) {
        try {
            const result = await db.execute('DELETE * FROM TriageCategory WHERE name = ?', [name]);

            if (result) {
                return result
            }
        } catch (error) {
            console.error(error)
        }
    }
}