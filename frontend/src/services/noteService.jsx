const API_URL = `${process.env.REACT_APP_API_URL}/api/notes`;

const getToken = () => localStorage.getItem('token');

export const getNotes = async () => {
    const response = await fetch(API_URL, {
        
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return response.json();
};

export const getActiveNotes = async () => {
    const response = await fetch(`${API_URL}/active`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return response.json();
};

export const getArchivedNotes = async () => {
    const response = await fetch(`${API_URL}/archived`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return response.json();
};

export const createNote = async (note) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(note),
    });
    return response.json();
};

export const updateNote = async (id, note) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(note),
    });
    return response.json();
};

export const deleteNote = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
};