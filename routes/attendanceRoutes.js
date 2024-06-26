const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// POST API 
router.post('/attendance', attendanceController.addAttendance);

// GET API 
router.get('/attendance/:rollno', attendanceController.getPresentTimeForMonth);

module.exports = router;