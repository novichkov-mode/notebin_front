import React from "react";
import {useNavigate, useParams} from "react-router-dom";

import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./blocks/Header";
import Title from "./blocks/Title";
import Note from "./blocks/Note";
import Settings from "./blocks/Settings";
import Button from "./blocks/Button";
import NotFound from "./blocks/NotFound";


class EditNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: null, // Изначально заметка пуста
            editedTitle: "",
            editedNote: "",
            editedDeleteType: "",
            editedTime: "",
            canEdit: false,
            isEditing: false,
        };
    }

    componentDidMount() {
        const noteUrl = this.props.params.noteUrl;
        this.fetchNote(noteUrl);
    }

    headers = () => {
        const head = {
            'Content-Type': 'application/json',
        };
        const token = localStorage.getItem("token");
        if (token) {
            head.Authorization = `Bearer ${token}`;
        }
        return head;
    };

    fetchNote = async (url) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/note/${url}`, {
                method: "GET",
                headers: this.headers(),
                credentials: 'include',
            });

            if (response.status === 200) {
                const note = await response.json();
                this.setState({
                    note: note,
                    editedTitle: note.title,
                    editedNote: note.content,
                    editedDeleteType: note.expirationType || "default",
                    editedTime: note.expirationPeriod || "",
                });
            } else {
                this.setState({
                    note: null,
                    canEdit: false,
                });
            }
        } catch (error) {
            console.error(error);
            this.setState({
                note: null,
                canEdit: false,
            });
        }
    };

    // Начало редактирования
    startEditing = () => {
        this.setState({
            isEditing: true,
        });
    };

    // Сохранение изменений
    saveChanges = async () => {
        const {note, editedTitle, editedNote, editedDeleteType, editedTime} = this.state;

        try {
            const response = await fetch(`/api/notes/${note.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...note, // Передаём существующие поля заметки
                    title: editedTitle,
                    noteText: editedNote,
                    settings: {
                        deleteType: editedDeleteType,
                        time: editedDeleteType === "afterTime" ? editedTime : null,
                    },
                }),
            });

            if (response.status === 200) {
                const updatedNote = await response.json();
                this.setState({
                    note: updatedNote,
                    isEditing: false,
                });
                alert("Изменения успешно сохранены");
            } else {
                const errorData = await response.json();
                alert(`Ошибка при сохранении изменений: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Ошибка при сохранении изменений:", error);
            alert("Произошла ошибка при сохранении изменений");
        }
    };

    // Отмена изменений
    cancelChanges = () => {
        this.setState({
            editedTitle: this.state.note.title,
            editedNote: this.state.note.noteText,
            editedDeleteType: this.state.note.settings.deleteType || "default",
            editedTime: this.state.note.settings.time || "",
            isEditing: false,
        });
    };

    deleteNote = async () => {
        const {note} = this.state;

        try {
            const response = await fetch(`/api/notes/${note.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                const navigate = useNavigate();
                alert("Заметка успешно удалена");
                navigate("/create");
            } else {
                const errorData = await response.json();
                alert(`Ошибка при удалении заметки: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при удалении заметки");
        }
    };

    handleTitleChange = (event) => {
        this.setState({editedTitle: event.target.value});
    };

    handleNoteChange = (event) => {
        this.setState({editedNote: event.target.value});
    };

    handleSettingsChange = (field, value) => {
        this.setState({[field]: value});
    };

    render() {
        const {note, editedTitle, editedNote, editedDeleteType, editedTime, isEditing} = this.state;

        return (
            <div>
                <Header/>
                {note === null ? (
                    <NotFound/>
                ) : (
                    <div className="container">
                        <Title
                            value={isEditing ? editedTitle : note.title}
                            onChange={this.handleTitleChange}
                            readOnly={!isEditing}
                        />
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3 inf-container"></div>
                                <div className="col-md-6">
                                    <Note
                                        value={isEditing ? editedNote : note.content}
                                        onChange={this.handleNoteChange}
                                        readOnly={!isEditing}
                                    />
                                </div>
                                <div className="col-md-3 inf-container">
                                    {!isEditing ? (
                                        <div
                                            id="editDelete"
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Button text="Редактировать" onClick={this.startEditing}/>
                                            <Button text="Удалить" onClick={this.deleteNote}/>
                                        </div>
                                    ) : (
                                        <div
                                            id="saveCancel"
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Settings
                                                deleteType={editedDeleteType}
                                                time={editedTime}
                                                onChange={this.handleSettingsChange}
                                            />
                                            <Button text="Сохранить" onClick={this.saveChanges}/>
                                            <Button text="Отмена" onClick={this.cancelChanges}/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

// Обёртка для передачи useParams в классовый компонент
const WithParams = (props) => {
    const params = useParams();
    return <EditNote {...props} params={params}/>;
};

export default WithParams;
