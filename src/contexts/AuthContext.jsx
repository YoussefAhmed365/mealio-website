import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for user login
    const checkUserLoggedIn = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/users/profile', {
                method: 'GET',
                credentials: 'include',
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    // Signup Handler
    const register = async (firstName, lastName, email, password) => {
        try {
            const res = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password }),
                credentials: 'include',
            });

            const data = await res.json();

            if (res.ok) {
                setUser(data); // Login after signing up
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Registration failed' };
            }
        } catch (error) {
            return { success: false, message: 'Server error, please try again later' };
        }
    };

    // Login Handler
    const login = async (email, password, remember) => {
        const res = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, remember }),
            credentials: 'include',
        });

        if (res.ok) {
            const data = await res.json();
            setUser(data); // Update state and store user data
            return { success: true };
        } else {
            const errorData = await res.json();
            return { success: false, message: errorData.message };
        }
    };

    // Logout Handler
    const logout = async () => {
        await fetch('http://localhost:5000/api/users/logout', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });
        setUser(null);
        return { success: true };
    };

    const updateProfile = async (userData) => {
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/users/profile", {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Update failed");

            // Update state and local storage with new info
            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));

            return { success: true, message: "Profile updated successfully" };
        } catch (error) {
            return { success: false, message: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, isLoading, checkUserLoggedIn, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);