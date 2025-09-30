import { Link } from 'react-router-dom'
import FAQImage from '../../assets/images/FAQ.webp'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

const FAQ_DATA = [
    {
        id: 1,
        question: `What is Meal.io?`,
        answer: `Meal.io is an AI-powered app that helps you plan your meals for the day or week. It creates custom meal plans based on your tastes, budget, and what you have on hand, and it also helps with shopping lists and calorie tracking.`
    },
    {
        id: 2,
        question: `How does the app create personalized meal plans?`,
        answer: `Using AI, the app's assistant, "Mealio," takes your input—like your available ingredients, food preferences, and allergies (like your gluten allergy)—and suggests a week's worth of meals. It's interactive, so if you don't like a suggestion, the app will replace it with a new one.`
    },
    {
        id: 3,
        question: `How does the app keep user accounts secure?`,
        answer: `The app uses a modern and secure system to protect your information. It uses a secure token to manage your sessions and allows you to sign in safely with accounts you already have, like Google or Facebook, so it doesn't need to store your passwords.`
    },
    {
        id: 4,
        question: `How do I get a custom meal plan?`,
        answer: `First, you sign in and tell the app about your preferences, such as your allergies, how many people you're cooking for, and your budget. Then, you request a new meal plan, and the app uses this information to instantly create and display a customized plan for you.`
    },
    {
        id: 5,
        question: `How does the app help users connect and find new recipes?`,
        answer: `The app has a community section where you can discover and share recipes with other users. You can search for new ideas using filters, and you can like, comment on, and save recipes that others have shared.`
    },
];

const AccordionItem = ({ faq, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-5 px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-opacity-75 rounded-lg"
                aria-expanded={isOpen}
            >
                <span className={`text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-amber-600' : 'text-gray-800'}`}>{faq.question}</span>
                <span className="flex-shrink-0 ml-4">
                    <ChevronDownIcon className={`w-6 h-6 text-gray-400 transition-transform duration-500 ease-in-out ${isOpen ? 'transform rotate-180 text-amber-600' : ''}`} />
                </span>
            </button>
            {/* Improved animation using grid-rows transition */}
            <div
                className={`grid overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <div className="px-6 pb-5 pt-1">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <main className="mt-20 w-full py-14 px-8 sm:px-12 md:px-28 bg-amber-50 flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-28">
            {/* FAQ Section */}
            <div className='w-full lg:w-1/2 h-full flex flex-col space-y-12'>
                {/* Title */}
                <div className='space-y-4'>
                    <h1 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
                    <p className='text-gray-600 font-medium'>Here are some of our most frequently asked questions. If you don't see your question here, feel free to contact us.</p>
                </div>

                {/* Questions */}
                <div className='space-y-8 w-full'>
                    <div className="divide-y divide-gray-200">
                        {FAQ_DATA.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                faq={faq}
                                isOpen={openIndex === index}
                                onClick={() => handleToggle(index)}
                            />
                        ))}
                    </div>

                    <p className='text-gray-600'>Still have any questions? See <Link to={"/faq"} className='text-amber-600 font-bold hover:text-amber-800 transition duration-200'>FAQs</Link> or <Link to={"/contact"} className='text-amber-600 font-bold hover:text-amber-800 transition duration-200'>Contact Us</Link></p>
                </div>
            </div>

            <div className='w-full lg:w-1/2 h-[-webkit-fill-available] bg-cover bg-center bg-no-repeat rounded-xl' style={{ backgroundImage: `url(${FAQImage})` }}></div>
        </main>
    );
};

export default FAQ;