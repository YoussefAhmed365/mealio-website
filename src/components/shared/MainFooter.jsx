import { Link } from "react-router-dom"
import AndroidIcon from '../../assets/icons/Android'
import AppleIcon from '../../assets/icons/Apple'

const linkSections = [
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", to: "/legal/privacy" },
            { name: "Terms of Service", to: "/legal/terms" },
            { name: "Data Protection", to: "/legal/data-protection" },
            { name: "User Rights", to: "/legal/user-rights" },
        ],
    },
    {
        title: "Company & Help",
        links: [
            { name: "About Us", to: "/about" },
            { name: "FAQ", to: "/faq" },
            { name: "Contact Us", to: "/contact" },
            { name: "Blog", to: "/blog" }
        ],
    },
    {
        title: "Socials",
        links: [
            // For external links, you would use a regular <a> tag
            // e.g., <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            { name: "Facebook", to: "#" },
            { name: "Instagram", to: "#" },
            { name: "Twitter", to: "#" },
            { name: "Behance", to: "#" }
        ],
    },
    {
        title: "Get Started",
        links: [
            // For external links, you would use a regular <a> tag
            // e.g., <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            { name: "Sign Up", to: "/signup" },
            { name: "Login", to: "/login" },
            { name: "Forgot Password", to: "/forgot-password" },
            { name: "How it Works", to: "/how-it-works" }
        ],
    },
];

const bottomFooterLinks = [
    {
        links: [
            { name: "Cookies Policy", to: "/legal/cookies" },
            { name: "Sitemap", to: "/sitemap" },
            { name: "Careers", to: "/careers" },
            { name: "Security Statement", to: "/legal/security" }
        ],
    },
];

const Footer = () => {
    return (
        <footer className="w-full mt-20 bg-amber-50 pt-12 font-semibold border-t-[3px] border-amber-100">
            <div className="flex flex-col md:flex-row justify-between items-center px-8 md:px-10 pb-12">
                <div className="space-y-2 w-full md:w-1/3 mb-10 md:mb-0">
                    <h1 className="text-3xl font-bold"><span className="text-amber-600">Meal</span><span className="text-amber-900">.io</span></h1>
                    <h1 className="text-3xl font-bold">We help you plan your meals with the power of <span className="bg-gradient-to-r from-amber-600 to-amber-200 text-transparent bg-clip-text">AI</span>.</h1>
                    <p className="text-gray-600">Meal.io, 2025.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-x-16">
                    {linkSections.map((section, idx) => (
                        <div key={idx} className="col-span-1 space-y-4">
                            <h6 className="text-base font-semibold">{section.title}</h6>
                            <div className="flex flex-col space-y-2">
                                {section.links.map((link) => (
                                    <Link key={link.name} to={link.to} className={`text-sm text-gray-600 hover:text-amber-700 transition duration-200`}>
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="col-span-1 space-y-4">
                        <h6 className="text-base font-semibold">Get the app</h6>
                        <div className="flex flex-col justify-start items-start space-y-3">
                            <a href="https://play.google.com" className="no-underline border border-gray-600 rounded-full py-2 px-4 flex justify-center items-center text-gray-600 hover:text-amber-700 hover:border-amber-700 transition duration-200">
                                <AndroidIcon className="size-6 mr-2" />
                                Android
                            </a>
                            <a href="https://play.google.com" className="no-underline border border-gray-600 rounded-full py-2 px-4 flex justify-center items-center text-gray-600 hover:text-amber-700 hover:border-amber-700 transition duration-200">
                                <AppleIcon className="size-6 mr-2" />
                                IOS
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="text-center content-center py-6 px-10 border-t-2 border-amber-100">
                <p className="text-gray-800">&copy; 2025 Meal.io. All rights reserved.</p>
            </div> */}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 py-6 px-10 bg-amber-700">
                <p className="text-white">&copy; 2025 Meal.io. All rights reserved.</p>
                <div className="flex flex-wrap gap-6">
                    {bottomFooterLinks[0].links.map((link) => (
                        <Link key={link.name} to={link.to} className="text-white hover:text-shadow-xs hover:text-shadow-white/80 transition-all duration-200">{link.name}</Link>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;