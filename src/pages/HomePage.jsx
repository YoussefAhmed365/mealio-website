import Hero from '../components/home/Hero'
import AboutApp from '../components/home/AboutApp';
import HowToUse from '../components/home/HowToUse';
import FAQ from '../components/home/FAQ';
import CTA from '../components/home/CTA';
import Footer from '../components/shared/MainFooter';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (user) {
        navigate('/main/home');
    }

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