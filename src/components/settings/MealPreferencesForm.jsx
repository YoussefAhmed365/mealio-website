import { useState, useEffect } from "react"
import Button from "../shared/Button"
import Field from "../shared/Field"
import { useAuth, API_URL } from "../../contexts/AuthContext"

const ALLERGIES_LIST = ["Gluten", "Dairy", "Peanuts", "Shellfish", "Soy", "Eggs", "Tree Nuts", "Fish"];

const MealPreferencesForm = () => {
    const { user, checkUserLoggedIn } = useAuth();
    
    const [numPeople, setNumPeople] = useState(1);
    const [peopleAllergies, setPeopleAllergies] = useState([]);
    const [dietaryPreferences, setDietaryPreferences] = useState(["No Preference"]);
    const [trackingPreference, setTrackingPreference] = useState("No Tracking");
    const [culturalCuisine, setCulturalCuisine] = useState("");
    const [unitOfMeasurement, setUnitOfMeasurement] = useState("metric");
    const [budget, setBudget] = useState("Medium");
    
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });
    const [hasLoaded, setHasLoaded] = useState(false);

    // Initialize/Sync peopleAllergies array length with numPeople
    useEffect(() => {
        setPeopleAllergies((current) =>
            Array.from({ length: numPeople }, (_, i) => current[i] || { name: `Person ${i + 1}`, allergies: [] })
        );
    }, [numPeople]);

    // Load preferences from user context on mount or when user changes
    useEffect(() => {
        if (user?.mealPreferences && !hasLoaded) {
            const prefs = user.mealPreferences;
            
            // Populate dietaryPreferences
            if (Array.isArray(prefs.preferences)) {
                setDietaryPreferences(prefs.preferences);
            } else if (typeof prefs.preferences === "string") {
                setDietaryPreferences([prefs.preferences]);
            }
            
            // Populate trackingOption
            if (prefs.trackingOption) {
                setTrackingPreference(prefs.trackingOption);
            }
            
            // Populate budget
            if (prefs.budget) {
                setBudget(prefs.budget);
            }
            
            // Populate culturalCuisine
            if (prefs.culturalCuisine !== undefined) {
                setCulturalCuisine(prefs.culturalCuisine);
            }
            
            // Populate unitOfMeasurement
            if (prefs.unitOfMeasurement) {
                setUnitOfMeasurement(prefs.unitOfMeasurement);
            }
            
            // Populate persons
            if (prefs.persons) {
                const personKeys = Object.keys(prefs.persons);
                if (personKeys.length > 0) {
                    const loadedPeople = personKeys.map((key) => ({
                        name: prefs.persons[key].name || "Person",
                        allergies: prefs.persons[key].allergies || [],
                    }));
                    setPeopleAllergies(loadedPeople);
                    setNumPeople(loadedPeople.length);
                }
            }
            
            setHasLoaded(true);
        } else if (user && !user.mealPreferences && !hasLoaded) {
            // User is loaded but has no saved preferences, mark as loaded to prevent overriding default states repeatedly
            setHasLoaded(true);
        }
    }, [user, hasLoaded]);

    const handleAllergyToggle = (i, allergy) => {
        setPeopleAllergies((prev) => {
            const updated = [...prev];
            const person = { ...updated[i] };
            const list = [...person.allergies];
            const idx = list.indexOf(allergy);
            idx > -1 ? list.splice(idx, 1) : list.push(allergy);
            updated[i] = { ...person, allergies: list };
            return updated;
        });
    };

    const handlePersonNameChange = (i, newName) => {
        setPeopleAllergies((prev) => {
            const updated = [...prev];
            updated[i] = { ...updated[i], name: newName };
            return updated;
        });
    };

    const handleDietaryToggle = (pref) => {
        setDietaryPreferences((prev) => {
            const newPrefs = prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref];
            if (pref === "No Preference" && newPrefs.includes("No Preference")) return ["No Preference"];
            if (pref !== "No Preference") return newPrefs.filter((p) => p !== "No Preference");
            return newPrefs;
        });
    };

    const handleUpdate = (amount) => {
        setNumPeople((prev) => Math.max(1, Math.min(10, prev + amount)));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setStatus({ type: "", message: "" });

        const personsObj = {};
        peopleAllergies.forEach((person, idx) => {
            personsObj[`person${idx + 1}`] = {
                name: person.name,
                allergies: person.allergies,
            };
        });

        const body = {
            preferences: dietaryPreferences,
            persons: personsObj,
            budget,
            trackingOption: trackingPreference,
            culturalCuisine,
            unitOfMeasurement,
        };

        try {
            const res = await fetch(`${API_URL}/api/meal-preferences`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
                credentials: "include",
            });

            if (res.ok) {
                setStatus({ type: "success", message: "Preferences saved successfully!" });
                // Re-fetch user profile to sync AuthContext state!
                await checkUserLoggedIn();
            } else {
                const errorData = await res.json();
                setStatus({ type: "error", message: errorData.message || "Failed to save preferences." });
            }
        } catch (error) {
            console.error("Save error:", error);
            setStatus({ type: "error", message: "A server error occurred. Please try again." });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            {/* Persons */}
            <div className="mb-6 flex flex-col justify-start items-center">
                <span className="block text-gray-700 font-medium mb-4">Family Persons</span>
                <div className="flex justify-start items-center gap-6">
                    <button onClick={() => handleUpdate(-1)} className="w-10 h-10 flex items-center justify-center text-2xl font-bold bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors">-</button>
                    <span className="text-4xl font-bold text-amber-600">{numPeople}</span>
                    <button onClick={() => handleUpdate(1)} className="w-10 h-10 flex items-center justify-center text-2xl font-bold bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors">+</button>
                </div>
            </div>

            {/* Allergies */}
            <div className="mb-6">
                <span className="block text-gray-700 font-medium mb-2">Allergies</span>
                <div className="space-x-5 flex justify-start items-center overflow-x-scroll pb-2">
                    {peopleAllergies.map((person, i) => (
                        <div key={i} className="p-4 border-2 rounded-lg border-slate-400 min-w-[468px] w-[468px]">
                            <input
                                type="text"
                                value={person.name}
                                onChange={(e) => handlePersonNameChange(i, e.target.value)}
                                className="font-semibold text-gray-800 bg-transparent border-b-2 border-gray-200 focus:border-amber-500 focus:outline-hidden w-full p-1 mb-3"
                            />
                            <div className="flex flex-wrap gap-2">
                                {ALLERGIES_LIST.map((allergy, j) => (
                                    <Button
                                        key={j}
                                        onClick={() => handleAllergyToggle(i, allergy)}
                                        styleType={person.allergies.includes(allergy) ? "primary" : "outline"}
                                        className="max-w-fit"
                                    >
                                        {allergy}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dietary Preferences */}
            <div className="mb-8 p-6 border rounded-lg bg-gray-50/50">
                <span className="block text-gray-700 font-medium mb-2">Dietary Preferences</span>
                <div className="flex flex-wrap gap-2">
                    {["Vegetarian", "Vegan", "Pescatarian", "Keto", "Paleo", "Gluten-Free", "No Preference"].map((pref, i) => (
                        <Button key={i} styleType={dietaryPreferences.includes(pref) ? "primary" : "outline"} className={"max-w-fit"} onClick={() => handleDietaryToggle(pref)}>
                            {pref}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Weekly Budget */}
            <div className="mb-8 p-6 border rounded-lg bg-gray-50/50">
                <span className="block text-gray-700 font-medium mb-2">Weekly Budget</span>
                <div className="flex flex-wrap gap-2">
                    {["Low", "Medium", "High", "No Limit"].map((b, i) => (
                        <Button key={i} styleType={budget === b ? "primary" : "outline"} className={"max-w-fit"} onClick={() => setBudget(b)}>
                            {b}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Tracking Preferences */}
            <div className="mb-8 p-6 border rounded-lg bg-gray-50/50">
                <span className="block text-gray-700 font-medium mb-2">Tracking Preferences</span>
                <div className="flex flex-wrap gap-2">
                    {["Track Calories", "Track Macros", "Track Ingredients", "No Tracking"].map((tracking, i) => (
                        <Button key={i} styleType={trackingPreference === tracking ? "primary" : "outline"} className={"max-w-fit"} onClick={() => setTrackingPreference(tracking)}>
                            {tracking}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Cultural Cuisine */}
            <div className="mb-8 p-6 border rounded-lg bg-gray-50/50">
                <span className="block text-gray-700 font-medium mb-2">Cultural Cuisine</span>
                <Field value={culturalCuisine} onChange={(e) => setCulturalCuisine(e.target.value)} placeholder="e.g., Italian, Japanese, Mediterranean" />
            </div>

            {/* Unit of Measurement */}
            <div className="mb-8 p-6 border rounded-lg bg-gray-50/50">
                <span className="block text-gray-700 font-medium mb-2">Unit of Measurement</span>
                <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-4 space-y-4 md:space-y-0">
                    <span className="flex items-center">
                        <input type="radio" value="metric" checked={unitOfMeasurement === "metric"} onChange={(e) => setUnitOfMeasurement(e.target.value)} />
                        <span className="ml-2">Metric (g, L)</span>
                    </span>
                    <span className="flex items-center">
                        <input type="radio" value="imperial" checked={unitOfMeasurement === "imperial"} onChange={(e) => setUnitOfMeasurement(e.target.value)} />
                        <span className="ml-2">Imperial (oz, lbs)</span>
                    </span>
                </div>
            </div>

            {status.message && (
                <div className={`p-4 mb-4 rounded-lg font-medium text-sm ${status.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"}`}>
                    {status.message}
                </div>
            )}

            <Button styleType="primary" onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Preferences"}
            </Button>
        </>
    );
};

export default MealPreferencesForm;