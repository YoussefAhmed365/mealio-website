import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Hero from '../components/home/Hero'
import AboutApp from '../components/home/AboutApp';
import HowToUse from '../components/home/HowToUse';
import FAQ from '../components/home/FAQ';
import CTA from '../components/home/CTA';
import Footer from '../components/shared/MainFooter';

const HomePage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/main/home');
        }
    }, [user, navigate])

    return (
        <>
            <Hero />
            <AboutApp />
            <HowToUse />
            <FAQ />
            <CTA />
            <Footer />
        </>
    );
};

export default HomePage;