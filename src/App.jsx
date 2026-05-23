// Libraries
import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Navbar from './components/shared/Navbar';
import LoadingScreen from './components/shared/LoadingScreen';

// pages
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const RestoreAccountPage = lazy(() => import('./pages/RestoreAccountPage'));
const OTPPasswordResetPage = lazy(() => import('./pages/OTPPasswordResetPage'));
const OnboardingFlow = lazy(() => import('./pages/OnboardingPage'));
import { OnboardingProvider } from './contexts/OnboradingContext';
import { NotificationProvider } from './contexts/NotificationContext';
const Dashboard = lazy(() => import('./pages/DashboardPage'));
const GenerativeAI = lazy(() => import('./pages/GenerativeAI'));
const Plans = lazy(() => import('./pages/PlansPage'));
const Recipes = lazy(() => import('./pages/RecipesPage'));
const Shopping = lazy(() => import('./pages/ShoppingPage'));
const Discover = lazy(() => import('./pages/DiscoverPage'));
const MealDetail = lazy(() => import('./pages/MealDetailPage'));
const Analysis = lazy(() => import('./pages/AnalysisPage'));
const Settings = lazy(() => import('./pages/SettingsPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
import LegalPageLayout, { legalNavItems } from './pages/LegalPageLayout';

function App() {
    return (
        <AuthProvider>
            <OnboardingProvider>
                <NotificationProvider>
                    <Suspense fallback={<LoadingScreen />}>
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/login' element={<LoginPage />} />
                            <Route path='/signup' element={<SignupPage />} />
                            <Route path='/restore-account' element={<RestoreAccountPage />} />
                            <Route path='/reset-password' element={<OTPPasswordResetPage />} />
                            <Route path='/faq' element={<FaqPage />} />
                            <Route path='/contact' element={<ContactPage />} />
                            <Route path="/legal" element={<LegalPageLayout />}>
                                <Route index element={<Navigate to="/legal/privacy" replace />} />
                                {legalNavItems.map(item => (
                                    <Route key={item.id} path={item.path.replace('/legal/', '')} element={item.component} />
                                ))}
                            </Route>

                            {/* Protected Routes */}
                            <Route element={<ProtectedRoute />}>
                                <Route path='/get-started' element={<OnboardingFlow />} />
                                <Route path="/main" element={<Navbar />}>
                                    <Route path='home' element={<Dashboard />} />
                                    <Route path='generate-meal-ai' element={<GenerativeAI />} />
                                    <Route path='plans' element={<Plans />} />
                                    <Route path='recipes' element={<Recipes />} />
                                    <Route path='shopping-list' element={<Shopping />} />
                                    <Route path='discover' element={<Discover />} />
                                    <Route path='meal/:id' element={<MealDetail />} />
                                    <Route path='analysis' element={<Analysis />} />
                                    <Route path='settings' element={<Settings />} />
                                </Route>
                            </Route>
                        </Routes>
                    </Suspense>
                </NotificationProvider>
            </OnboardingProvider>
        </AuthProvider>
    );
};

export default App