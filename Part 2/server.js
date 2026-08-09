const express = require('express');

const app = express();  // Creating a server instance

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.get("/about", (req, res) => {
    res.send("About Page");
})

app.listen(3000);   // Starting the server; 3000 is the Port Number

// req -> request => We can access the data which is coming from frontend throught 'req'.
// res -> response => We can send response to the frontend from backend through 'res'.