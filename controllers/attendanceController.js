const attendanceService = require('../services/attendanceService');

// API to add attendance
const addAttendance = async (req, res) => {
    const { rollno, entry_time, exit_time } = req.body;
    try {
        await attendanceService.addAttendance(rollno, entry_time, exit_time);
        res.status(201).json({ message: 'Attendance added successfully' });
    } catch (error) {
        console.error('Error adding attendance:', error);
        res.status(500).json({ error: 'Failed to add attendance' });
    }
};

// API to fetch attendance records for a particular month
const getPresentTimeForMonth = async (req, res) => {
    const { rollno } = req.params;
    const { month, limit = 10, offset = 0 } = req.query;

    try {
        const presentTimePerDay = await attendanceService.getPresentTimeForMonth(rollno, month, parseInt(limit), parseInt(offset));
        res.json({ present_time_per_day: presentTimePerDay });
    } catch (error) {
        console.error('Error fetching present time:', error);
        res.status(500).json({ error: 'Failed to fetch present time' });
    }
};

// API to fetch attendance records for a date range for a particular roll number
const getAttendanceByDateRange = async (req, res) => {
    const { rollno } = req.params;
    const { start_date, end_date, limit = 10, offset = 0 } = req.query;

    try {
        const attendanceData = await attendanceService.getAttendanceByDateRange(rollno, start_date, end_date, parseInt(limit), parseInt(offset));
        res.json({ attendance_data: attendanceData });
    } catch (error) {
        console.error('Error fetching attendance data by date range:', error);
        res.status(500).json({ error: 'Failed to fetch attendance data' });
    }
};

module.exports = {
    addAttendance,
    getPresentTimeForMonth,
    getAttendanceByDateRange
};