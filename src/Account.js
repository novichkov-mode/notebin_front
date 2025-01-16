import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import Notes from './blocks/Notes';
import Header from "./blocks/Header";
import SearchBar from './blocks/SearchBar';
import { useNavigate } from "react-router-dom";
import {formatDate} from "./formatDate";


const Account = () => {
    const [notes, setNotes] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const isAuthenticated = () => {
        return localStorage.getItem("token");
    };

    const fetchNotes = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/note/list/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                setNotes(data.page.content); // Сохраняем список заметок
                // const analytics = await fetch("http://localhost:8080/api/v1/analytics/view-notes", {
                //     method: "GET",
                //     headers: {
                //         "Content-Type": "application/json",
                //         Authorization: `Bearer ${localStorage.getItem("token")}`,
                //     },
                //     body: JSON.stringify({
                //         urls: //,
                //     }),
                // });
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
    }, [navigate]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    if (!notes) {
        return (
            <div>
                <Header />
                <div>Загрузка заметок...</div>
            </div>
        );
    }

    // Преобразование и фильтрация заметок
    const filteredNotes = notes.filter((note) => {
        const createdAt = formatDate(note.createdAt)?.toLowerCase() || ""; // Преобразуем дату в строку
        const title = note.title?.toLowerCase() || ""; // Проверяем наличие заголовка
        const content = note.content?.toLowerCase() || ""; // Проверяем наличие контента

        return (
            createdAt.includes(searchQuery.toLowerCase()) || // Поиск по дате
            title.includes(searchQuery.toLowerCase()) ||    // Поиск по заголовку
            content.includes(searchQuery.toLowerCase())     // Поиск по содержимому
        );
    });

    return (
        <div>
            <Header />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: '30%' }}>
                    <SearchBar onSearch={handleSearch} doSearch={() => { }} text="Поиск" />
                </div>
            </div>
            <Notes notes={filteredNotes} />
        </div>
    );
}

export default Account;
