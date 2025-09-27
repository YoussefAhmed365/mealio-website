import Hero from '../components/home/Hero'
import AboutApp from '../components/home/AboutApp'
import HowToUse from '../components/home/HowToUse'
import FAQ from '../components/home/FAQ'
import CTA from '../components/home/CTA'
import Footer from '../components/shared/MainFooter'

const HomePage = () => {
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