import React, { useState, useEffect } from 'react';
import { createNote, updateNote } from '../services/noteService';


const NoteForm = ({ fetchNotes, editingNote, setEditingNote }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState('');

    useEffect(() => {
        if (editingNote) {
            setTitle(editingNote.title);
            setContent(editingNote.content);
            setCategories(editingNote.categories.join(', '));
        }
    }, [editingNote]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const categoriesArray = categories.split(',').map(cat => cat.trim());
            if (editingNote) {
                await updateNote(editingNote._id, { title, content, categories: categoriesArray });
                setEditingNote(null);
            } else {
                await createNote({ title, content, categories: categoriesArray });
            }
          
        }
       catch(err){
        console.log(err + "ERRORR")
       }
       setTitle('');
       setContent('');
       setCategories('');
       if (typeof fetchNotes === 'function') {
        fetchNotes();
    } else {
        console.error("fetchNotes no es una función");
    }
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>
            <input
                type="text"
                placeholder="Categories"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                required
            />
            <button type="submit">{editingNote ? 'Update Note' : 'Save Note'}</button>
        </form>
    );
};

export default NoteForm;