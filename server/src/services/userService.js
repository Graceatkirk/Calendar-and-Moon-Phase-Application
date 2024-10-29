const { User } = require('../models');


class UserService {
  async createUser(userData) {
    try {
      return await User.create({
        email: userData.email,
        password_hash: userData.passwordHash
      });
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async getUserById(userId) {
    try {
      return await User.findByPk(userId);
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }
}

module.exports = new UserService();