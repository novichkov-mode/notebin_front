import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {FaRegEye} from "react-icons/fa";
import {formatDate} from "../formatDate";
import {convertTimeToDuration} from "../convertTimeToDuration";

function truncateStringByWords(text, maxLength = 125) {
    if (text.length <= maxLength) {
        return text;
    }

    const trimmedText = text.slice(0, maxLength);
    const lastSpaceIndex = trimmedText.lastIndexOf(' ');

    if (lastSpaceIndex > 0) {
        return trimmedText.slice(0, lastSpaceIndex) + '...';
    }

    return trimmedText + '...';
}

function Notes({notes}) {
    const navigate = useNavigate();

    const handleCardClick = (note) => {
        if (!note.available) {
            alert("Эта заметка больше недоступна.");
        } else {
            navigate(`/note/${note.url}`);
        }
    };

    return (
        <div className="container my-5">
            {notes.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className="col"
                            onClick={() => handleCardClick(note)}
                            style={{cursor: 'pointer'}}
                        >
                            <div
                                className="card text-white mb-3"
                                style={{
                                    height: '210px',
                                    backgroundColor: '#808080',
                                    opacity: note.available ? 1 : 0.8
                                }}
                            >
                                <div className="card-header text-end">
                                    <div
                                        className="container"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <div>
                                            <FaRegEye/>
                                            {/* TODO вставить кол-во просмотров у заметки */}
                                            {/* {note.views} */}
                                        </div>
                                        {formatDate(note.createdAt)}
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h2 className="card-title">{note.title}</h2>
                                    <p
                                        className="card-text"
                                        style={{textAlign: 'justify'}}
                                    >
                                        {truncateStringByWords(note.content)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-info text-center" role="alert">
                    Заметок еще нет.{" "}
                    <Link to="/create" style={{textDecoration: "underline"}}>
                        Создайте новую
                    </Link>
                    , чтобы она отображалась здесь.
                </div>
            )}
        </div>
    );
}

export default Notes;
