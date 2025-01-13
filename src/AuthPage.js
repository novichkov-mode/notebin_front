import {Link, useNavigate} from "react-router-dom";
import React, { useState, useContext } from "react";
import "./css/AuthPage.css";
import { AuthContext } from "./AuthContext";

const AuthPage = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleMode = () => {
        setIsLoginMode((prevMode) => !prevMode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Подготовка данных для отправки
        const payload = {
            username,
            password,
        };

        try {
            if (isLoginMode) {
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    const data = await response.json();
                    login(data.token);
                    navigate('/create')
                } else {
                    alert("Ошибка входа: проверьте логин и пароль.");
                }
            } else {
                // Логика регистрации
                const response = await fetch("/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    alert("Регистрация успешна! Теперь войдите.");
                    setIsLoginMode(true);
                } else {
                    alert("Ошибка регистрации: попробуйте ещё раз.");
                }
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка. Попробуйте ещё раз.");
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     login();
    //     navigate('/create');
    // };

    return (
        <div className="auth-page">
            <div className="header-container" style={{justifyContent: 'center'}}>
                <Link to="/create" className="logo">
                    NoteBin
                </Link>
            </div>
            <div className="auth-container">
                <div className="auth-box">
                    <h2>{isLoginMode ? "Вход" : "Регистрация"}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Логин:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Введите логин"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Введите пароль"
                                required
                            />
                        </div>
                        <button type="submit" className="auth-button">
                            {isLoginMode ? "Войти" : "Зарегистрироваться"}
                        </button>
                    </form>
                    <p className="switch-mode">
                        {isLoginMode
                            ? "Еще нет аккаунта? "
                            : "Уже есть аккаунт? "}
                        <span onClick={toggleMode}>
                            {isLoginMode ? "Создать аккаунт" : "Войти"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;




