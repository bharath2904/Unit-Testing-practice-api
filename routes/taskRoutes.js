const express = require('express');
const {getTasks, getTaskById, addNewTask, updateTask, deleteTask} = require('../controllers/task-controller');  
const router = express.Router();


router.get('/get', getTasks);
router.get('/get/:id', getTaskById);
router.post('/add', addNewTask);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask)

module.exports = router;  

