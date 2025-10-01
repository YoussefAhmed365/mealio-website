import Navbar from '../components/shared/MainNavbar'
import Footer from '../components/shared/MainFooter'
import Field from '../components/shared/Field'
import AnimatedBackground from '../animations/AnimatedBackground'

// Icons
import { EnvelopeIcon, PhoneIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid'

const ContactPage = () => {
    return (
        <div className='relative'>
            <AnimatedBackground />

            <div className='relative h-96 mb-20'>
                <Navbar />
                <div className='absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-full h-96 flex justify-center items-center'>
                    <h1 className='text-4xl font-bold text-gray-800'>Contact Us</h1>
                </div>
            </div>

            <main className='grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-8 md:px-40'>
                <div className="col-span-1">
                    <h5 className='text-md font-medium text-gray-600 mb-2'>WE'RE HERE FOR YOU</h5>
                    <h1 className='text-6xl text-gray-900 mb-8'><b>Discuss</b> Your Questions With Us</h1>
                    <h6 className='text-gray-600 mb-10'>Fill out the form below and we'll get back to you as soon as possible.</h6>
                    <div className="flex justify-start items-center gap-5 mb-6">
                        <EnvelopeIcon className='size-8 text-amber-600' />
                        <div>
                            <h5 className="text-md text-gray-600">E-mail</h5>
                            <h5 className="text-md font-medium text-gray-700">info@meal.io</h5>
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-5">
                        <PhoneIcon className='size-8 text-amber-600' />
                        <div>
                            <h5 className="text-md text-gray-600">Phone</h5>
                            <h5 className="text-md font-medium text-gray-700">+1 (555) 123-4567</h5>
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <form className='flex flex-col gap-y-5 bg-white shadow-lg rounded-3xl p-8'>
                        <Field label={"Name"} type="text" name="fullName" placeholder="Your full name" required={true} />
                        <Field label={"Email"} type="email" name="email" placeholder="Your email address" required={true} />
                        <Field label={"Subject"} type="text" name="subject" placeholder="Subject" required={true} />
                        <Field type="textarea" name="message" placeholder="Your message" required={true} className={"h-28"} />
                        <button
                            type="submit"
                            className='max-w-fit pl-0.5 pr-6 py-0.5 flex justify-start items-center gap-2 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 disabled:bg-amber-300 focus:ring-4 focus:ring-amber-300 focus:ring-opacity-75 focus:outline-hidden transition-colors duration-200 cursor-pointer'>
                            <ArrowRightCircleIcon className='size-12' />Send Message
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;