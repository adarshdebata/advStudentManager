const pool = require('../models/db');

const addAttendance = async (rollno, entry_time, exit_time) => {
    const insertQuery = `
        INSERT INTO attendance (rollno, entry_time, exit_time)
        VALUES ($1, $2, $3)
        ON CONFLICT (rollno, date) DO UPDATE
        SET entry_time = excluded.entry_time,
            exit_time = excluded.exit_time
    `;
    await pool.query(insertQuery, [rollno, entry_time, exit_time]);
};

const getPresentTimeForMonth = async (rollno, month) => {
    const query = `
        SELECT date, SUM(EXTRACT(EPOCH FROM exit_time - entry_time) / 3600) as total_present_hours
        FROM attendance
        WHERE rollno = $1
        AND EXTRACT(MONTH FROM date) = $2
        GROUP BY date
        ORDER BY date
    `;
    const result = await pool.query(query, [rollno, month]);

    return result.rows.map(row => ({
        date: row.date.toISOString().split('T')[0], 
        total_present_hours: parseFloat(row.total_present_hours).toFixed(2) 
    }));
};

module.exports = {
    addAttendance,
    getPresentTimeForMonth
};