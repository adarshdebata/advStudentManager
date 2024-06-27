const pool = require('../models/db.js');

const studentOptedCourses = async (rollno, courseId, isPaid)=>{
    const studentOptedCourseQuery = `INSERT INTO fees( rollno, course_id, ispaid) VALUES ($1,$2,$3)`;
    return await pool.query(studentOptedCourseQuery,[rollno, courseId, isPaid]);
}

const getAllFeeStructures = async (page, limit) => {
    const offset = (page - 1) * limit;
    const getAllFeeStructureQuery = `SELECT * FROM fees LIMIT $1 OFFSET $2`;
    const countQuery = `SELECT COUNT(*) FROM fees`;
    
    const result = await pool.query(getAllFeeStructureQuery, [limit, offset]);
    const countResult = await pool.query(countQuery);
    
    return {
        rows: result.rows,
        total: parseInt(countResult.rows[0].count, 10),
    };
};

const changeStatuses = async(ok,rollno,course_id)=>{
    const changeStatusQuery = `UPDATE fees SET ispaid = $1 WHERE rollno = $2 AND course_id = $3`;
    return await pool.query(changeStatusQuery,[ok,rollno,course_id]);
} 


const studentsCourses = async (rollno, page, limit) => {
    const offset = (page - 1) * limit;
    const studentCourseQuery = `SELECT * FROM fees WHERE rollno = $1 LIMIT $2 OFFSET $3`;
    const countQuery = `SELECT COUNT(*) FROM fees WHERE rollno = $1`;

    const result = await pool.query(studentCourseQuery, [rollno, limit, offset]);
    const countResult = await pool.query(countQuery, [rollno]);

    return {
        rows: result.rows,
        total: parseInt(countResult.rows[0].count, 10),
    };
};


const coursesOptedBy = async(courseId,page,limit)=>{
    const offset = (page -1)*limit;
    const courseOptedByQuery = `SELECT * FROM fees WHERE course_id = $1 LIMIT $2 OFFSET $3`;
    const countQuery = `SELECT COUNT(*) FROM fees WHERE course_id = $1`;
    const result = await pool.query(courseOptedByQuery,[courseId,limit,offset])
    const countResult= await pool.query(countQuery,[courseId]); 
    return {
        rows: result.rows,
        total: parseInt(countResult.rows[0].count, 10),
    };
}

module.exports={
    studentOptedCourses,
    getAllFeeStructures,
    changeStatuses,
    studentsCourses,
    coursesOptedBy
}