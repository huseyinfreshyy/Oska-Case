var express = require('express');
var app = express();
const port = 5000;
app.get('/', function (req, res) {
    res.send("Hello World!");
});

app.listen(port, ()=>{
    console.log(`Application running on port: ${port}`)
});