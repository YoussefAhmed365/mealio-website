import React from 'react'
import Button from '../shared/Button'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import packageJson from '../../../package.json'

const HelpSupportForm = () => {
    // Get version from package.json
    const appVersion = packageJson.version;

    const supportItems = [
        {
            title: "Frequently Asked Questions",
            description: "Find quick answers to common questions about Meal.io.",
            buttonText: "View FAQs",
            href: "/faq",
        },
        {
            title: "Contact Us",
            description: "Can't find what you're looking for? Our support team is here to help.",
            buttonText: "Get Support",
            href: "mailto:support@meal.io",
        },
        {
            title: "Terms of Service",
            description: "Read our terms and conditions.",
            buttonText: "View Terms",
            href: "/terms-of-service",
        },
        {
            title: "Privacy Policy",
            description: "Learn how we handle your data.",
            buttonText: "View Policy",
            href: "/privacy-policy",
        },
    ];

    return (
        <>
            <div className="space-y-2 mb-8">
                <h1 className="text-3xl font-bold">Help & Support</h1>
                <p className="font-medium">Find answers to your questions and get in touch with our team.</p>
            </div>

            <div className="p-6 border rounded-lg bg-gray-50/50 space-y-6">
                {supportItems.map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                        <div>
                            <h3 className="font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                        <Button
                            styleType="light"
                            as="a"
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="max-w-fit flex justify-center items-center"
                        >
                            {item.buttonText}
                            <ArrowTopRightOnSquareIcon className="size-5 ml-2" />
                        </Button>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center text-gray-500">
                <p>App Version: {appVersion}</p>
            </div>
        </>
    );
};

export default HelpSupportForm;