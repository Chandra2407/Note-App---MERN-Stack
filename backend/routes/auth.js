const express = require('express');
const User = require('../models/UserModel')
const authRouter = express.Router();
const asyncHandler = require("express-async-handler");
const {
    body,
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getUser = require('../middleware/getuser')

const JWT_SECRET = "graydragneel";

//create a user
authRouter.post("/register", [
    body('name', 'Enter a valid name').isLength({
        min: 4
    }),
    body('email').isEmail(),
    body('password').isLength({
        min: 4
    })
], asyncHandler(async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    });
    const createdUser = await user.save();
    if (!createdUser) {
        res.status(401).send({
            message: 'Inavlid User Data'
        });
    } else {
        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            token: generateToken(createdUser)
        })
    }
}))

//Login 

authRouter.post('/signin', [
    body('email', "Enter a valid email").isEmail(),
    body('password', 'Enter password').exists()
], asyncHandler(async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const signinUser = await User.findOne({
        email: req.body.email,
    });
    if (!signinUser) {
        res.status(401).send({
            message: 'Invalid user or password'
        });
    } else {
        const passwordCompare = await bcrypt.compare(req.body.password, signinUser.password);
        if (passwordCompare) {
            res.send({
                _id: signinUser._id,
                name: signinUser.name,
                email: signinUser.email,
                token: generateToken(signinUser),
            });
        } else {
            res.status(401).send({
                message: 'Invalid user or password'
            });
        }
    }
}));

authRouter.post('/getuser',getUser, asyncHandler(async (req, res) => {
    let userId = req.user._id;
    // console.log(req)
    const user = await User.findById(userId).select("-password");
    res.send(user);
}))

//token generation
const generateToken = (user) => jwt.sign({
        _id:user._id,
        name: user.name,
        email: user.email,
    },
    JWT_SECRET,
);

module.exports = authRouter