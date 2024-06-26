const express = require('express');
const router = express.Router();

const { addStudent, getStudent, updateStudent, deleteStudent, getAllStudent } = require('../controllers/studentController.js');
const { isAuthorized } = require('../middlewares/AuthMiddleware.js');

router.post('/', isAuthorized, addStudent);
router.get('/all', getAllStudent);
router.get('/:student_id', getStudent);
router.put('/:student_id', updateStudent);
router.delete('/:student_id', isAuthorized, deleteStudent);

module.exports = router;