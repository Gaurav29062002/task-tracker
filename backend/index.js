// index.js
const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');
app.use(cors());


app.use(express.json());

// Route: Get all tasks
app.get('/tasks', async (req, res) => {
  const result = await db.query('SELECT * FROM tasks');
  res.json(result.rows);
});

// Route: Get task by ID
app.get('/tasks/:id', async (req, res) => {
  const result = await db.query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);
  if (result.rows.length === 0) return res.status(404).send('Task not found');
  res.json(result.rows[0]);
});

// Route: Create task
app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  const result = await db.query('INSERT INTO tasks(title) VALUES($1) RETURNING *', [title]);
  res.status(201).json(result.rows[0]);
});

// Route: Delete task
app.delete('/tasks/:id', async (req, res) => {
  await db.query('DELETE FROM tasks WHERE id = $1', [req.params.id]);
  res.sendStatus(204);
});

// Route: Update task by ID
app.put('/tasks/:id', async (req, res) => {
    const { title } = req.body;
    const result = await db.query(
      'UPDATE tasks SET title = $1 WHERE id = $2 RETURNING *',
      [title, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).send('Task not found');
    res.json(result.rows[0]);
  });

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'API is working' });
  });
  

app.listen(3000, () => console.log('Server running on port 3000'));
