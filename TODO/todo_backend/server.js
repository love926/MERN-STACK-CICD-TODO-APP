const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();

app.use(cors());
app.use(express.json());

/*
|--------------------------------------------------------------------------
| MongoDB Connection
|--------------------------------------------------------------------------
*/

mongoose.connect("mongodb://mongodb:27017/TODO")
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.log("MongoDB connection error:", err);
});

/*
|--------------------------------------------------------------------------
| Server
|--------------------------------------------------------------------------
*/

app.listen(5000, () => {
    console.log("Server listening on port: 5000");
});

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

// Add Todo
app.post('/add', (req, res) => {

    const { task } = req.body;

    TodoModel.create({ task })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});


// Get Todos
app.get('/get', (req, res) => {

    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});


// Mark Todo Done
app.put('/edit/:id', (req, res) => {

    const { id } = req.params;

    TodoModel.findByIdAndUpdate(
        id,
        { done: true },
        { new: true }
    )
    .then(result => res.json(result))
    .catch(err => res.json(err));
});


// Update Todo Text
app.put('/update/:id', (req, res) => {

    const { id } = req.params;
    const { task } = req.body;

    TodoModel.findByIdAndUpdate(
        id,
        { task: task },
        { new: true }
    )
    .then(result => res.json(result))
    .catch(err => res.json(err));
});


// Delete Todo
app.delete('/delete/:id', (req, res) => {

    const { id } = req.params;

    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

module.exports = app;
