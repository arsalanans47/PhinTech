const RecordService = require('../services/recordService');
const { StatusCodes } = require('http-status-codes');

const recordService = new RecordService();

const create = async (req, res) => {
  try {
    const recordData = {
      amount : req.body.amount,
      type: req.body.type,
      category: req.body.category,
      notes: req.body.notes,
      record_date: req.body.record_date,
      created_by: req.body.created_by
    };
    const record = await recordService.createRecord(recordData);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: record,
      message: 'Record created successfully',
      err: {}
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: {},
      message: 'Failed to create record',
      err: error
    });
  }
}


const getRecord = async (req, res) => {
  try {
    const record = await recordService.getRecord(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      data: record,
      message: 'Record fetched successfully',
      err: {}
    });
  } catch (error) {
    console.log("something went wrong in controller layer");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: {},
      message: 'Failed to get record',
      err: error
    });
  }
}

const getAll = async (req, res) => {
  try {
    const records = await recordService.getAllRecords(req.body || {});
    return res.status(StatusCodes.OK).json({
      success: true,
      data: records,
      message: 'Records fetched successfully',
      err: {}
    });
  } catch (error) {
    console.log("something went wrong in controller layer");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: {},
      message: 'Failed to get records',
      err: error
    });
  }
}

const getTotalIncome = async (req, res) => {
  try {
    const totalIncome = await recordService.getTotalIncome();
    return res.status(StatusCodes.OK).json({
      success: true,
      data: totalIncome,
      message: 'Total income fetched successfully',
      err: {}
    });
  } catch (error) {
    console.log("something went wrong in controller layer");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: {},
      message: 'Failed to fetch total income',
      err: error
    });
  }
}

const getTotalExpense = async (req, res) => {
  try {
    const totalExpense = await recordService.getTotalExpense();
    return res.status(StatusCodes.OK).json({
      success: true,
      data: totalExpense,
      message: 'Total expense fetched successfully',
      err: {}
    });
  } catch (error) {
    console.log("something went wrong in controller layer");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: {},
      message: 'Failed to fetch total expense',
      err: error
    });
  }
}

const getNetBalance = async (req, res) => {
  try {
    const netBalance = await recordService.getNetBalance();
    return res.status(StatusCodes.OK).json({
      success: true,
      data: netBalance,
      message: 'Net balance fetched successfully',
      err: {}
    });
  } catch (error) {
    console.log("something went wrong in controller layer");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: {},
      message: 'Failed to fetch net balance',
      err: error
    });
  }
}

const getCategoryTotal = async (req, res) => {
  try {
    const result = await recordService.getCategoryTotal(req.body?.category);
    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
      message: 'Category total fetched successfully',
      err: {}
    });
  } catch (error) {
    console.log("something went wrong in controller layer");
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      data: {},
      message: 'Failed to fetch category total',
      err: error.message || error
    });
  }
}

const getRecentActivity = async (req, res) => {
  try {
    const records = await recordService.getRecentActivity();
    return res.status(StatusCodes.OK).json({
      success: true,
      data: records,
      message: 'Recent activity fetched successfully',
      err: {}
    });
  } catch (error) {
    console.log("something went wrong in controller layer");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: {},
      message: 'Failed to fetch recent activity',
      err: error
    });
  }
}


const updateRecord = async (req, res) => {
  try {
    const response = await recordService.updateRecord(req.params.id, req.body);
    return res.status(StatusCodes.OK).json({
      success: true,
      data: response,
      message: 'Record updated successfully',
      err: {}
    });
  } catch (error) {
    console.log("something went wrong in contoller layer");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: {},
      message: 'Failed to update record',
      err: error
    })
  }
}

const deleteRecord = async (req, res) => {
  try {
    const response = await recordService.deleteRecord(req.params.id, req.body);
    return res.status(StatusCodes.OK).json({
      success: true,
      data: response,
      message: 'Record deleted successfully',
      err: {}
    });
  } catch (error) {
    console.log("something went wrong in controller layer");
    return res.status(500).json({
      success: false,
      data: {},
      message: 'Failed to delete record',
      err: error
    });
  }
}

module.exports = {
  create,
  getRecord,
  getAll,
  getTotalIncome,
  getTotalExpense,
  getNetBalance,
  getCategoryTotal,
  getRecentActivity,
  updateRecord,
  deleteRecord
}