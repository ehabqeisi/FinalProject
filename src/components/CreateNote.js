import React, { useState } from 'react';
import { firestore, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './CreateNote.css'; // Import the CSS file

const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleCreateNote = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(firestore, 'notes'), {
                title,
                content,
                createdAt: serverTimestamp(),
                userId: auth.currentUser.uid,
            });
            setTitle('');
            setContent('');
            navigate('/');
        } catch (error) {
            console.error('Error creating note: ', error);
        }
    };

    return (
        <div className="create-note-container">
            <div className="create-note-form">
                <h2>Create Note</h2>
                <form onSubmit={handleCreateNote}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        required
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                        required
                    />
                    <button type="submit" className="create-note-button">Create Note</button>
                </form>
            </div>
        </div>
    );
};

export default CreateNote;
