import Navbar from '../components/shared/MainNavbar'
import Footer from '../components/shared/MainFooter'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

const FAQ_DATA = [
    {
        question: "What is Meal.io?",
        answer: "Meal.io is a smart meal planning application designed to simplify your life. We provide personalized weekly meal plans, automated grocery lists, and a vast library of recipes tailored to your dietary needs and preferences."
    },
    {
        question: "How do I change my dietary preferences?",
        answer: "You can update your dietary preferences, allergies, and other meal-related settings at any time by navigating to the 'Settings' page and selecting the 'Meal Preferences' tab."
    },
    {
        question: "Can I use Meal.io for free?",
        answer: "Yes! We offer a free plan with basic meal planning features. For more advanced capabilities like unlimited plans and advanced nutritional tracking, you can upgrade to our Premium or Family plans. You can manage your subscription in the 'Subscription Management' section of your settings."
    },
    {
        question: "How is my grocery list generated?",
        answer: "Your grocery list is automatically generated based on the recipes in your weekly meal plan. It consolidates all the necessary ingredients, making your shopping trips faster and more efficient. You can view and manage your list from the main dashboard."
    },
    {
        question: "How do you handle my personal data?",
        answer: "We take your privacy very seriously. Your data is used to personalize your meal plans and improve our service. For full details, please review our Privacy Policy, which is accessible from the 'Help & Support' section in your settings."
    }
];

const AccordionItem = ({ faq, isOpen, onClick }) => (
    <div className="border-b">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-left py-4 px-2 focus:outline-hidden"
        >
            <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
            <ChevronDownIcon className={`size-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
            <div className="p-4 bg-gray-50">
                <p className="text-gray-600">{faq.answer}</p>
            </div>
        </div>
    </div>
);

const FaqPage = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <Navbar />

            <main className="w-full max-w-4xl mx-auto py-8 px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
                    <p className="mt-2 text-lg text-gray-600">Find answers to the most common questions about Meal.io.</p>
                </div>
                <div className="border rounded-lg">
                    {FAQ_DATA.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </main>

            <Footer />
        </>
    );
};

export default FaqPage;