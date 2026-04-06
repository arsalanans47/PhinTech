'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


    await queryInterface.bulkInsert('financial_records', [
    {
      amount: 1200.00,
      type: 'Income',
      category: 'Salary',
      record_date: '2024-04-01',
      notes: 'Monthly salary for April',
      created_by: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      amount: 450.00,
      type: 'Expense',
      category: 'Groceries',
      record_date: '2024-04-03',
      notes: 'Weekly grocery shopping',
      created_by: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      amount: 200.00,
      type: 'Expense',
      category: 'Utilities',
      record_date: '2024-04-05',
      notes: 'Electricity bill for April',
      created_by: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
