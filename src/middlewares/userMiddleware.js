const {StatusCodes} = require('http-status-codes');


const validRequest = (req, res, next) => {
  if(!req.body.name || !req.body.email || !req.body.password || !req.body.role || !req.body.status || !req.body.id){
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