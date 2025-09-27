import { Link } from 'react-router-dom'
import FAQImage from '../../assets/images/FAQ.webp'
import React, { useState } from 'react'

const FAQ = () => {
    const Questions = [
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

    // AccordionItem component

    const AccordionItem = ({ qa }) => {
        const [open, setOpen] = useState(false);

        return (
            <div className="w-full h-fit border-b border-gray-300 pb-2 pt-2">
                <button
                    className="w-full flex justify-between items-center cursor-pointer focus:outline-hidden"
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                >
                    <span className="text-lg font-semibold text-left text-gray-800">{qa.question}</span>
                    <span className="text-3xl font-bold text-amber-600">
                        {open ? '−' : '+'}
                    </span>
                </button>

                <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out`}
                    style={{
                        maxHeight: open ? '500px' : '0',
                    }}
                >
                    <div className="py-2 px-1 text-gray-700">
                        {qa.answer}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="mt-20 w-full py-14 px-8 sm:px-12 md:px-28 bg-amber-50 flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-28">
            {/* FAQ Section */}
            <div className='w-full lg:w-1/2 h-full flex flex-col space-y-12'>
                {/* Title */}
                <div className='space-y-4'>
                    <h1 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
                    <p className='text-gray-600 font-medium'>Here are some of our most frequently asked questions. If you don't see your question here, feel free to contact us.</p>
                </div>

                {/* Questions */}
                <div className='space-y-8 w-full'>
                    <div className="flex flex-col justify-center items-center gap-3">
                        {Questions.map((qa) => (
                            <AccordionItem key={qa.id} qa={qa} />
                        ))}
                    </div>

                    <p className='text-gray-600'>Still have any questions? See <Link to={"/faq"} className='text-amber-600 font-bold hover:text-amber-800 transition duration-200'>FAQs</Link> or <Link to={"/contact"} className='text-amber-600 font-bold hover:text-amber-800 transition duration-200'>Contact Us</Link></p>
                </div>
            </div>

            <div className='w-full lg:w-1/2 h-[-webkit-fill-available] bg-cover bg-center bg-no-repeat rounded-xl' style={{ backgroundImage: `url(${FAQImage})` }}></div>
        </div>
    );
};

export default FAQ;