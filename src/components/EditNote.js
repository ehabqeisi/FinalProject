import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const EditNote = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const noteDoc = await getDoc(doc(firestore, 'notes', id));
                if (noteDoc.exists()) {
                    const noteData = noteDoc.data();
                    setTitle(noteData.title);
                    setContent(noteData.content);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching note: ', error);
            }
        };

        fetchNote();
    }, [id]);

    const handleUpdateNote = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(firestore, 'notes', id), {
                title,
                content,
            });
            navigate('/');
        } catch (error) {
            console.error('Error updating note: ', error);
        }
    };

    const handleDeleteNote = async () => {
        try {
            await deleteDoc(doc(firestore, 'notes', id));
            navigate('/');
        } catch (error) {
            console.error('Error deleting note: ', error);
        }
    };

    return (
        <div className="container">
            <h2>Edit Note</h2>
            <form onSubmit={handleUpdateNote}>
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
                <button type="submit">Update Note</button>
            </form>
            <button onClick={handleDeleteNote} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}>
                Delete Note
            </button>
        </div>
    );
};

export default EditNote;
