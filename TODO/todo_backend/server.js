const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

app.use(cors());
app.use(express.json());

/*
|--------------------------------------------------------------------------
| Environment Variables
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 5000;

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://mongodb:27017/TODO';

/*
|--------------------------------------------------------------------------
| MongoDB Connection
|--------------------------------------------------------------------------
*/

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

// Add Todo
app.post('/add', async (req, res) => {
  try {
    const { task } = req.body;

    const result = await TodoModel.create({
      task,
    });

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Todos
app.get('/get', async (req, res) => {
  try {
    const result = await TodoModel.find();

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Mark Todo Done
app.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await TodoModel.findByIdAndUpdate(
      id,
      { done: true },
      { new: true }
    );

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Todo
app.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    const result = await TodoModel.findByIdAndUpdate(
      id,
      { task: task },
      { new: true }
    );

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Todo
app.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await TodoModel.findByIdAndDelete({
      _id: id,
    });

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*
|--------------------------------------------------------------------------
| Server
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
