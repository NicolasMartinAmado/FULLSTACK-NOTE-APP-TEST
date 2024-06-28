import React from 'react';

const NoteItem = ({ note, onEdit, onDelete, onArchive }) => {
    return (
        <li>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <p>{note.categories}</p>
            <p>Created at: {new Date(note.createdAt).toLocaleString()}</p>
            <p>Updated at: {new Date(note.updatedAt).toLocaleString()}</p>
            <button onClick={() => onEdit(note._id)}>Edit</button>
            <button onClick={() => onDelete(note._id)}>Delete</button>
            <button onClick={() => onArchive(note._id, !note.archived)}>
                {note.archived ? 'Unarchive' : 'Archive'}
            </button>
        </li>
    );
};

export default NoteItem;