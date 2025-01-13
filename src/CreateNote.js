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
        //todo
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
        this.setState({ expirationType: event.value, expirationPeriod: event.time});
    };

    createNote = async () => {
        const { title, content, expirationType, expirationPeriod } = this.state;
        console.log(this.state)

        try {
            const response = await fetch('http://localhost:8080/api/v1/note', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                credentials: 'include',
                body: JSON.stringify({ title, content, expirationType, expirationPeriod  }),
            });

            if (response.status === 201) {
                const result = await response.json();
                const jsonObject = JSON.parse(result);
                console.log('Заметка создана:', result);

                const navigate = useNavigate();
                navigate(`/note/${jsonObject.url}`);
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

