import { useState } from "react"
import Button from "../shared/Button"

// A simple, self-contained Switch component for toggling settings.
const Switch = ({ enabled, onChange }) => (
    <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
            enabled ? 'bg-amber-600' : 'bg-gray-200'
        }`}
        aria-checked={enabled}
        role="switch"
    >
        <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
                enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
        />
    </button>
);

const NOTIFICATION_SETTINGS = [
    {
        id: 'mealReminders',
        title: 'Meal Reminders',
        description: 'Get notified when it\'s time to prepare your next meal.',
    },
    {
        id: 'planUpdates',
        title: 'Plan Updates',
        description: 'Receive a notification when your weekly meal plan is ready.',
    },
    {
        id: 'groceryUpdates',
        title: 'Grocery List Updates',
        description: 'Get alerts about changes or suggestions for your shopping list.',
    },
    {
        id: 'newFeatures',
        title: 'New Features',
        description: 'Stay informed about the latest features and improvements to Meal.io.',
    },
    {
        id: 'promotions',
        title: 'Promotions & Offers',
        description: 'Receive special offers, discounts, and promotional content.',
    },
];

const NotificationsForm = () => {
    const [settings, setSettings] = useState({
        mealReminders: true,
        planUpdates: true,
        groceryUpdates: true,
        newFeatures: true,
        promotions: false,
    });

    const handleToggle = (id) => {
        setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSave = () => {
        console.log("Saving notification settings:", settings);
        // Add logic to save settings to the backend
    };

    return (
        <>
            <div className="space-y-2 mb-8">
                <h1 className="text-3xl font-bold">Notifications</h1>
                <p className="font-medium">Choose how you want to be notified. You can change these settings at any time.</p>
            </div>

            <div className="p-6 border rounded-lg bg-gray-50/50 space-y-6">
                {NOTIFICATION_SETTINGS.map((setting) => (
                    <div key={setting.id} className="flex flex-col justify-between items-start md:flex-row md:items-center space-y-4 md:space-y-0">
                        <div>
                            <h3 className="font-semibold text-gray-800">{setting.title}</h3>
                            <p className="text-gray-600 text-sm">{setting.description}</p>
                        </div>
                        <Switch
                            enabled={settings[setting.id]}
                            onChange={() => handleToggle(setting.id)}
                        />
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <Button styleType="primary" onClick={handleSave}>Save Preferences</Button>
            </div>
        </>
    );
};

export default NotificationsForm;