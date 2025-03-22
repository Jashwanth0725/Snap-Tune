const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/Jashu', (req, res) => {
    res.send("Hi Jashwanth. This is test of server");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




// const express = require('express');
// const app = express();

// const port = 300;

// app.get('/',(req, res)=>{
//     res.send("Hellow");
// })

// app.listen(port, ()=.{
//     console.log("Port : " +port);
// })