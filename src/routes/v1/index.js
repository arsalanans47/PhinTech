const express = require("express");

const { recordMiddleware } = require('../../middlewares/index');
const recordController = require('../../controllers/recordController');


const router = express.Router();


router.post(
  '/record',
  recordMiddleware.validRequest,
  recordController.create
);

router.get(
  '/record/:id',
  recordController.getRecord
);


router.patch(
  '/record/:id',
  recordController.updateRecord
);

router.delete(
  '/record/:id',
  recordController.deleteRecord
);

module.exports = router;