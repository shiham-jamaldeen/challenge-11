const express = require("express");
const notesRouter = express.Router();
//call the alert library
let alert = require("alert");

//call the uuid library, to generate uuid
const { v4: uuidv4 } = require("uuid");

//call the file system (fs) library
const fs = require("fs");

//use middleware body parser
notesRouter.use(express.json());

//global variables
let noteArray = [];

//read existing items from db.json when loading the notes page
notesRouter.get("/api/notes", (request, response) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      response.send(err);
      return;
    } else {
      response.json(JSON.parse(data));
    }
  });
});

//write new items to db.json
notesRouter.post("/api/notes", (request, response) => {
  if (request.body !== null) {
    //assign uuid as the note id
    request.body.id = uuidv4();
    //convert string to JSON string
    let newNote = request.body;
    //push the new note to an array
    noteArray.push(newNote);
  }
  //convert array to JSON object and write to external db.json file
  fs.writeFile("./db/db.json", JSON.stringify(noteArray, null, 2), (err) =>
    err ? alert(err) : alert("Success! Your note was saved")
  );
});

module.exports = notesRouter;
