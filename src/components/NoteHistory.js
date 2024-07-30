import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, orderBy, doc } from 'firebase/firestore';

const NoteHistory = () => {
    const { noteId } = useParams();
    const [versions, setVersions] = useState([]);

    useEffect(() => {
        const fetchVersions = async () => {
            try {
                console.log("Fetching versions for noteId:", noteId);
                const noteRef = doc(firestore, 'notes', noteId);
                const versionsCollection = collection(noteRef, 'versions');
                const q = query(versionsCollection, orderBy('timestamp', 'desc'));
                const querySnapshot = await getDocs(q);
                const versionsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log("Versions data fetched:", versionsData);
                setVersions(versionsData);
            } catch (error) {
                console.error("Error fetching versions: ", error);
            }
        };

        fetchVersions();
    }, [noteId]);

    return (
        <div className="container">
            <h2>Note History</h2>
            {versions.length > 0 ? (
                <ul>
                    {versions.map(version => (
                        <li key={version.id}>
                            <h3>{version.title}</h3>
                            <p>{version.content}</p>
                            <p>{new Date(version.timestamp.toDate()).toString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No version history available.</p>
            )}
        </div>
    );
};

export default NoteHistory;
