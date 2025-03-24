// Desc: This is the main file of the server. This file will be used to start the server and listen to the port.
require('dotenv').config();
const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/Jashu', (req, res) => {
    res.send("Hi Jashwanth. This is test of server");
})

app.get('/testing', (req, res) => {
    res.send("This is testing page. Working successfully");
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${port}`)
})