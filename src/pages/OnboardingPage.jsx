import React, { createContext, useState, useContext, useEffect } from 'react'
import ChevronLeft from '../assets/icons/ChevronLeft'
import ChevronDown from '../assets/icons/ChevronDown'
import UserIcon from '../assets/icons/User'

// --- ONBOARDING CONTEXT ---
const OnboardingContext = createContext(null);

export const OnboardingProvider = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [onboardingData, setOnboardingData] = useState({
        preferences: null,
        numPeople: 1,
        allergies: {},
        budget: null,
        trackingOption: null,
    });

    const totalSteps = 5;

    const updateData = (newData) => {
        setOnboardingData(prev => ({ ...prev, ...newData }));
    };

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    const value = {
        currentStep,
        totalSteps,
        onboardingData,
        updateData,
        nextStep,
        prevStep,
        setCurrentStep,
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

// --- SHARED & REUSABLE COMPONENTS ---

const StepIndicator = () => {
    const { currentStep, totalSteps } = useOnboarding();
    const steps = ["Preferences", "Household", "Allergies", "Budget", "Tracking"];

    return (
        <div className="flex justify-between items-center w-full max-w-2xl mx-auto mb-12 px-4">
            {steps.map((label, index) => (
                <React.Fragment key={index}>
                    <div className="flex flex-col items-center">
                        <div
                            className={`w-10 h-10 font-semibold rounded-full flex items-center justify-center cursor-default transition-all duration-300
                            ${currentStep >= index ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'}
                            ${currentStep === index ? 'ring-4 ring-amber-300' : ''}`}
                        >
                            {index + 1}
                        </div>
                        <p className={`mt-2 cursor-default text-xs font-semibold text-center ${currentStep >= index ? 'text-amber-600' : 'text-gray-500'}`}>{label}</p>
                    </div>
                    {index < totalSteps - 1 && (
                        <div className={`flex-1 rounded-sm mb-5 h-1 mx-2 ${currentStep > index ? 'bg-amber-600' : 'bg-gray-200'}`}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};


const OnboardingStep = ({ title, subtitle, children, onNext, onBack, isNextDisabled, isLastStep = false }) => {
    return (
        <div className="bg-white rounded-xs shadow-lg p-8 w-full max-w-2xl transition-all duration-500">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
                <p className="text-gray-500 mt-2">{subtitle}</p>
            </div>
            <div className="mb-8">{children}</div>
            <div className={`flex ${onBack ? 'justify-between' : 'justify-end'}`}>
                {onBack && (
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-6 py-3 font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                    >
                        <ChevronLeft />
                        Back
                    </button>
                )}
                <button
                    onClick={onNext}
                    disabled={isNextDisabled}
                    className="px-6 py-3 font-semibold text-white bg-amber-600 rounded-lg hover:bg-amber-700 disabled:bg-amber-300 disabled:cursor-not-allowed transition-colors duration-300 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                    {isLastStep ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
};

const OptionButton = ({ label, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 font-medium
        ${isSelected ? 'bg-amber-50 border-amber-600 text-amber-700' : 'bg-white border-gray-200 text-gray-700 hover:border-amber-400'}`}
    >
        {label}
    </button>
);


// --- ONBOARDING STEP COMPONENTS ---

const DietaryPreferences = () => {
    const { onboardingData, updateData, nextStep } = useOnboarding();
    const options = ["No Preference", "Vegetarian", "Vegan", "Pescatarian", "Keto", "Paleo", "Gluten-Free"];

    return (
        <OnboardingStep
            title="Dietary Preferences"
            subtitle="Select your dietary preference for more customized meal plans."
            onNext={nextStep}
            isNextDisabled={!onboardingData.preferences}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {options.map(option => (
                    <OptionButton
                        key={option}
                        label={option}
                        isSelected={onboardingData.preferences === option}
                        onClick={() => updateData({ preferences: option })}
                    />
                ))}
            </div>
        </OnboardingStep>
    );
};

const NumberOfPeople = () => {
    const { onboardingData, updateData, nextStep, prevStep } = useOnboarding();
    const { numPeople } = onboardingData;

    const handleUpdate = (amount) => {
        const newValue = Math.max(1, Math.min(10, numPeople + amount));
        updateData({ numPeople: newValue });
    };

    return (
        <OnboardingStep
            title="Household Size"
            subtitle="How many people will you be planning meals for?"
            onNext={nextStep}
            onBack={prevStep}
        >
            <div className="flex items-center justify-center gap-6 my-8">
                <button onClick={() => handleUpdate(-1)} className="w-14 h-14 flex items-center justify-center text-3xl font-bold bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">-</button>
                <div className="flex flex-col items-center">
                    <span className="text-7xl font-bold text-amber-600">{numPeople}</span>
                    <span className="text-lg text-gray-500">People</span>
                </div>
                <button onClick={() => handleUpdate(1)} className="w-14 h-14 flex items-center justify-center text-3xl font-bold bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">+</button>
            </div>
        </OnboardingStep>
    );
};


const FoodAllergies = () => {
    const { onboardingData, updateData, nextStep, prevStep } = useOnboarding();
    const { numPeople, allergies } = onboardingData;
    const [openPersonIndex, setOpenPersonIndex] = useState(0);

    const ALLERGY_OPTIONS = ["Peanut", "Milk", "Egg", "Fish", "Soy", "Gluten"];

    useEffect(() => {
        const newAllergies = { ...allergies };
        let needsUpdate = false;
        
        // Ensure allergy data matches number of people
        for (let i = 0; i < numPeople; i++) {
            if (newAllergies[i] === undefined) {
                newAllergies[i] = [];
                needsUpdate = true;
            }
        }
        
        // Clean up data for people who were removed
        Object.keys(newAllergies).forEach(key => {
            if (parseInt(key) >= numPeople) {
                delete newAllergies[key];
                needsUpdate = true;
            }
        });

        if (needsUpdate) {
            updateData({ allergies: newAllergies });
        }
    }, [numPeople, allergies, updateData]);

    const handleToggleAllergy = (personIndex, allergy) => {
        const currentPersonAllergies = allergies[personIndex] || [];
        const newPersonAllergies = currentPersonAllergies.includes(allergy)
            ? currentPersonAllergies.filter(a => a !== allergy)
            : [...currentPersonAllergies, allergy];
        
        updateData({
            allergies: {
                ...allergies,
                [personIndex]: newPersonAllergies
            }
        });
    };

    return (
        <OnboardingStep
            title="Food Allergies"
            subtitle="Specify allergies for each person in the household."
            onNext={nextStep}
            onBack={prevStep}
        >
            <div className="space-y-2 overflow-y-scroll max-h-[292px]">
                {Array.from({ length: numPeople }).map((_, index) => {
                    const personAllergies = allergies[index] || [];
                    const isOpen = openPersonIndex === index;
                    return (
                        <div key={index} className="border border-gray-200 rounded-lg">
                            <button
                                onClick={() => setOpenPersonIndex(isOpen ? null : index)}
                                className="w-full flex justify-between items-center p-4 text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <UserIcon />
                                    <div className='flex flex-col items-start'>
                                        <span className="font-semibold text-gray-700">Person {index + 1}</span>
                                        {!isOpen && personAllergies.length > 0 && (
                                            <span className="text-xs text-gray-500 mt-1">{personAllergies.join(', ')}</span>
                                        )}
                                         {!isOpen && personAllergies.length === 0 && (
                                            <span className="text-xs text-gray-500 mt-1">No Allergies</span>
                                        )}
                                    </div>
                                </div>
                                <ChevronDown className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''} duration-500`} />
                            </button>
                            {isOpen && (
                                <div className="p-4 border-t border-gray-200">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {ALLERGY_OPTIONS.map(option => (
                                            <OptionButton
                                                key={option}
                                                label={option}
                                                isSelected={personAllergies.includes(option)}
                                                onClick={() => handleToggleAllergy(index, option)}
                                            />
                                        ))}
                                    </div>
                                    <div className="mt-3">
                                        <OptionButton
                                            label="No Allergies"
                                            isSelected={personAllergies.length === 0}
                                            onClick={() => handleToggleAllergy(index, 'No Allergies')} // 'No Allergies' is a placeholder to clear
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </OnboardingStep>
    );
};


const Budget = () => {
    const { onboardingData, updateData, nextStep, prevStep } = useOnboarding();
    const options = ["Low", "Medium", "High", "No Limit"];

    return (
        <OnboardingStep
            title="Weekly Budget"
            subtitle="What's your approximate weekly budget for groceries?"
            onNext={nextStep}
            onBack={prevStep}
            isNextDisabled={!onboardingData.budget}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {options.map(option => (
                    <OptionButton
                        key={option}
                        label={option}
                        isSelected={onboardingData.budget === option}
                        onClick={() => updateData({ budget: option })}
                    />
                ))}
            </div>
        </OnboardingStep>
    );
};

const TrackingOption = () => {
    const { onboardingData, updateData, prevStep } = useOnboarding();
    const options = ["Track Calories", "Track Macros", "Track Ingredients", "No Tracking"];
    
    const handleFinish = () => {
        console.log("Onboarding Complete:", onboardingData);
        alert("Onboarding Complete! Check the console for the final data.");
    };

    return (
        <OnboardingStep
            title="Tracking Preferences"
            subtitle="Would you like to track your meals?"
            onNext={handleFinish}
            onBack={prevStep}
            isNextDisabled={!onboardingData.trackingOption}
            isLastStep={true}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {options.map(option => (
                     <OptionButton
                        key={option}
                        label={option}
                        isSelected={onboardingData.trackingOption === option}
                        onClick={() => updateData({ trackingOption: option })}
                    />
                ))}
            </div>
        </OnboardingStep>
    );
};


// --- MAIN ONBOARDING FLOW ---

const OnboardingFlow = () => {
    const { currentStep } = useOnboarding();

    const steps = [
        <DietaryPreferences />,
        <NumberOfPeople />,
        <FoodAllergies />,
        <Budget />,
        <TrackingOption />
    ];

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen flex flex-col justify-center items-center p-4">
            <StepIndicator />
            <div className="relative w-full max-w-2xl" style={{ height: '520px' }}>
                 {steps.map((step, index) => (
                    <div
                        key={index}
                        className="absolute w-full transition-all duration-500"
                        style={{
                            opacity: currentStep === index ? 1 : 0,
                            transform: `translateX(${(index - currentStep) * 10}%)`,
                            pointerEvents: currentStep === index ? 'auto' : 'none',
                        }}
                    >
                        {step}
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- APP ---
export default function App() {
  return (
    <OnboardingProvider>
        <OnboardingFlow />
    </OnboardingProvider>
  )
}