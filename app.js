const express = require('express');
const taskRoutes = require('./routes/taskRoutes'); 
const app = express();
const port = 3000;

let server

app.use(express.json()); 
app.use('/api/tasks', taskRoutes); 


server = app.listen(port, () => {
  console.log('server running on port 3000');
});

afterAll(async () => {
  await server.close();  // Ensure server is properly closed after tests
  console.log('Server closed');
});




module.exports = app; 


