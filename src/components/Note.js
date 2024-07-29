import React from 'react';
import { Link } from 'react-router-dom';

const Note = ({ note }) => {
    return (
        <div className="note">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <Link to={`/edit/${note.id}`}><button>Edit</button></Link>
        </div>
    );
};

export default Note;
