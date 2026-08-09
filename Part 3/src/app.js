const express = require('express');

const app = express();
app.use(express.json());

const notes = [];

// POST 
app.post('/notes', (req, res) => {
    // console.log(req.body);
    notes.push(req.body);

    res.status(201).json({
        message : "Note created successfully"
    });
})

// GET
app.get('/notes', (req, res) => {
    res.status(200).json({
        message : "Notes fetched successfully",
        notes : notes
    });
})

// DELETE
app.delete('/notes/:index', (req, res) => {
    const index = req.params.index;
    delete notes[index];

    res.status(200).json({
        message : "Note deleted successfully"
    });
})

// PATCH
app.patch('/notes/:index', (req, res) => {
    const index = req.params.index;
    const description = req.body.description;

    notes[index].description = description;

    res.status(200).json({
        message : "Note updated successfully"
    });
})

module.exports = app;   // export the app.js file