import { createContext, useState, useContext } from 'react'

const OnboardingContext = createContext(null);

export const OnboardingProvider = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5; // Onboarding Pages Count
    const [preferences, setPreferences] = useState(null);
    const [persons, setPersons] = useState(1);
    const [allergies, setAllergies] = useState([]);
    const [budget, setBudget] = useState(null);
    const [trackingOption, setTrackingOption] = useState(null);

    const value = {
        currentStep,
        setCurrentStep,
        totalSteps,
        preferences,
        setPreferences,
        persons,
        setPersons,
        allergies,
        setAllergies,
        budget,
        setBudget,
        trackingOption,
        setTrackingOption,
    };

    return (
        <OnboardingContext.Provider value={value}>
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }
    return context;
};