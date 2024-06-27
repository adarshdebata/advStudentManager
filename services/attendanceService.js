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

const getPresentTimeForMonth = async (rollno, month, limit, offset) => {
    const query = `
        SELECT date, SUM(EXTRACT(EPOCH FROM exit_time - entry_time) / 3600) as total_present_hours
        FROM attendance
        WHERE rollno = $1
        AND EXTRACT(MONTH FROM date) = $2
        GROUP BY date
        ORDER BY date
        LIMIT $3 OFFSET $4
    `;
    const result = await pool.query(query, [rollno, month, limit, offset]);

    return result.rows.map(row => ({
        date: row.date.toISOString().split('T')[0],
        total_present_hours: parseFloat(row.total_present_hours).toFixed(2)
    }));
};

const getAttendanceByDateRange = async (rollno, start_date, end_date, limit, offset) => {
    const query = `
        SELECT date, entry_time, exit_time
        FROM attendance
        WHERE rollno = $1
        AND date BETWEEN $2 AND $3
        ORDER BY date
        LIMIT $4 OFFSET $5
    `;
    const result = await pool.query(query, [rollno, start_date, end_date, limit, offset]);
    return result.rows.map(row => ({
        date: row.date.toISOString().split('T')[0],
        entry_time: row.entry_time,
        exit_time: row.exit_time
    }));
};

module.exports = {
    addAttendance,
    getPresentTimeForMonth,
    getAttendanceByDateRange
};