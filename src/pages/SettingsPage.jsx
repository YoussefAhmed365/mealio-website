// Imports
import { useState } from "react"
import TopNavbar from "../components/shared/TopNavbar"
import Button from "../components/shared/Button"

// Section Components
import ProfileForm from "../components/settings/ProfileForm"
import MealPreferencesForm from "../components/settings/MealPreferencesForm"
import SecurityForm from "../components/settings/SecurityForm"
import SubscriptionForm from "../components/settings/SubscriptionForm"
import NotificationsForm from "../components/settings/NotificationsForm"
import HelpSupportForm from "../components/settings/HelpSupportForm"

// Styles
import "../assets/css/SettingsPage.css"

const NAV_BUTTONS = [
    "Profile Information",
    "Meal Preferences",
    "Security & Privacy",
    "Subscription Management",
    "Notifications",
    "Help & Support",
];

const SettingsPage = () => {
    const [active, setActive] = useState(0);

    const CONTENTS = [
        <ProfileForm key="profile" />,
        <MealPreferencesForm key="meal" />,
        <SecurityForm key="security" />,
        <SubscriptionForm key="subscription" />,
        <NotificationsForm key="notifications" />,
        <HelpSupportForm key="help" />,
    ];

    return (
        <div className="w-full flex flex-col justify-start items-center">
            <TopNavbar />
            <div className="w-full grid grid-cols-1 xl:grid-cols-5 my-4 px-6">
                {/* Sidebar */}
                <div className="md:col-span-1 space-y-5">
                    <div className="nav-btns flex flex-col justify-start items-start space-y-4">
                        {NAV_BUTTONS.map((label, index) => (
                            <Button
                                key={index}
                                styleType="white"
                                className={`max-w-fit ${active === index ? "active" : "removing"}`}
                                onClick={() => setActive(index)}
                            >
                                {label}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className={`md:col-span-4 w-fit pr-12 space-y-5 border border-transparent xl:border-l-gray-500 px-2 py-5 xl:pl-20`}>
                    {CONTENTS[active]}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;