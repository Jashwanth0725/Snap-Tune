import dbconnect from './db/index.js';   //Importing database connectioning function
import dotenv from 'dotenv';            // Importing dotenv to use environment variables
import favicon from 'serve-favicon'; // Importing favicon to serve favicon files
import express from 'express';           // Importing express
dotenv.config({ path: '../.env' });
import app from './app.js';           // Importing the app configuration

const PORT = process.env.PORT || 5000  // Port number for the server

// These routes are now defined in app.js
app.get('/', (req, res) => {
    res.send('Welcome! Your server is working.');
});

// app.get('/Jashu', (req, res) => {
//     res.send("Hi Jashwanth. This is test of server");
// })

// app.get('/testing', (req, res) => {
//     res.send("This is test of server");
// })

app.use(favicon('public/favicon.ico')); // Serving favicon files from the public directory
app.use(express.static('public')); // Serving static files from the public directory

dbconnect();

app.listen(PORT, () => {
    // console.log(`Example app listening on port ${PORT}`)
    console.log("Server is running on port : http://localhost:" + PORT);
})