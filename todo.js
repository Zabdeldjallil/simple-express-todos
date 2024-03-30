const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let todos = [
  { id: 1, text: 'Learn Express.js', done: false },
  { id: 2, text: 'Build a todo app', done: false },
];

app.use(express.json());

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Get a single todo
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
});

// Create a new todo
app.post('/todos', (req, res) => {
  const { text } = req.body;
  const newTodo = {
    id: todos.length + 1,
    text,
    done: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text, done } = req.body;
  const todo = todos.find(todo => todo.id === id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  todo.text = text || todo.text;
  todo.done = done !== undefined ? done : todo.done;
  res.json(todo);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
