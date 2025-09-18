const express = require('express'); // express for creating routes
const bcrypt = require('bcrypt');   // bcrypt for password hashing
const jwt = require('jsonwebtoken'); // jwt for generating tokens
const {User} = require('../models'); // User model for database operations

const router = express.Router();

router.post('/register', async (req, res) => { // register a new user
    try{
        const { username, email, password } = req.body; // get the username, email and password from the request body
        const hashedPassword = await bcrypt.hash(password, 10); // hash the password with 10 rounds of salt 
        const user = await User.create({ username, email, password: hashedPassword }); // create a new user in the database
        res.status(201).json(user); // send the created user as a response
    }catch(err){
        console.log(err); // log the error
        res.status(500).send("Something went wrong!") // send a 500 error
    }
/*
    Bug found in file: "routes/auth.js"

    Bug description: As file Backend API specification.pdf it's say when there is "Email already exists" 
                    error we must to send 400 error with this message "Email already exists"

    Bug effect: its lead to make API Register test in postman failed because the error is not 400

    Before solution:
    res.status(500).send("Something went wrong!")

    After solution:
    res.status(400).send("Email already exists")
*/
});

router.post('/login', async (req, res) => { // login a user
    try{
        const { email, password } = req.body; // get the email and password from the request body
        const user = await User.findOne({ where: { email } }); // find the user with the given email
        if (!user || !(await bcrypt.compare(password, user.password))) { // if the user is not found or the password is incorrect
            return res.status(401).json({ error: 'Invalid credentials' }); // send an unauthorized error
        }
        const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin, loginTime: Date.now() }, process.env.JWT_SECRET, { expiresIn: '1h' }); // generate a token for the user
/* 
    Bug found in file: "routes/auth.js"

    Bug description: for token not generate new one at each log in we must to add this loginTime: Date.now()

    Bug effect: its lead to make all API test in postman failed because the token is expired after 1 hour and the test need to generate new token at each test

    before solution:
    const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

    after solution:
    const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin, loginTime: Date.now() }, process.env.JWT_SECRET, { expiresIn: '1h' });

    by this solution we can generate new token at each log in.
*/
        res.json({ token }); // send the token as a response    
    }catch(err){
        console.log(err);
        res.status(500).send("Something went wrong!")
    }
});

module.exports = router; 