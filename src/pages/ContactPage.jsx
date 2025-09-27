import Navbar from '../components/shared/MainNavbar'
import Footer from '../components/shared/MainFooter'
import { useState } from 'react'
import Field from '../components/shared/Field'
import Button from '../components/shared/Button'

const ContactPage = () => {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formValues);
        // Here you would typically send the form data to a backend service
        alert("Thank you for your message! We'll get back to you shortly.");
        setFormValues({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <>
            <Navbar />

            <main className="w-full max-w-2xl mx-auto py-8 px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">Get In Touch</h1>
                    <p className="mt-2 text-lg text-gray-600">Have a question or feedback? We'd love to hear from you.</p>
                </div>

                <div className="p-8 border rounded-lg bg-white shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Field
                            label="Full Name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={formValues.name}
                            onChange={handleChange}
                            required
                        />
                        <Field
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formValues.email}
                            onChange={handleChange}
                            required
                        />
                        <Field
                            label="Subject"
                            name="subject"
                            type="text"
                            placeholder="How can we help?"
                            value={formValues.subject}
                            onChange={handleChange}
                            required
                        />
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                placeholder="Your message..."
                                value={formValues.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <Button type="submit" styleType="primary" className="w-full">Send Message</Button>
                    </form>
                </div>
                <p className="text-center text-gray-500 mt-6">
                    You can also email us directly at <a href="mailto:support@meal.io" className="text-amber-600 hover:underline">support@meal.io</a>.
                </p>
            </main>

            <Footer />
        </>
    );
};

export default ContactPage;