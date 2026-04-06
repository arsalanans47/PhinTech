const userService = require('../services/userService');
const { StatusCodes } = require('http-status-codes');

const userservice = new userService();

const create = async (req, res) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      status: req.body.status,
      id: req.body.id
    }
    const response = await userservice.createUser(userData);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: response,
      message: 'User created successfully',
      err: {}
    })
  } catch (error) {
    console.log("Error in userController create: ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: {},
      message: 'Failed to create user',
      err: error
    });
  }
}

const getUser = async (req, res) => {
  try {
    const response = await userservice.getUser(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      data: response,
      message: 'User retrieved successfully',
      err: {}
    })
  } catch (error) {
    console.log("Error in userController getUser: ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: {},
      message: 'Failed to get user',
      err: error
    })
  }
}


const update = async (req, res) => {
  try {
    const response = await userservice.updateUsers(req.params.id, req.body);
    return res.status(StatusCodes.OK).json({
      success: true,
      data: response,
      message: 'User updated successfully',
      err: {}
    })
  } catch (error) {
    console.log("Error in userController update: ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: {},
      message: 'Failed to update user',
      err: error
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const response = await userservice.deleteUser(req.params.id, req.body);
    return res.status(StatusCodes.OK).json({
      success: true,
      data: response,
      message: 'User deleted successfully',
      err: {}
    })
  } catch (error) {
    console.log("Error in userController delete: ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: {},
      message: 'Failed to delete user',
      err: error
    })
  }
}


module.exports = {
  create,
  getUser,
  update,
  deleteUser
}