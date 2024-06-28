import React, { useEffect, useState } from 'react';
import { getArchivedNotes } from '../services/noteService';

const ArchivedNotes = () => {
    const [archivedNotes, setArchivedNotes] = useState([]);

    useEffect(() => {
        const fetchArchivedNotes = async () => {
            const result = await getArchivedNotes();
            setArchivedNotes(result);
        };
        fetchArchivedNotes();
    }, []);

    return (
        <div>
            <h2>Archived Notes</h2>
            <ul>
                {archivedNotes.map(note => (
                    <li key={note._id}>{note.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default ArchivedNotes;