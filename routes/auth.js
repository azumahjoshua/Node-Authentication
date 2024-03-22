const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { registerValidation,loginValidation} = require('../validation')


router.post('/register', async (req, res) => {
    try {
        // Validate the data before a a new user is created
        // const { error } = registerValidation(req.body)
        // if (error) return res.status(400).send(error.details[0].message);

        const { name, email, password } = req.body;

        // Check if a the user already exist 
        const userExist = await User.findOne({email})
        if(userExist) return res.status(400).send("User already exists")

        // Hash Password
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        // Create a new user
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        const newUser = await user.save();
        res.status(201).send({user:user._id});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('Email or password is incorrect');

        // Check if the password is correct
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) return res.status(400).send('Email or password is incorrect');

        // Create and assign a token
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.json({user, token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});
module.exports = router;
