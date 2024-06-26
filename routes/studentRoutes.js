const express = require('express');
const router = express.Router();

const { addStudent, getStudent, updateStudent, deleteStudent, getAllStudent } = require('../controllers/studentController.js')

router.post('/', addStudent);
router.get('/all', getAllStudent);
router.get('/:student_id', getStudent);
router.put('/:student_id', updateStudent);
router.delete('/:student_id', deleteStudent);

module.exports = router;