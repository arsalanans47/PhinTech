'use strict';
const {
  Model
} = require('sequelize');
const { SALT } = require('../config/server-config');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.financial_records, {
        foreignKey: 'created_by'
      });
    }
  }
  user.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    
    },
    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['Admin', 'Analyst', 'Viewer']
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['Active', 'Inactive']
    }
  }, {
    sequelize,
    modelName: 'user',
  });

  user.beforeCreate((user) => {
    const encryptedPassword =  bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
  });
  return user;
};