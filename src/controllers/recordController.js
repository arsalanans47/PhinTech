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
    return res.status(500).json({
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
    return res.status(500).json({
      success: false,
      data: {},
      message: 'Failed to get record',
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
    return res.status(500).json({
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
  updateRecord,
  deleteRecord
}