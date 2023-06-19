const {Router} = require('express')
const { getStudents , getStudentByID, addStudent, removeStudent, updateStudent } = require('./controllers') 

const router = Router()

router.get('/', getStudents)
router.post('/', addStudent)
router.put('/:id', updateStudent)
router.get('/:id', getStudentByID)
router.delete('/:id', removeStudent)

module.exports = router