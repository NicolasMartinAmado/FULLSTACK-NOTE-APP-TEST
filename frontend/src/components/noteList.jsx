import React, { useState, useEffect } from 'react';
import { createNote, updateNote, deleteNote, getActiveNotes, getArchivedNotes } from '../services/noteService';
import NoteItem from './noteItem';
import Modal from './Modal';
import NoteForm from './Noteform';
import './notelist.css';

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [view, setView] = useState('active');

    useEffect(() => {
        fetchNotes();
    }, [view]);

    const fetchNotes = async () => {
        let result;
        if (view === 'active') {
            result = await getActiveNotes();
        } else {
            result = await getArchivedNotes();
        }
        setNotes(result);
    };

    const handleAddNote = async (note) => {
        const savedNote = await createNote(note);
        setNotes([...notes, savedNote]);
    };

    const handleEditNote = (note) => {
        setCurrentNote(note);
        setIsModalOpen(true);
    };

    const handleUpdateNote = async (note) => {
        const updatedNote = await updateNote(currentNote._id, note);
        setNotes(notes.map(n => (n._id === currentNote._id ? updatedNote : n)));
        setIsModalOpen(false);
        setCurrentNote(null);
        fetchNotes();
    };

    const handleDeleteNote = async (id) => {
        await deleteNote(id);
        setNotes(notes.filter(note => note._id !== id));
    };

    const handleArchiveNote = async (id, archived) => {
        const note = notes.find(note => note._id === id);
        const updatedNote = { ...note, archived };
        const result = await updateNote(id, updatedNote);
        setNotes(notes.map(n => (n._id === id ? result : n)));
    };

    return (
        <div id='notelist'>
            <h1>Note List</h1>
            <div>
                <button onClick={() => setView('active')}>Active Notes</button>
                <button onClick={() => setView('archived')}>Archived Notes</button>
            </div>
            <NoteForm onSave={handleAddNote} fetchNotes={fetchNotes} />
            <ul>
                {notes.map(note => (
                    <NoteItem
                        key={note._id}
                        note={note}
                        onEdit={() => handleEditNote(note)}
                        onDelete={handleDeleteNote}
                        onArchive={handleArchiveNote}
                    />
                ))}
            </ul>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <NoteForm fetchNotes={handleUpdateNote} editingNote={currentNote} setEditingNote={setCurrentNote}  />
            </Modal>
        </div>
    );
};

export default NoteList;