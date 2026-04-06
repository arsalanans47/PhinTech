const userRepository = require('../repository/userRepository');

class userService {
  constructor() {
    this.userRepo = new userRepository();
  }

  async createUser(userData){
    try {
      const creator = await this.userRepo.getUserById(userData.id);
      if (!creator) {
        throw new Error("User not found");
      }
      if(creator.role !== 'Admin'){
        throw new Error("Only admin can create users");
      }
      delete userData.id; // Remove id from userData to prevent it from being set in the DB
      const response = await this.userRepo.createUser(userData);
      return response;
    } catch (error) {
      console.log("error in userService createUser: ", error);
      throw error;
    }
  }


  async getUser(userId){
    try {
      const user = await this.userRepo.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.log("error in userService getUser: ", error);
      throw error;
    }
  }


  async getAllUsers(adminId){
    try {
      const user = await this.userRepo.getUserById(adminId);
      if (!user) {
        throw new Error("User not found");
      }
      if(user.role !== 'Admin'){
        throw new Error("Only admin can view all users");
      }
      const users = await this.userRepo.getAllUsers();
      return users;
    } catch (error) {
      console.log("error in userService getAllUsers: ", error);
      throw error;
    }
  }


  async updateUsers(userId, data){
    try {
      const user = await this.userRepo.getUserById(data.id);
      if (!user) {
        throw new Error("User not found");
      }
      if(user.role !== 'Admin'){
        throw new Error("Only admin can update users");
      }
      delete data.id; // Remove id from data to prevent it from being updated in the DB
      const updated = await this.userRepo.updateUser(userId, data);
      return updated;
    } catch (error) {
      console.log("error in userService updateUser: ", error);
      throw error;
    }
  }


  async deleteUser(userId, data){
    try {
      const user = await this.userRepo.getUserById(data.id);
      if (!user) {
        throw new Error("User not found");
      }
      if(user.role !== 'Admin'){
        throw new Error("Only admin can delete users");
      }
      const deleted = await this.userRepo.deleteUser(userId);
      return deleted;
    } catch (error) {
      console.log("error in userService deleteUser: ", error);
      throw error;
    }
  }
}

module.exports = userService;