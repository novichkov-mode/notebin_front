import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import Notes from './blocks/Notes';
import Header from "./blocks/Header";
import SearchBar from './blocks/SearchBar';
import { useNavigate } from "react-router-dom";

const Account = () => {
    const [notes, setNotes] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const isAuthenticated = () => {
        return localStorage.getItem("token");
    };

    const fetchNotes = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("/api/notes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const notes = await response.json();
                setNotes(notes);
            } else {
                console.error(`Ошибка загрузки заметок: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Ошибка при запросе заметок:", error);
        }
    };

    useEffect(() => {
        const auth = isAuthenticated();
        if (!auth || auth === "undefined") {
            navigate('/login');
        } else {
            fetchNotes();
        }
    }, [navigate]); // Добавляем navigate как зависимость

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    if (!notes) {
        return <div>Загрузка заметок...</div>;
    }

    const filteredNotes = notes.filter(
        (note) =>
            note.createAt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.noteText.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Header />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: '30%' }}>
                    <SearchBar onSearch={handleSearch} doSearch={() => {}} text="Поиск" />
                </div>
            </div>
            <Notes notes={filteredNotes} />
        </div>
    );
}

export default Account;
