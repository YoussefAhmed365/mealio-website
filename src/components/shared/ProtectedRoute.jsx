import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingScreen from './LoadingScreen';

const ProtectedRoute = () => {
    const { user, isLoading } = useAuth();
    if (isLoading) return <LoadingScreen />;

    return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;