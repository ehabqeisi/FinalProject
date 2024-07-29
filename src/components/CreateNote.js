import React, { useState } from 'react';
import { firestore, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
        <div className="container">
            <h2>Create Note</h2>
            <form onSubmit={handleCreateNote}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                />
                <button type="submit">Create Note</button>
            </form>
        </div>
    );
};

export default CreateNote;
