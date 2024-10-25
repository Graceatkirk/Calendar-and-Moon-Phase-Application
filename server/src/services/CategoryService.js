import { Category } from '../models'; // Correct import statement

class CategoryService {
  async createCategory(categoryData, userId) {
    try {
      return await Category.create({
        name: categoryData.name,
        color: categoryData.color,
        user_id: userId
      });
    } catch (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  }

  async getUserCategories(userId) {
    try {
      return await Category.findAll({
        where: { user_id: userId }
      });
    } catch (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }
}

export default new CategoryService();
