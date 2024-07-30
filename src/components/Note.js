import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css'; // Import the CSS file

const Note = ({ note }) => {
    return (
        <div className="note-card">
            <div className="note-content">
                <h3>{note.title}</h3>
                <p>{note.content}</p>
            </div>
            <div className="note-actions">
                <Link to={`/edit/${note.id}`}>
                    <button className="note-button edit-button">Edit</button>
                </Link>
                <Link to={`/history/${note.id}`}>
                    <button className="note-button history-button">View History</button>
                </Link>
            </div>
        </div>
    );
};

export default Note;
