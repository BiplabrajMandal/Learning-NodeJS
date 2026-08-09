const express = require('express');
const validationRules = require('./middlewares/validation.middleware');

const app = express();
app.use(express.json());

// app.get("/", (req, res) => [
//     res.status(200).json({message: "Hello, World!"})
// ])

app.post("/register", validationRules.registerValidationRules, (req, res) => {
    const { userName, email, password } = req.body;

    res.status(201).json({
        message: "User registered successfully",
        user: {
            userName,
            email
        }
    })
})

module.exports = app;