const express = require('express');
const router = express.Router();

let users = [
  { id: 1, name: 'Alice' }
];

let todos = [];

// Get all users
router.get('/users', (req, res) => {
  res.json(users);
});

// Add a new user
router.post('/users', (req, res) => {
  const { name } = req.body;
  const newUser = { id: Date.now(), name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Delete a user
router.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  todos = todos.filter(t => t.userId !== id);
  res.sendStatus(204);
});

// Get todos by userId
router.get('/todos/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  res.json(todos.filter(todo => todo.userId === userId));
});

// Add todo for user
router.post('/todos/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { title } = req.body;
  const newTodo = { id: Date.now(), userId, title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Toggle complete
router.put('/todos/:id/toggle', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).send('Not found');
  todo.completed = !todo.completed;
  res.json(todo);
});

// Delete todo
router.delete('/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.sendStatus(204);
});

module.exports = router;
