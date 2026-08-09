const express = require('express');
const noteModel = require("./models/node.model");

const app = express();
app.use(express.json());

// POST : /notes => Create a note
app.post("/notes", async (req, res) => {
    const data = req.body;  // {tile, description}
    await noteModel.create({
        title : data.title,
        description : data.description
    });

    res.status(201).json({
        message : "Note created successfully"
    });
})

// GET : /notes => Fetch notes
app.get("/notes", async (req, res) => {
    const notes = await noteModel.find(); // it will return a array of objects, but it there no note then we will get an empty array. We can also apply condition like findOne({...}), to get a specific note(s)
    
    res.status(200).json({
        message : "Notes fetched successfully",
        notes : notes
    });
    
    // const note = await noteModel.findOne({
    //     title : "test_title_1"
    // }); // it will return a single object
    
    // res.status(200).json({
    //     message : "Note fetched successfully",
    //     note : note
    // });

    // If there's a case in which the codition didn't matches with none of the note, then it will return [] or null.
})

// DELETE : /notes/:id => Delete Note 
app.delete("/notes/:id", async (req, res) => {
    const id = req.params.id;

    await noteModel.findByIdAndDelete({
        _id : id
    });

    res.status(200).json({
        message : "Note deleted successfully"
    });
})

// PATCH : /notes/:id => Update Note
app.patch("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const description = req.body.description;

    await noteModel.findOneAndUpdate({
        _id : id
    }, {
        description : description
    });

    res.status(200).json({
        message : "Note updated successfully"
    });
})

module.exports = app;