const FinancialRecordsRepository = require('../repository/financialRecords-repository');

class RecordService {
  constructor() {
    this.financialRepo = new FinancialRecordsRepository();
  }

  static allowedCategories = ['Earning', 'Food', 'Transport', 'Housing', 'miscellaneous'];

  async createRecord(recordData){
    try {
      // Business logic: verify the creator exists and is an Admin
      const creator = await this.financialRepo.getUserById(recordData.created_by);
      if (!creator) {
        throw new Error("User not found");
      }
      if (creator.role !== 'Admin') {
        throw new Error("Only admin can create financial records");
      }
      const response = await this.financialRepo.createRecord(recordData);
      return response;
    } catch (error) {
      console.log("something went wrong in service layer")
      throw error;
    }
  }

  async getRecord(recordId){
    try {
      const response = await this.financialRepo.getRecord(recordId);
      return response;
    } catch (error) {
      console.log("something went wrong in service layer");
      throw error;
    }
  }


  // async getAllRecords(){
  //   try {
  //     const records = await this.financialRepo.getAllRecords(Data);
  //     return records;
  //   } catch (error) {
  //     console.log("something went wrong in service layer");
  //     throw error;
  //   }
  // }

  async getAllRecords(Data){
    try {
      const records = await this.financialRepo.getAllRecords(Data || {});
      return records;
    } catch (error) {
      console.log("something went wrong in service layer");
      throw error;
    }
  }

  async getTotalIncome(){
    try {
      const totalIncome = await this.financialRepo.getTotalIncome();
      return totalIncome;
    } catch (error) {
      console.log("something went wrong in service layer");
      throw error;
    }
  }

  async getTotalExpense(){
    try {
      const totalExpense = await this.financialRepo.getTotalExpense();
      return totalExpense;
    } catch (error) {
      console.log("something went wrong in service layer");
      throw error;
    }
  }

  async getNetBalance(){
    try {
      const netBalance = await this.financialRepo.getNetBalance();
      return netBalance;
    } catch (error) {
      console.log("something went wrong in service layer");
      throw error;
    }
  }

  async getCategoryTotal(category){
    try {
      if (!category) {
        throw new Error('category is required');
      }

      const normalizedCategory = String(category).trim();
      if (!RecordService.allowedCategories.includes(normalizedCategory)) {
        throw new Error('Invalid category. Allowed categories: Earning, Food, Transport, Housing, miscellaneous');
      }

      const total = await this.financialRepo.getCategoryTotal(normalizedCategory);
      return {
        category: normalizedCategory,
        total
      };
    } catch (error) {
      console.log("something went wrong in service layer");
      throw error;
    }
  }

  async getRecentActivity(){
    try {
      const recentRecords = await this.financialRepo.getRecentActivity(3);
      return recentRecords;
    } catch (error) {
      console.log("something went wrong in service layer");
      throw error;
    }
  }

  async updateRecord(recordId, data){
    try {
      // Business logic: userId is required and must be an Admin
      if(!data.userId){
        throw new Error("user id is required to update a record");
      }
      const creator = await this.financialRepo.getUserById(data.userId);
      if(!creator){
        throw new Error("User not found");
      }
      if(creator.role !== 'Admin'){
        throw new Error("Only admin can update financial records");
      }
      const record = await this.financialRepo.getRecord(recordId);
      if(!record){
        throw new Error("Record not found");
      }
      const response = await this.financialRepo.updateRecord(recordId, data);
      return response;
    } catch (error) {
      console.log("something went wrong in service layer");
      throw error;
    }
  }

  async deleteRecord(recordId, data){
    try {
      // Business logic: userId is required and must be an Admin
      if(!data.userId){
        throw new Error("userId is required to delete a record");
      }
      const creator = await this.financialRepo.getUserById(data.userId);
      if(!creator){
        throw new Error("User not found");
      }
      if(creator.role !== 'Admin'){
        throw new Error("Only admin can delete financial records");
      }
      const record = await this.financialRepo.getRecord(recordId);
      if(!record){
        throw new Error("Record not found");
      }
      const response = await this.financialRepo.deleteRecord(recordId);
      return response;
    } catch (error) {
      console.log("something went wrong in service layer");
      throw error;
    }
  }
}

module.exports = RecordService;
