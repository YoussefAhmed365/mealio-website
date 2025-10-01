import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Import page components
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import OTPReset from './components/resetPassword/OTPReset'
import OnboardingFlow from './pages/OnboardingPage'
import { OnboardingProvider } from './contexts/OnboradingContext'
import Dashboard from './pages/DashboardPage'
import Plans from './pages/PlansPage'
import Recipes from './pages/RecipesPage'
import Shopping from './pages/ShoppingPage'
import Discover from './pages/DiscoverPage'
import MealDetail from './pages/MealDetailPage'
import Analysis from './pages/AnalysisPage'
import Settings from './pages/SettingsPage'
import FaqPage from './pages/FaqPage'
import ContactPage from './pages/ContactPage'
import LegalPageLayout, { legalNavItems } from './pages/LegalPageLayout'

function App() {
    return (
        <>
            <OnboardingProvider>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signup' element={<SignupPage />} />
                    <Route path='/restore-account' element={<ResetPasswordPage />} />
                    <Route path='/reset-password' element={<OTPReset />} />
                    <Route path='/onboarding' element={<OnboardingFlow />} />
                    <Route path='/main/home' element={<Dashboard />} />
                    <Route path='/main/plans' element={<Plans />} />
                    <Route path='/main/recipes' element={<Recipes />} />
                    <Route path='/main/shopping-list' element={<Shopping />} />
                    <Route path='/main/discover' element={<Discover />} />
                    <Route path='/main/meal/:id' element={<MealDetail />} />
                    <Route path='/main/analysis' element={<Analysis />} />
                    <Route path='/main/settings' element={<Settings />} />
                    <Route path='/faq' element={<FaqPage />} />
                    <Route path='/contact' element={<ContactPage />} />

                    <Route path="/legal" element={<LegalPageLayout />}>
                        <Route index element={<Navigate to="/legal/privacy" replace />} />
                        {legalNavItems.map(item => (
                            <Route key={item.id} path={item.path.replace('/legal/', '')} element={item.component} />
                        ))}
                    </Route>
                </Routes>
            </OnboardingProvider>
        </>
    );
};

export default App