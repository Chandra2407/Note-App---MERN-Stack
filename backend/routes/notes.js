const express = require('express');
const asyncHandler = require("express-async-handler");
const Note = require('../models/NotesModel')
const {
    body,
    validationResult
} = require('express-validator');
const getUser = require('../middleware/getuser');

const notesRouter = express.Router();

//get all notes
notesRouter.get('/getnotes', getUser, asyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user._id })
    res.json(notes)
})
)

//create a new note
notesRouter.post('/addnote', [
    body('title', 'enter a valid title').isLength({ min: 5 }),
    body('description', 'enter a valid description').isLength({ min: 5 }),
], getUser, asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { title, description, tag } = req.body;
    const note = new Note({
        user: req.user._id,
        title,
        description,
        tag
    })
    const createdNote = await note.save();
    if (!createdNote) {
        res.status(404).send({
            message: 'Note not found'
        });
    } else {
        res.send({
            createdNote
        })
    }
})
)

//UPDATE AN EXISTING NOTE
notesRouter.put('/updatenote/:id', [
    body('title', 'enter a valid title').isLength({ min: 5 }),
    body('description', 'enter a valid description').isLength({ min: 5 }),
], getUser, asyncHandler(async (req, res) => {
    const { title, description, tag } = req.body;
    const note = await Note.findById(req.params.id);

    if (!note) {
        res.status(404).send({ message: 'Note not found' })
    }
    if (note.user.toString() === req.user._id) {
        note.title = title || note.title;
        note.description = description || note.description;
        note.tag = tag || note.tag;
        note.date = Date.now();
        const updatedNote = await note.save()
        res.json(updatedNote);
    }
    else {
        res.status(404).send({ message: 'Not Allowed' })
    }

})
)

//DELETE NOTES
notesRouter.delete('/deletenote/:id', getUser, asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        res.status(404).send({ message: 'Note not found' })
    }
    if (!note.user.toString() === req.user._id) {
        res.status(404).send({ message: 'Not Allowed' })
    }

    await Note.deleteOne(note)
    res.json({ message: 'delete successful' })
})
)


module.exports = notesRouter