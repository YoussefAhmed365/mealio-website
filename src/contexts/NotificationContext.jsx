import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuth();

    // Get notifications
    const getNotifications = async () => {
        if (!user || !user.email) {
            setNotifications([]);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/notifications/get?email=${user.email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error("Failed to get your notifications.\nTry again later.");
            }

            const data = await response.json();
            if (Array.isArray(data)) {
                setNotifications(data);
            } else {
                console.warn("Notifications data is not an array:", data);
                setNotifications([]);
            }
        } catch (error) {
            console.error(error);
            setNotifications([]);
        }
    };

    useEffect(() => {
        getNotifications();
    }, [user]);

    return (
        <NotificationContext.Provider value={{ notifications, getNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
