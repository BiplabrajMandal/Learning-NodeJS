const mongoose = require('mongoose');

const noteschema = new mongoose.Schema({
    title : String,
    description : String
})

const noteModel = mongoose.model("note", noteschema);

module.exports = noteModel