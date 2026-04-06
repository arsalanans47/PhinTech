const express = require("express");

const { recordMiddleware } = require('../../middlewares/index');
const { userMiddleware } = require('../../middlewares/index');
const recordController = require('../../controllers/recordController');
const userController = require('../../controllers/userController');


const router = express.Router();

//Financial Record routes
router.post(
  '/record',
  recordMiddleware.validRequest,
  recordController.create
);

router.get('/record/total-income',
  recordMiddleware.validateAnalyticsAccess,
  recordController.getTotalIncome
);

router.get('/record/total-expense',
  recordMiddleware.validateAnalyticsAccess,
  recordController.getTotalExpense
);

router.get('/record/net-balance',
  recordMiddleware.validateAnalyticsAccess,
  recordController.getNetBalance
);

router.get('/record/category-total',
  recordMiddleware.validateAnalyticsAccess,
  recordController.getCategoryTotal
);

router.get('/record/recent-activity',
  recordMiddleware.validateAnalyticsAccess,
  recordController.getRecentActivity
);

router.get(
  '/record/:id',
  recordController.getRecord
);

router.get('/record',
  recordController.getAll
);

router.patch(
  '/record/:id',
  recordController.updateRecord
);

router.delete(
  '/record/:id',
  recordController.deleteRecord
);


//User routes

router.post('/user',
  userMiddleware.validRequest,
  userController.create
);

router.get('/user/:id',
  userController.getUser
);

router.get('/users',
  userController.getAll
);

router.patch('/user/:id',
  userController.update
);

router.delete('/user/:id',
  userController.deleteUser
);

module.exports = router;