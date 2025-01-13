import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './blocks/Header'
import Title from './blocks/Title'
import Note from "./blocks/Note";
import Settings from "./blocks/Settings";
import Button from "./blocks/Button";
import React from "react";
import { useNavigate } from 'react-router-dom';


class CreateNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            settings: {
                deleteType: 'default',
                time: null,
            },
        };
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    };

    handleContentChange = (event) => {
        this.setState({ content: event.target.value });
    };

    handleSettingsChange = (event) => {
        this.setState({ settings: event});
    };

    createNote = async () => {
        const { title, content, settings } = this.state;
        // console.log(this.state)

        try {
            const response = await fetch('/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ title, content, settings }),
            });

            if (response.status === 201) {
                const result = await response.json();
                console.log('Заметка создана:', result);
                const navigate = useNavigate();
                navigate(`/note/${result.note.url}`);
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
                    <Title value={this.state.title} onChange={this.handleTitleChange} readOnly={false}/>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 inf-container"></div>
                        <div className="col-md-6">
                            <Note value={this.state.content} onChange={this.handleContentChange} readOnly={false}/>
                        </div>
                        <div className="col-md-3 inf-container">
                            <Settings onChange={this.handleSettingsChange} />
                            <Button text="Создать" onClick={this.createNote} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateNote;

