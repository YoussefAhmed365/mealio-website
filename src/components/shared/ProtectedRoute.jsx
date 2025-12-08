import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingScreen from './LoadingScreen';

const ProtectedRoute = () => {
    const { user, isLoading, checkUserLoggedIn } = useAuth();

    useEffect(() => {
        // Only check for a user if we don't have one and we're not already loading.
        if (!user && !isLoading) {
            checkUserLoggedIn();
        }
    }, [user, isLoading, checkUserLoggedIn]);
    if (isLoading) return <LoadingScreen />;

    return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;