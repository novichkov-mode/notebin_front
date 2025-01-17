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
import {convertDurationToTime} from "./convertDurationToTime";
import {convertTimeToDuration} from "./convertTimeToDuration";



class EditNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: null, // Изначально заметка пуста
            editedTitle: "",
            editedNote: "",
            editedDeleteType: "",
            editedTime: "",
            isEditing: false,
        };
    }

    componentDidMount() {
        const noteUrl = this.props.params.noteUrl;
        this.fetchNote(noteUrl); // Первый запрос при монтировании
    }

    componentDidUpdate(prevProps) {
        const prevNoteUrl = prevProps?.params?.noteUrl;
        const currentNoteUrl = this.props.params.noteUrl;

        if (prevNoteUrl !== currentNoteUrl) {
            this.fetchNote(currentNoteUrl); // Повторный запрос при изменении URL
        }
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
                console.log(note.expirationType, note.expirationPeriod)
                this.setState({
                    note: note,
                    editedTitle: note.title,
                    editedNote: note.content,
                    editedDeleteType: note.expirationType,
                    editedTime: note.expirationType === 'BURN_BY_PERIOD' ? convertDurationToTime(note.expirationPeriod) : null,
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
        console.log(this.state.editedDeleteType, this.state.editedTime);

        if (this.state.editedDeleteType === 'BURN_BY_PERIOD' && !this.state.editedTime) {
            alert('Пожалуйста, укажите время для Burn by period.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/v1/note/${this.state.note.url}`, {
                method: "PUT",
                headers: this.headers(),
                body: JSON.stringify({
                    title: this.state.editedTitle,
                    content: this.state.editedNote,
                    expirationType: this.state.editedDeleteType,
                    expirationPeriod: this.state.editedDeleteType === "BURN_BY_PERIOD" ? convertTimeToDuration(this.state.editedTime) : null,
                }),
            });

            if (response.status === 200) {
                const updatedNote = await response.json();
                this.setState({
                    note: updatedNote,
                    isEditing: false,
                });
                alert("Изменения успешно сохранены");
            } else if (response.status === 400) {
                alert('Недопустимые символы в заголовке. Используйте только английские буквы и цифры.');
                this.cancelChanges();
            }
            else if (response.status === 403) {
                alert('Недостаточно прав на редактирование заметки');
                this.cancelChanges();
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
            editedNote: this.state.note.content,
            editedDeleteType: this.state.note.expirationType || "NEVER",
            editedTime: this.state.note.expirationPeriod || "",
            isEditing: false,
        });
    };

    deleteNote = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/note/${this.state.note.url}`, {
                method: "PATCH",
                headers: this.headers(),
            });

            if (response.status === 204) {
                const navigate = useNavigate();
                alert("Заметка успешно удалена");
                navigate("/create");
            } else if (response.status === 403) {
                alert('Недостаточно прав на удаление заметки');
                this.cancelChanges();
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

    handleSettingsChange = (event) => {
        this.setState({
                editedDeleteType: event.value,
                editedTime: event.time,
            });
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
