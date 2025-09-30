import Navbar from '../components/shared/MainNavbar'
import Footer from '../components/shared/MainFooter'
import Field from '../components/shared/Field'
import Button from '../components/shared/Button'

const ContactPage = () => {
    return (
        <>
            <div className='relative h-96'>
                <Navbar />
                <div className='absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-amber-50 flex justify-center items-center'>
                    <h1 className='text-4xl font-bold text-gray-800'>Contact Us</h1>
                </div>
                <div className='absolute top-16 h-80 w-full'>
                    <div className="bg-svg relative">
                        <img src="" alt="" className="absolute top-0 left-0" />
                        <img src="" alt="" className="absolute top-0 left-0" />
                        <img src="" alt="" className="absolute top-0 left-0" />
                        <img src="" alt="" className="absolute top-0 left-0" />
                    </div>
                </div>
            </div>
            <main></main>
            <Footer />
        </>
    );
};

export default ContactPage;