import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NoteList from './components/NoteList';
import CreateNote from './components/CreateNote';
import EditNote from './components/EditNote';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<NoteList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/create" element={<CreateNote />} />
                    <Route path="/edit/:id" element={<EditNote />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
