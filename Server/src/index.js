require('dotenv').config({ path: "../.env" });
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/Jashu', (req, res) => {
    res.send("Hi Jashwanth. This is test of server");
})

app.get('/testing', (req, res) => {
    res.send("This is testing page. Working successfully, Just checking if the nodemon is running properl");
})

app.get('/jokes', (req, res) => {
    const jokes = [
        { "joke": "Why did the chicken cross the road?" },
        { "joke": "Knock, knock. Who’s there?" }
    ];
    res.json(jokes);
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
    console.log("Server is running on port : https://localhost:" + PORT);
})