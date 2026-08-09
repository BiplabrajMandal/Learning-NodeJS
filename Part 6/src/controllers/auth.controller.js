const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    const {userName, email, password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message : "User already exists"
        })
    }
    
    const user = await userModel.create({
        userName, email, password
    });

    const token = jwt.sign({
        id : user._id,
    }, process.env.JWT_SECRET);

    res.cookie("token", token); // The token will be saved in the mentioned name i.e., "token"

    res.status(201).json({
        message : "User registered successfully",
        user
    })
}

module.exports = {registerUser};