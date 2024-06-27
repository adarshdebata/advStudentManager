const pool = require('../models/db.js');

const studentOptedCourses = async (rollno, courseId, isPaid)=>{
    const studentOptedCourseQuery = `INSERT INTO fees( rollno, course_id, ispaid) VALUES ($1,$2,$3)`;
    return await pool.query(studentOptedCourseQuery,[rollno, courseId, isPaid]);
}

const getAllFeeStructures = async ()=>{
    const getAllFeeStructureQuery = `SELECT * FROM fees`;
    return await pool.query(getAllFeeStructureQuery);
}

const changeStatuses = async(ok,rollno,course_id)=>{
    const changeStatusQuery = `UPDATE fees SET ispaid = $1 WHERE rollno = $2 AND course_id = $3`;
    return await pool.query(changeStatusQuery,[ok,rollno,course_id]);
} 


const studentsCourses = async(rollno)=>{
    const studentCourseQuery = `SELECT * FROM fees WHERE rollno =$1 `;
    return await pool.query(studentCourseQuery,[rollno]);
}

const coursesOptedBy = async(courseId)=>{
    const courseOptedByQuery = `SELECT * FROM fees WHERE course_id = $1`;
    return await pool.query(courseOptedByQuery,[courseId]); 
}

module.exports={
    studentOptedCourses,
    getAllFeeStructures,
    changeStatuses,
    studentsCourses,
    coursesOptedBy
}