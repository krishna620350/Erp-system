import React, { useState, createContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    // Try to auto-login using session storage
    useEffect(() => {
        const storedUserId = sessionStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const login = (userId) => {
        setUserId(userId);
        sessionStorage.setItem("userId", userId); // Store user ID in session storage
    };

    const logout = () => {
        setUserId(null);
        sessionStorage.removeItem("userId"); // Remove user ID from session storage
    };

    return (
        <AuthContext.Provider value={{ userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
