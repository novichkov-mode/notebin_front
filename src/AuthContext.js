import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Проверяем наличие токена в localStorage
        const token = localStorage.getItem("token");
        if (token) {
            // Например, можно проверить валидность токена или загрузить данные пользователя
            setIsAuthenticated(true);
            // Загрузите пользователя или данные профиля, если это необходимо
            setUser({ name: "John Doe" }); // Пример
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
