const express = require("express");
const notesRouter = express.Router();
//call the alert library
const alert = require("alert");

//call the uuid library, to generate uuid
const { v4: uuidv4 } = require("uuid");

//call the file system (fs) library
const fs = require("fs");
const { join } = require("path");

//use middleware body parser
notesRouter.use(express.json());

//global variables
let newNoteArray = [];

//read existing items from db.json when loading the notes page
notesRouter.get("/api/notes", (request, response) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      alert(err);
      return;
    } else {
      //pass note to the front end
      response.send(JSON.parse(data));
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
    newNoteArray.push(newNote);
  }
  //write to external db
  //SEE LINE 48 in ACTIVITY 20-STU_Data-Persistence
  fs.writeFile(
    "./db/db.json",
    JSON.stringify(newNoteArray, null, 2),
    { flag: "w+" },
    (err) => (err ? alert(err) : response.json(newNoteArray))
  );
});
//overwriting the file
//

notesRouter.delete("/api/notes/:id", (request, response) => {
  let deletedNoteId = request.params.id;

  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      alert(err);
      return;
    } else {
      //read contents from file and parse to array
      const readFromFileArray = JSON.parse(data);
      for (i in readFromFileArray) {
        if (deletedNoteId === readFromFileArray[i].id) {
          //get the index of element
          let index = readFromFileArray[i];
          //delete element from the position
          readFromFileArray.splice(index, 1);
        }
      }
      //write the updated array to a new file
      fs.writeFile(
        "./db/db.json",
        JSON.stringify(readFromFileArray, null, 2),
        (err) => (err ? alert(err) : response.json(readFromFileArray))
      );
    }
  });
});
module.exports = notesRouter;

// getNotes() {
//   return this.read().then((notes) => {
//     let parsedNotes;

//     // If notes isn't an array or can't be turned into one, send back a new empty array
//     try {
//       parsedNotes = [].concat(JSON.parse(notes));
//     } catch (err) {
//       parsedNotes = [];
//     }

//     return parsedNotes;
//   });
// }
