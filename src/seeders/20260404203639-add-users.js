'use strict';

const bcrypt = require('bcrypt');
const {SALT} = require('../config/server-config');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [
    {
      name: 'captain price',
      email: 'captainprice@email.com',
      password: bcrypt.hashSync('12345', SALT),
      role: 'Admin',
      status: 'Active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'ghost',
      email: 'ghost@email.com',
      password: bcrypt.hashSync('12345', SALT),
      role: 'Admin',
      status: 'Active',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
