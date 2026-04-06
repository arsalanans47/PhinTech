const { financial_records, user } = require('../models/index');


class FinancialRecordsRepository {

  createFilter(data) {
    let filter = {};

    if (data.date) {
      filter.record_date = data.date;
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
      const records = await financial_records.findAll({
        where: filter
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