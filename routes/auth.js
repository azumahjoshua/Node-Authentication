const router = require("express").Router();
const User = require("../model/User");
const { registerValidation,loginValidation} = require('../validation')
// Validation 
const joi = require("joi");

const schema = {
    name: joi.string().min(6).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required()
};

router.post('/register', async (req, res) => {
    try {
        // Validate the data before a a new user is created
        const { error } = registerValidation(req.body)
        if (error) return res.status(400).send(error.details[0].message);

        const { name, email, password } = req.body;

        // Check if a the user already exist 
        const userexist = await User.findOne({email})
        if(userexist) return res.status(400).send("User already exists")
        // Create a new user
        const user = new User({
            name: name,
            email: email,
            password: password
        });

        const newUser = await user.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/login", (req, res) => {
    res.send("Login");
});

module.exports = router;
