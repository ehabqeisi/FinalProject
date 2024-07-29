import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import Note from './Note';
import { Link, useNavigate } from 'react-router-dom';
import Logout from './Logout'; // Import the Logout component

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const q = query(collection(firestore, 'notes'), orderBy('createdAt', 'desc'));
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const notesData = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setNotes(notesData);
                });
                return () => unsubscribe();
            } else {
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    return (
        <div className="container">
            <h2>Notes</h2>
            <Link to="/create"><button>Create Note</button></Link>
            {notes.map((note) => (
                <Note key={note.id} note={note} />
            ))}
            <Logout /> {/* Add the Logout button here */}
        </div>
    );
};

export default NoteList;
