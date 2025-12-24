import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState('/profiles/default.webp');
    const [isLoading, setIsLoading] = useState(true);

    // Check for user login
    const checkUserLoggedIn = async () => {
        try {
            const res = await fetch(`${API_URL}/api/users/profile`, {
                method: 'GET',
                credentials: 'include',
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data);
                if (data.profilePhoto) {
                    setProfilePhoto(`${API_URL}${data.profilePhoto}`);
                }
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
    const register = async (firstname, lastname, email, password) => {
        try {
            const res = await fetch(`${API_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstname, lastname, email, password }),
                credentials: 'include',
            });

            const data = await res.json();

            if (res.ok) {
                setUser(data); // Login after signing up
                if (data.profilePhoto) {
                    setProfilePhoto(`${API_URL}${data.profilePhoto}`);
                }
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
        const res = await fetch(`${API_URL}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, remember }),
            credentials: 'include',
        });

        if (res.ok) {
            const data = await res.json();
            setUser(data); // Update state and store user data
            if (data.profilePhoto) {
                setProfilePhoto(`${API_URL}${data.profilePhoto}`);
            }
            return { success: true };
        } else {
            const errorData = await res.json();
            return { success: false, message: errorData.message };
        }
    };

    // Logout Handler
    const logout = async () => {
        await fetch(`${API_URL}/api/users/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });
        setUser(null);
        return { success: true };
    };

    // Update Profile
    const updateProfile = async (userData) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/users/profile`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
                credentials: 'include',
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

    // Update Profile Photo
    const updateProfilePhoto = async (formData) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/users/profile/photo`, {
                method: 'PUT',
                body: formData, // FormData automatically sets the Content-Type to multipart/form-data
                credentials: 'include',
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Update failed");

            // Update state and local storage with new info
            setProfilePhoto(`${API_URL}${data.profilePhoto}`);
            localStorage.setItem("userInfo", JSON.stringify(data));

            return { success: true, message: "Profile updated successfully" };
        } catch (error) {
            return { success: false, message: error.message };
        } finally {
            setIsLoading(false);
        }
    }

    // Complete Onboarding Handler
    const completeOnboarding = async (onboardingData) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/meal-preferences`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(onboardingData),
                credentials: 'include',
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to save onboarding data");

            setUser(data); // Update user with new preferences
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, profilePhoto, register, login, logout, isLoading, checkUserLoggedIn, updateProfile, updateProfilePhoto, completeOnboarding }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);