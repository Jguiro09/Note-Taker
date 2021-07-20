// GIVEN a note-taking application

// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
// app.get("*", function() {___dirname, "../public/index.html"})

// WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
// app.get("/notes", function() {___dirname, "../public/notes.html"})

// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page
// BUILT IN

// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
// app.post(), fs.writefile() (MAKE FUNCTION), UUID (PACKAGE)

// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column
// app.get()? 

// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
// BUILT IN

//BONUS
// ARRAY FILTER WITH ID, REMOVE.

// Require Dependinces
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require('./db/db.json');

const app = express();
const PORT = 8080;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/notes", (req, res) => {
    console.log(`Hitting the API/Notes Route`);
    res.json(db);
})

app.post("/api/notes", (req, res) => {
    console.log(`Hitting the API/Notes Route (with post request)`);

        let newNote = req.body;
        newNote.id = uuidv4();
        db.push(newNote);
        fs.writeFileSync("./db/db.json", JSON.stringify(db), (err) => {
            if(err) throw err;
        });
        res.send(db)
})

app.delete("/api/notes/:id", (req, res) => {
        db.splice(req.params.id, 1);
        fs.writeFile("db/db.json", JSON.stringify(db), (err) => {
            if(err) throw err;
        })
        res.send(db)
})

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, () =>
{
    console.log(`Listening at ${PORT}`);
})