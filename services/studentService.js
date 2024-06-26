const pool = require('../models/db.js');

const addStudent = async (name) => {
    const insertQuery = `
        INSERT INTO students (name)
        VALUES ($1)
    `;
    return await pool.query(insertQuery, [name]);
};

const getStudent = async (student_id) => {
    const readQuery = `
        SELECT * FROM students 
        WHERE rollno=$1
    `;
    return await pool.query(readQuery, [student_id]);
};

const getAllStudent = async () => {
    const readQuery = `
        SELECT * FROM students 
    `;
    return await pool.query(readQuery);
};

const updateStudent = async (student_id, name) => {
    const updateQuery = `
        UPDATE students 
        SET name=$1 WHERE rollno=$2
    `;
    return await pool.query(updateQuery, [name, student_id]);
};

const deleteStudent = async (name) => {
    const deleteQuery = `
        DELETE FROM students 
        WHERE rollno=$1
    `;
    return await pool.query(deleteQuery, [name]);
};

module.exports = {
    addStudent,
    getStudent, getAllStudent,
    updateStudent,
    deleteStudent
}