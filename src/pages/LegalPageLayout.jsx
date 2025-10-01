// Components & Libraries
import { Link, useLocation, Outlet } from 'react-router-dom'
import Navbar from '../components/shared/MainNavbar'
import Footer from '../components/shared/MainFooter'
import AnimatedBackground from '../animations/AnimatedBackground'

// --- PAGE CONTENT COMPONENTS (Unchanged) ---

const PrivacyPolicyContent = () => (
    <>
        <h2>Last Updated: September 22, 2025</h2>
        <p>Meal.io ("us", "we", or "our") operates the meal.io website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
        <h3>1. Information Collection and Use</h3>
        <p>We collect several different types of information for various purposes to provide and improve our Service to you...</p>
        <h3>2. How We Use Your Information</h3>
        <p>Meal.io uses the collected data for various purposes: to provide and maintain the Service, to notify you about changes to our Service...</p>
        <h3>3. Data Security</h3>
        <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure...</p>
        <h3>4. Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@meal.io">support@meal.io</a>.</p>
        <h2>Last Updated: September 22, 2025</h2>
        <p>Meal.io ("us", "we", or "our") operates the meal.io website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
        <h3>1. Information Collection and Use</h3>
        <p>We collect several different types of information for various purposes to provide and improve our Service to you...</p>
        <h3>2. How We Use Your Information</h3>
        <p>Meal.io uses the collected data for various purposes: to provide and maintain the Service, to notify you about changes to our Service...</p>
        <h3>3. Data Security</h3>
        <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure...</p>
        <h3>4. Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@meal.io">support@meal.io</a>.</p>
    </>
);

const TermsOfUseContent = () => (
    <>
        <h2>Last Updated: September 22, 2025</h2>
        <p>Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the meal.io website (the "Service")...</p>
        <h3>1. Agreement to Terms</h3>
        <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>
        <h3>2. User Accounts</h3>
        <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times...</p>
    </>
);

const CookiePolicyContent = () => (
    <>
        <h2>Last Updated: September 22, 2025</h2>
        <p>This Cookie Policy explains what cookies are and how we use them. You should read this policy to understand what cookies are, how we use them...</p>
        <h3>What Are Cookies?</h3>
        <p>Cookies are small text files that are used to store small pieces of information. They are stored on your device when the website is loaded on your browser...</p>
    </>
);

const DataProtectionContent = () => (
    <>
        <h2>Last Updated: September 22, 2025</h2>
        <p>We are committed to protecting your data and privacy. This section outlines our approach to data protection and compliance with data protection regulations such as the GDPR.</p>
        <h3>Our Commitment</h3>
        <p>We will process your data securely, fairly, and lawfully. We have implemented appropriate technical and organizational measures to protect your personal data...</p>
    </>
);

const UserRightsContent = () => (
    <>
        <h2>Last Updated: September 22, 2025</h2>
        <p>You have certain rights regarding your personal data. This page describes your rights and explains how you can exercise them.</p>
        <h3>Your Rights</h3>
        <ul>
            <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
        </ul>
    </>
);

// --- ROUTING CONFIGURATION ---
export const legalNavItems = [
    { id: 'privacy', path: '/legal/privacy', label: 'Privacy Policy', title: 'Privacy Policy', component: <PrivacyPolicyContent /> },
    { id: 'terms', path: '/legal/terms', label: 'Terms of Service', title: 'Terms of Service', component: <TermsOfUseContent /> },
    { id: 'cookies', path: '/legal/cookies', label: 'Cookie Policy', title: 'Cookie Policy', component: <CookiePolicyContent /> },
    { id: 'protection', path: '/legal/data-protection', label: 'Data Protection', title: 'Data Protection', component: <DataProtectionContent /> },
    { id: 'rights', path: '/legal/user-rights', label: 'User Rights', title: 'Your Rights', component: <UserRightsContent /> },
];

// --- REUSABLE COMPONENTS ---
const SideNavigation = () => {
    const location = useLocation();
    return (
        <nav className="sticky top-24 flex flex-col w-full md:w-56 divide-y divide-gray-200">
            {legalNavItems.map(item => (
                <Link
                    key={item.id}
                    to={item.path}
                    className={`w-full px-5 py-5 rounded-lg font-semibold text-md text-start cursor-pointer transition-colors ${location.pathname === item.path
                        ? 'bg-amber-500/15 text-amber-800 hover:bg-amber-500/20'
                        : 'bg-white text-gray-800 hover:bg-gray-200'
                        }`}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
};

// --- LAYOUT COMPONENT ---
const LegalPageLayout = () => {
    const location = useLocation();
    const currentPage = legalNavItems.find(item => item.path === location.pathname) || legalNavItems[0];
    return (
        <div className="relative min-h-screen">
            <AnimatedBackground />
            <header className='relative h-64 md:h-80'>
                <div className="absolute w-full top-0 left-0 z-20"><Navbar /></div>
                <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
                    <h1 className='text-4xl md:text-5xl font-bold text-gray-800 text-center px-4'>{currentPage.title}</h1>
                </div>
            </header>
            <div className="container mx-auto flex flex-col md:flex-row justify-start gap-4 md:gap-28 w-full py-12 px-30">
                <aside className="min-h-full">
                    <SideNavigation />
                </aside>
                <main className="max-w-none w-full">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default LegalPageLayout;