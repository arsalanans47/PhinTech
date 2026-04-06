const { financial_records, user } = require('../models/index');


class FinancialRecordsRepository {

  #createFilter(data ) {
    let filter = {};

    if (!data || Object.keys(data).length === 0) {
      return filter;
    }

    if (data.record_date) {
      filter.record_date = data.record_date;
    }

    if (data.category) {
      filter.category = data.category;
    }

    if (data.type) {
      filter.type = data.type;
    }

    return filter;
  }

  async createRecord(data) {
    try {
      const record = await financial_records.create(data);
      return record;
    } catch (error) {
      console.error("something went wrong in the repository layer");
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const foundUser = await user.findByPk(userId);
      return foundUser;
    } catch (error) {
      console.error("something went wrong in the repository layer");
      throw error;
    }
  }

  async getRecord(recordId){
    try {
      const record = await financial_records.findByPk(recordId);
      return record;
    } catch (error) {
      console.error("something went wrong in the repository layer");
      throw error;
    }
  }


  async getAllRecords(filter){
    try {
      const filterObject = this.#createFilter(filter);
      const records = await financial_records.findAll({
        where: filterObject
      });
      return records;
    } catch (error) {
      console.error("something went wrong in the repository layer");
      throw error;
    }
  }

  async getTotalIncome() {
    try {
      const totalIncome = await financial_records.sum('amount', {
        where: {
          type: 'Income'
        }
      });
      return Number(totalIncome) || 0;
    } catch (error) {
      console.error("something went wrong in the repository layer");
      throw error;
    }
  }

  async getTotalExpense() {
    try {
      const totalExpense = await financial_records.sum('amount', {
        where: {
          type: 'Expense'
        }
      });
      return Number(totalExpense) || 0;
    } catch (error) {
      console.error("something went wrong in the repository layer");
      throw error;
    }
  }

  async getNetBalance() {
    try {
      const totalIncome = await this.getTotalIncome();
      const totalExpense = await this.getTotalExpense();
      return Number(totalIncome) - Number(totalExpense);
    } catch (error) {
      console.error("something went wrong in the repository layer");
      throw error;
    }
  }

  async getCategoryTotal(category) {
    try {
      const total = await financial_records.sum('amount', {
        where: {
          category
        }
      });
      return Number(total) || 0;
    } catch (error) {
      console.error("something went wrong in the repository layer");
      throw error;
    }
  }

  async getRecentActivity(limit = 3) {
    try {
      const records = await financial_records.findAll({
        order: [['updatedAt', 'DESC']],
        limit
      });
      return records;
    } catch (error) {
      console.error("something went wrong in the repository layer");
      throw error;
    }
  }


  async updateRecord(recordId, data){
    try {
      await financial_records.update(data,{
        where: {
          id: recordId
        }
      });
      return true;
    } catch (error) {
      console.log("something went wrong in the repository layer");
      throw error;
    }
  }

  async deleteRecord(recordId){
    try {
      await financial_records.destroy({
        where: {
          id: recordId
        }
      });
      return true;
    } catch (error) {
      console.error("something went wrong in the repository layer");
      throw error;
    }
  }
}

module.exports = FinancialRecordsRepository;