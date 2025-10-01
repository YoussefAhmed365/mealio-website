// Components & Libraries
import Navbar from '../components/shared/MainNavbar'
import Footer from '../components/shared/MainFooter'

// Images
import TopLeft from '../assets/images/decorations/top-left.svg'
import TopRight from '../assets/images/decorations/top-right.svg'
import BottomLeft from '../assets/images/decorations/bottom-left.svg'
import BottomRight from '../assets/images/decorations/bottom-right.svg'

const TermsOfUsePage = () => {
    return (
        <>
            <div className='relative h-96'>
                <Navbar />
                <div className='absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-amber-50 flex justify-center items-center'>
                    <h1 className='text-4xl font-bold text-gray-800'>Terms Of Usage</h1>
                </div>
                <div className='absolute -z-10 top-0 h-full w-full'>
                    <div className="bg-svg relative w-full h-full">
                        <img src={TopLeft} className="absolute top-0 left-0 w-28" />
                        <img src={TopRight} className="absolute top-0 right-20 w-28" />
                        <img src={BottomLeft} className="absolute bottom-0 left-30 w-46" />
                        <img src={BottomRight} className="absolute bottom-0 right-0 w-36" />
                    </div>
                </div>
            </div>

            <div className="flex justify-start gap-10 w-full py-8 px-4 md:px-20 lg:px-40">
                <div className="p-8">
                    <div className="sticky top-20 bg-white">
                        <nav className="flex flex-col w-56 space-y-4 text-sm">
                            <a href='/privacy' className="min-w-max text-start text-md px-6 py-4 bg-white font-semibold rounded-lg hover:bg-gray-200 disabled:bg-gray-100 focus:ring-4 focus:ring-gray-300 focus:ring-opacity-75 focus:outline-hidden transition-colors duration-200">Privacy Policy</a>
                            <a href='/terms' className="min-w-max text-start text-md px-6 py-4 bg-gray-200 font-semibold rounded-lg hover:bg-gray-300 disabled:bg-gray-100 focus:ring-4 focus:ring-gray-300 focus:ring-opacity-75 focus:outline-hidden transition-colors duration-200">Terms of Service</a>
                            <a href='/cookies' className="min-w-max text-start text-md px-6 py-4 bg-white font-semibold rounded-lg hover:bg-gray-200 disabled:bg-gray-100 focus:ring-4 focus:ring-gray-300 focus:ring-opacity-75 focus:outline-hidden transition-colors duration-200">Cookie Policy</a>
                            <a href='/protection' className="min-w-max text-start text-md px-6 py-4 bg-white font-semibold rounded-lg hover:bg-gray-200 disabled:bg-gray-100 focus:ring-4 focus:ring-gray-300 focus:ring-opacity-75 focus:outline-hidden transition-colors duration-200">Data Protection</a>
                            <a href='/rights' className="min-w-max text-start text-md px-6 py-4 bg-white font-semibold rounded-lg hover:bg-gray-200 disabled:bg-gray-100 focus:ring-4 focus:ring-gray-300 focus:ring-opacity-75 focus:outline-hidden transition-colors duration-200">User Rights</a>
                        </nav>
                    </div>
                </div>

                <main className="flex justify-center items-center pt-8">
                    <div className='h-full w-0.5 shadow-2xl'></div>
                    <div>
                        <h1>Privacy Policy</h1>
                        <p className="lead">Last Updated: September 22, 2025</p>

                        <p>Meal.io ("us", "we", or "our") operates the meal.io website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>

                        <h2>1. Information Collection and Use</h2>
                        <p>We collect several different types of information for various purposes to provide and improve our Service to you. This includes personal data such as your email address, name, and usage data, as well as dietary and preference information to personalize your experience.</p>

                        <h2>2. How We Use Your Information</h2>
                        <p>Meal.io uses the collected data for various purposes: to provide and maintain the Service, to notify you about changes to our Service, to provide customer care and support, and to provide analysis or valuable information so that we can improve the Service.</p>

                        <h2>3. Data Security</h2>
                        <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

                        <h2>4. Your Data Rights</h2>
                        <p>You have the right to access, update or to delete the information we have on you. You can access and update your personal information directly within your account settings section. If you wish to delete your account and all associated data, you can do so from the 'Security & Privacy' tab in your settings.</p>

                        <h2>5. Service Providers</h2>
                        <p>We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>

                        <h2>6. Changes to This Privacy Policy</h2>
                        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

                        <h2>7. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@meal.io">support@meal.io</a>.</p>
                    </div>
                </main>
            </div>

            <Footer />
        </>
    );
};

export default TermsOfUsePage;