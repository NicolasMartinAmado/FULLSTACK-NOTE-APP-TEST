const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');

router.get('/', noteController.getAllNotes);
router.get('/active', noteController.getActiveNotes);
router.get('/archived', noteController.getArchivedNotes);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);


module.exports = router;