//call express library
const express = require("express");
const app = express();

//call notes library
const notes = require("./route/notes.js");
app.use(notes);

//define port
const port = process.env.port || 3001;

//define the default path
const path = require("path");

//Middleware
app.use(express.static("public"));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Get route for homepage
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname + "/public/index.html"));
});

//Get route for notes page
app.get("/notes", (request, response) => {
  response.sendFile(path.join(__dirname + "/public/notes.html"));
});

//listen to port
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
