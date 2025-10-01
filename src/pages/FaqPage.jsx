import Navbar from '../components/shared/MainNavbar'
import Footer from '../components/shared/MainFooter'
import { useState } from 'react'
import { ArrowLongRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import AnimatedBackground from '../animations/AnimatedBackground';

const General_FAQ = [
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

const Service_FAQ = [
    {
        question: "What is Meal.io?",
        answer: "Meal.io is a smart meal planning application designed to simplify your life. We provide personalized weekly meal plans, automated grocery lists, and a vast library of recipes tailored to your dietary needs and preferences."
    },
    {
        question: "How do I customize my meal plan?",
        answer: "Meal.io allows extensive customization of your meal plan. You can swap out recipes you don't like, add your own favorite dishes, and adjust serving sizes directly from your weekly plan view. Our smart system will adapt to your changes."
    },
    {
        question: "What kind of recipes are available?",
        answer: "We offer a diverse range of recipes catering to various cuisines, dietary restrictions (e.g., vegetarian, vegan, gluten-free), and skill levels. Our library is constantly updated with new and exciting dishes from professional chefs and our community."
    }
];

const AccordionItem = ({ faq, isOpen, onClick }) => (
    <div className="max-h-min bg-white rounded-lg border border-gray-200 mb-4 last:mb-0">
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

const General = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        General_FAQ.map((faq, index) => (
            <AccordionItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
            />
        ))
    );
};

const Service = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        Service_FAQ.map((faq, index) => (
            <AccordionItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
            />
        ))
    );
};

const Support = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        Service_FAQ.map((faq, index) => (
            <AccordionItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
            />
        ))
    );
};

const Privacy = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        Service_FAQ.map((faq, index) => (
            <AccordionItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
            />
        ))
    );
};

const FAQSections = () => {
    const [activeTab, setActiveTab] = useState('general');

    const renderContent = () => {
        switch (activeTab) {
            case 'general':
                return <General />;
            case 'service':
                return <Service />;
            case 'support':
                return <Support />;
            case 'privacy':
                return <Privacy />;
            default:
                return <General />;
        };
    };

    const TabButton = ({ label, tabKey }) => (
        <button
            className={`w-full px-5 py-5 rounded-lg font-semibold text-md text-start cursor-pointer ${activeTab === tabKey ? 'bg-amber-500/15 text-amber-800 hover:bg-amber-500/20' : 'bg-transparent text-gray-800 hover:bg-gray-200'} transition-colors`}
            onClick={() => setActiveTab(tabKey)}
        >
            {label}
        </button>
    );

    return (
        <div className='relative'>
            <AnimatedBackground className={"-z-10"} />

            <div className='relative h-96 mb-20'>
                <Navbar />
                <div className='absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-full h-96 flex justify-center items-center'>
                    <h1 className='text-4xl font-bold text-gray-800'>Contact Us</h1>
                </div>
            </div>

            <main className='min-h-screen w-full px-8 md:px-20 lg:px-32'>
                <div className="w-full py-12 md:py-20 px-4">
                    <div className="mx-auto">
                        <div className="text-center mb-26 space-y-4">
                            <p className="mt-4 text-lg font-medium text-gray-600">Find answers about Meal.io</p>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Frequently Asked Questions</h1>
                        </div>
                        <div className='w-full grid grid-cols-4 gap-20'>
                            <div className='col-span-1 divide-y divide-gray-200 flex flex-col'>
                                <TabButton label="General" tabKey="general" />
                                <TabButton label="Our Service" tabKey="service" />
                                <TabButton label="Support" tabKey="support" />
                                <TabButton label="Privacy & Policy" tabKey="privacy" />
                            </div>
                            <div className="col-span-3">
                                {renderContent()}
                            </div>
                        </div>
                        <div className="text-center mt-12">
                            <p className="text-gray-600">Couldn't find the answer you're looking for?</p>
                            <a href="#" className="mt-2 inline-block font-medium text-amber-600 hover:text-amber-700 transition-colors">
                                Contact our support team <ArrowLongRightIcon className='size-5 inline' />
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const FaqPage = () => {
    return (
        <>
            <FAQSections />
            <Footer />
        </>
    );
};

export default FaqPage;