import dbconnect from './db/index.js';   //Importing database connectioning function
import dotenv from 'dotenv';            // Importing dotenv to use environment variables
dotenv.config({ path: '../.env' });
import express from 'express';           // Importing express to create server
const app = express()

const PORT = process.env.PORT || 5000  // Port number for the server

app.get('/Jashu', (req, res) => {
    res.send("Hi Jashwanth. This is test of server");
})

dbconnect();

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
    console.log("Server is running on port : https://localhost:" + PORT);
})