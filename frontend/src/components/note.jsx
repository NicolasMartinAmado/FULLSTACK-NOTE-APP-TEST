import React, { useState } from 'react';
import { archiveNote, unarchiveNote, deleteNote, addCategory, removeCategory } from '../api';

const Note = ({ note, fetchNotes, setEditingNote }) => {
    const [category, setCategory] = useState('');

    const handleArchive = async () => {
        if (note.isArchived) {
            await unarchiveNote(note._id);
        } else {
            await archiveNote(note._id);
        }
        fetchNotes();
    };

    const handleDelete = async () => {
        await deleteNote(note._id);
        fetchNotes();
    };


    const handleRemoveCategory = async (categoryToRemove) => {
        await removeCategory(note._id, categoryToRemove);
        fetchNotes();
    };

    return (
        <div className="note">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div>
                <strong>Categories: </strong>
                {note.categories.map(cat => (
                    <span key={cat} style={{ marginRight: '5px' }}>
                        {cat} <button onClick={() => handleRemoveCategory(cat)}>x</button>
                    </span>
                ))}
            </div>
            <input
                type="text"
                placeholder="Add Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <button onClick={() => setEditingNote(note)}>Edit</button>
            <button onClick={handleArchive}>{note.isArchived ? 'Unarchive' : 'Archive'}</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default Note;