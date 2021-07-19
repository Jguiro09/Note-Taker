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

const app = express();
const PORT = 8080;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/notes", (req, res) => {
    console.log(`Hitting the API/Notes Route`);
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        res.send(JSON.parse(data));
    })
})

app.post("/api/notes", (req, res) => {
    console.log(`Hitting the API/Notes Route (with post request)`);

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        let totalNotes = JSON.parse(data);
        let newNote = req.body;
        newNote.id = uuidv4();
        console.log(newNote);
        totalNotes.push(newNote);
        fs.writeFile("db/db.json", JSON.stringify(totalNotes), (err) => {
            if(err) throw err;
        })

        res.send(totalNotes);
    })
})

app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        let totalNotes = JSON.parse(data);

        totalNotes.splice(req.params.id, 1);
        console.log(req.params.id);
        fs.writeFile("db/db.json", JSON.stringify(totalNotes), (err) => {
            if(err) throw err;
        })

        res.send(totalNotes);
    })
}) 

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, () =>
{
    console.log(`Listening at ${PORT}`);
})