import Navbar from '../components/shared/MainNavbar'
import Footer from '../components/shared/MainFooter'

const TermsOfServicePage = () => {
    return (
        <>
            <Navbar />

            <main className="w-full max-w-4xl mx-auto py-8 px-4">
                <div className="prose lg:prose-xl max-w-none">
                    <h1>Terms of Service</h1>
                    <p className="lead">Last Updated: September 22, 2025</p>

                    <p>Welcome to Meal.io! These terms and conditions outline the rules and regulations for the use of Meal.io's Website, located at meal.io. By accessing this website we assume you accept these terms and conditions. Do not continue to use Meal.io if you do not agree to take all of the terms and conditions stated on this page.</p>

                    <h2>1. User Accounts</h2>
                    <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>

                    <h2>2. Subscriptions</h2>
                    <p>Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.</p>

                    <h2>3. Content</h2>
                    <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.</p>

                    <h2>4. Intellectual Property</h2>
                    <p>The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Meal.io and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>

                    <h2>5. Limitation Of Liability</h2>
                    <p>In no event shall Meal.io, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

                    <h2>6. Changes To Terms</h2>
                    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

                    <h2>7. Contact Us</h2>
                    <p>If you have any questions about these Terms, please contact us at <a href="mailto:support@meal.io">support@meal.io</a>.</p>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default TermsOfServicePage;