/*
============================================================================
Name        : test.js
Description : This file generate hashed password for any user to use it in the database
Author      : Bassam Ashraf
============================================================================
*/

const bcrypt = require('bcrypt');                    // import bcrypt for password hashing

const hashadmin = bcrypt.hashSync('admin123', 10);       // hash the password with 10 rounds of salt for admin
const hashbassam = bcrypt.hashSync('bassam123', 10);     // hash the password with 10 rounds of salt for bassam
const hashashraf = bcrypt.hashSync('ashraf@123', 10);     // hash the password with 10 rounds of salt for ashraf
const hashmohamed = bcrypt.hashSync('Mohamed@Test_123', 10);     // hash the password with 10 rounds of salt for mohamed

console.log("Hashed Password for admin:",hashadmin);          // print the hashed password for admin
console.log("Hashed Password for bassam:",hashbassam);        // print the hashed password for bassam
console.log("Hashed Password for ashraf:",hashashraf);        // print the hashed password for ashraf
console.log("Hashed Password for mohamed:",hashmohamed);      // print the hashed password for mohamed

/*============================================================================================================================================== *
 *                                                   Bugs found in the project                                                             *
 *===============================================================================================================================================*/

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

/*
    Bug found in file: "app.js"

    Bug description: the url is not correct we must to add "/" before api

    Bug effect: its lead to make API Get User Profile test in postman failed because the url is not correct

    Before solution:
    app.get('api/users/profile', async (req, res) => {

    After solution:
    app.get('/api/users/profile', async (req, res) => {

    by this solution we can get the user profile on postman
*/

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