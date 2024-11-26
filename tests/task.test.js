const supertest = require('supertest');
const app = require('../app'); 
const Task = require('../models/task'); 
const httpMocks = require('node-mocks-http');
const task = require('../models/task');


jest.mock('../models/task'); 

// Test the GET method for list of all the tasks.
describe('GET /tasks', () => {
  it('should return a list of tasks', async () => {

    Task.find.mockResolvedValue([
      { task: 'Task 1', completed: true},
      { task: 'Task 2', completed: false},
    ]);

    const response = await supertest(app).get('/api/tasks/get'); 

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { task: 'Task 1', completed: true },
      { task: 'Task 2', completed: false },
    ]);
  });
});

// Test the GET method for get a single task by id.
describe('GET /tasks/get/:id', () =>{
  it('should return the single task by id', async ()=>{
    const taskId = 1;
    const task = {_id: taskId, task: 'Task 2', completed: false};
    Task.findById.mockResolvedValue(task);

    const response = await supertest(app).get(`/api/tasks/get/${taskId}`); 

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('The Single Task by ID');
    expect(response.body.data).toEqual(task)
  })
})

// Test the POST method to add new task 
describe('POST /tasks/add', () =>{
  it('should return the add new task', async () =>{
    const newTask = {task: 'Task 3', completed: true};
    const savedTask = {_id: 3, task: 'Task 3', completed: true};
   
    Task.prototype.save.mockResolvedValue(savedTask);


    const response = await supertest(app).post('/api/tasks/add').send(newTask);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(savedTask);
  })
})

// Test the PUT method to update the task by id
describe('PUT /tasks/update', () =>{
  it('should return the update task by id', async () =>{
    const taskId = 1;
    const updateTask = {_id: taskId, task: 'Update Task', completed: false}

    Task.findByIdAndUpdate.mockResolvedValue(updateTask);

    const updateData = {task: 'Updated Task', completed: true}

    const response = await supertest(app).put(`/api/tasks/update/${taskId}`).send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(updateTask);
  })
})



// Test the DELETE method to delete the task by id
describe('DELETE /tasks/delete/:id', () =>{
  it('should return and delete the exists task', async () =>{
    const taskId = 1;
    const deleteTask = {_id: taskId, task: 'Deleted Task', completed: true};

    Task.findByIdAndDelete.mockResolvedValue(deleteTask);

    const response = await supertest(app).delete(`/api/tasks/delete/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(deleteTask);
  })
})

