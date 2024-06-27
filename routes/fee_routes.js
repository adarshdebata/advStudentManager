const express = require('express');
const router = express.Router();
const controller = require('../controllers/fee_controller')

router.get('/feeStructure', controller.getAllFeeStructure);

router.post('/enroll', controller.studentOptedCourse);

router.patch('/changeStatus', controller.changeStatus);

router.get('/studentsCourses',controller.studentsCourse);

router.get('/courseOptedBy/:id',controller.courseOptedBy)

module.exports = router;