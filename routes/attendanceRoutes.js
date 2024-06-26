const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// POST API 
router.post('/attendance', attendanceController.addAttendance);

// GET API 
router.get('/attendance/:rollno', attendanceController.getPresentTimeForMonth);

// GET API to fetch attendance records for a date range for a particular roll number
router.get('/attendance/range/:rollno', attendanceController.getAttendanceByDateRange);

module.exports = router;