import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './blocks/Header';
import Title from './blocks/Title';
import Note from "./blocks/Note";
import Settings from "./blocks/Settings";
import Button from "./blocks/Button";
import React from "react";
import { useNavigate } from 'react-router-dom';
import {convertTimeToDuration} from "./convertTimeToDuration";


class CreateNoteClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            expirationType: 'NEVER',
            expirationPeriod: null,
        };
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    };

    handleContentChange = (event) => {
        this.setState({ content: event.target.value });
    };

    handleSettingsChange = (event) => {
        console.log(event.value, event.time);
        this.setState({ expirationType: event.value, expirationPeriod: event.time });
    };

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

    createNote = async () => {
        const { title, content, expirationType, expirationPeriod } = this.state;
        console.log(this.state);

        if (expirationType === 'BURN_BY_PERIOD' && !expirationPeriod) {
            alert('Пожалуйста, укажите время для Burn by period.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/note', {
                method: 'POST',
                headers: this.headers(),
                credentials: 'include',
                body: JSON.stringify({
                    title: title,
                    content: content,
                    expirationType: expirationType,
                    expirationPeriod: expirationType === 'BURN_BY_PERIOD' ? convertTimeToDuration(expirationPeriod) : null,
                }),
            });

            if (response.status === 200) {
                const result = await response.json();
                this.props.onNavigate(`/note/${result.url}`);
                alert('Заметка успешно создана!');
            } else {
                alert('Ошибка при создании заметки');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Не удалось создать заметку');
        }
    };

    render() {
        return (
            <div className="CreateNote">
                <Header />
                <div className="container">
                    <Title value={this.state.title} onChange={this.handleTitleChange} readOnly={false} />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 inf-container"></div>
                        <div className="col-md-6">
                            <Note value={this.state.content} onChange={this.handleContentChange} readOnly={false} />
                        </div>
                        <div className="col-md-3 inf-container">
                            <Settings deleteType="NEVER" onChange={this.handleSettingsChange} />
                            <Button text="Создать" onClick={this.createNote} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const CreateNote = () => {
    const navigate = useNavigate();
    return <CreateNoteClass onNavigate={navigate} />;
};

export default CreateNote;
