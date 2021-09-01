//imports

// nodemon package is addition to express that helps starts and saves every time file is changed
const express = require("express");
const index = express();  //variable name 
const port = 3000;      // port to listen in on

// listen on port 300          console - display msg 
index.listen(port, () => console.info('Listening on port ${port}'))


// static files - allow easy acces to public folder
index.use(express.static('public'))  // use express; pass variable which is the folder


// when user goes to route of application..
//app.get("/", (req, res) => res.send("Hello World"));
//enter post into postman
//app.post("/", (req, res) => res.send("Hello from post method"));

//app.use(express.static("public"));

//app.listen(port, () => {
//    console.log("Server is at http://localhost:3000");
//})