const pool = require('../models/db.js');
const studentService = require('../services/studentService.js')

const addStudent = async (req, res) => {
    const { name } = req.body;
    await studentService.addStudent(name)
        .then(() => {
            res.status(201).json({ message: "Student created." });
        }).catch(error => {
            res.status(500).json({ Error: error });
        })
}

const getStudent = async (req, res) => {
    const student_id = req.params.student_id;
    await studentService.getStudent(student_id)
        .then(result => {
            res.status(200).json({
                message: "Data fetched successfully",
                data: result.rows
            });
        }).catch(error => {
            res.status(500).json({ Error: error });
        })
}

const getAllStudent = async (req, res) => {
    await studentService.getAllStudent()
        .then(result => {
            res.status(200).json({
                message: "Data fetched successfully",
                data: result.rows
            });
        }).catch(error => {
            res.status(500).json({ Error: error });
        })
}

const updateStudent = async (req, res) => {
    const student_id = req.params.student_id;
    const { name } = req.body;
    await studentService.updateStudent(student_id, name)
        .then(result => {
            res.status(200).json({ message: "Student details updated." });
        }).catch(error => {
            res.status(500).json({ Error: error });
        })
}

const deleteStudent = async (req, res) => {
    const student_id = req.params.student_id;
    await studentService.deleteStudent(student_id)
        .then(() => {
            res.status(200).json({ message: "Student deleted." });
        }).catch(error => {
            res.status(500).json({ Error: error });
        })
}

module.exports = {
    addStudent, getStudent, getAllStudent,
    updateStudent, deleteStudent
}