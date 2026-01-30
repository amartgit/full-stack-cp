const express = require('express');
const router = express.Router();

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Add a user
router.post('/', (req, res) => {
  const { name } = req.body;
  const newUser = { id: Date.now(), name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Delete a user
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.sendStatus(204);
});

module.exports = router;
