const attendanceService = require('../services/attendanceService');

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

const getPresentTimeForMonth = async (req, res) => {
    const { rollno } = req.params;
    const { month } = req.query;

    try {
        const presentTimePerDay = await attendanceService.getPresentTimeForMonth(rollno, month);
        res.json({ present_time_per_day: presentTimePerDay });
    } catch (error) {
        console.error('Error fetching present time:', error);
        res.status(500).json({ error: 'Failed to fetch present time' });
    }
};

module.exports = {
    addAttendance,
    getPresentTimeForMonth
};