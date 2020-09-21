const express = require('express');
const xss = require('xss');
const NotesService = require('./notes-service');

const notesRouter = express.Router();
const bodyParser = express.json();

const serializeNote = (note) => ({
  id: toString(note.id),
  name: xss(note.note_name),
  content: xss(note.content),
  folder_id: note.folder_id,
  modified: note.modified,
});

notesRouter
  .route('/notes')
  .get((req, res) => {
    NotesService.getAllNotes(req.app.get('db'))
      .then((notes) => res.json(notes.map(serializeNote)));
  })
  .post(bodyParser, (req, res, next) => {
    const { name, content, folderId } = req.body;
    if (!name) return res.status(400).send('Invalid data: missing name');
    if (!folderId) return res.status(400).send('Invalid data: missing folder id');
    const newNote = {
      note_name: name,
      folder_id: Number(folderId),
      content,
    };
    NotesService.insertNote(req.app.get('db'), newNote)
      .then((note) => res.status(201).json(serializeNote(note)))
      .catch(next);
  });

module.exports = notesRouter;
