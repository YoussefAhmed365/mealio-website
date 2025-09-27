import Navbar from '../components/shared/MainNavbar'
import Footer from '../components/shared/MainFooter'

const PrivacyPolicyPage = () => {
    return (
        <>
            <Navbar />

            <main className="w-full max-w-4xl mx-auto py-8 px-4">
                <div className="prose lg:prose-xl max-w-none">
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

            <Footer />
        </>
    );
};

export default PrivacyPolicyPage;