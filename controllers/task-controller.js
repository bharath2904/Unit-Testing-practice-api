const Task = require('../models/task');  

// Get Method to Get All The Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();  
    res.status(200).json(tasks);  
  } catch (error) {
    res.status(404).json(
        { message: 'Tasks Not Found' }
    );  
  }
};

// Get Method to Get a Single Task
const getTaskById  = async (req, res) =>{
  const getId = req.params.id;
  try {
    const singleTask = await Task.findById(getId)
    if(singleTask){
      res.status(200).json({
        success: true,
        message: 'The Single Task by ID',
        data: singleTask
      })
    }
  } catch (error) {
    res.status(404).json(
      { message: 'Tasks Not Found' }
  ); 
  }
}

// Post Method to Add a New Task
const addNewTask = async (req, res) =>{
  const {task, completed} = req.body;
  try {
    const createNewTask = new Task({
      task,
      completed
    })
    const newTask = await createNewTask.save();

    if(newTask){
      res.status(200).json({
        success: true,
        message: 'The Task is Created Successfully',
        data: newTask
      })
    }
  } catch (error) {
    res.status(404).json(
      { message: 'Task was Not Created' }
  ); 
  }
}

// Put Method to Update a Task by ID
const updateTask = async (req, res) =>{
  const getCurtTaskId = req.params.id;
  const {task, completed} = req.body;
  try {
    const updateTask = await Task.findByIdAndUpdate(
      getCurtTaskId,
      {task, completed},
      {new: true}
    )
      if(updateTask){
          res.status(200).json({
              success: 'The Task Updated Successfully',
              data: updateTask
          })
      }
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'The Task Updated Failed'
      })
  }
}

// Delete Method to Delete a Task by ID
const deleteTask = async (req, res) =>{
  const getId = req.params.id
  try {
    const deleteTask = await Task.findByIdAndDelete(getId);
    if(deleteTask){
          res.status(200).json({
              success: true,
              message: 'The Task was Deleted Successfully',
              data: deleteTask
          })
      }
      
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Task Deleted Failed'
      })
  }
}

module.exports = {
  getTasks,
  getTaskById,
  addNewTask,
  updateTask,
  deleteTask
};  
