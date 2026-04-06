const { StatusCodes } = require('http-status-codes');

const validRequest = (req, res, next) => {
  if(!req.body.amount || !req.body.type || !req.body.category || !req.body.record_date || !req.body.created_by){
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      data: {},
      message: 'Invalid request',
      err: 'Missing required properties in request body'
    });
  }
  next();
}

module.exports = {
  validRequest
}