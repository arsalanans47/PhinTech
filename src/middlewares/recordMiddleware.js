const { StatusCodes } = require('http-status-codes');
const { user } = require('../models/index');

const validRequest = (req, res, next) => {
  if(!req.body.amount || !req.body.type || !req.body.record_date || !req.body.created_by){
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      data: {},
      message: 'Invalid request',
      err: 'Missing required properties in request body'
    });
  }
  next();
}

const validateAnalyticsAccess = async (req, res, next) => {
  try {
    const requesterId = req.body?.userId || req.body?.id || req.query?.userId || req.query?.id;

    if (!requesterId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        data: {},
        message: 'Invalid request',
        err: 'userId is required for analytics routes'
      });
    }

    const requester = await user.findByPk(requesterId);
    if (!requester) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: {},
        message: 'Invalid request',
        err: 'User not found'
      });
    }

    if (!['Admin', 'Analyst'].includes(requester.role)) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        data: {},
        message: 'Access denied',
        err: 'Only Admin and Analyst can access analytics routes'
      });
    }

    next();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: {},
      message: 'Failed to validate analytics access',
      err: error
    });
  }
}

module.exports = {
  validRequest,
  validateAnalyticsAccess
}