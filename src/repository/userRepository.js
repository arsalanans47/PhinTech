const { user } = require('../models/index');


class userRepository {

  async createUser(userData){
    try {
      const newUser = await user.create(userData);
      return newUser;
    } catch (error) {
      console.log("Error in userRepository createUser: ", error);
      throw error;
    }
  }


  async getUserById(userId) {
    try {
      const foundUser = await user.findByPk(userId);
      return foundUser;
    } catch (error) {
      console.error("Error in userRepository getUserById: ", error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await user.findAll();
      return users;
    } catch (error) {
      console.error("Error in userRepository getAllUsers: ", error);
      throw error;
    }
  }

  async updateUser(userId, data){
    try {
      await user.update(data, {
        where: {
          id: userId
        }
      });
      return true;
    } catch (error) {
      console.error("Error in userRepository updateUser: ", error);
      throw error;
    }
  }

  async deleteUser(userId){
    try {
      await user.destroy({
        where: {
          id: userId
        }
      });
      return true;
    } catch (error) {
      console.error("Error in userRepository deleteUser: ", error);
      throw error;
    }
  }

}

module.exports = userRepository;