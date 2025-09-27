import { useState, useEffect } from "react"
import Button from "../shared/Button"
import Field from "../shared/Field"

const ALLERGIES_LIST = ["Gluten", "Dairy", "Peanuts", "Shellfish", "Soy", "Eggs", "Tree Nuts", "Fish"];

const MealPreferencesForm = () => {
    const [numPeople, setNumPeople] = useState(1);
    const [peopleAllergies, setPeopleAllergies] = useState([]);
    const [dietaryPreferences, setDietaryPreferences] = useState(["No Preference"]);
    const [trackingPreference, setTrackingPreference] = useState("No Tracking");
    const [culturalCuisine, setCulturalCuisine] = useState("");
    const [unitOfMeasurement, setUnitOfMeasurement] = useState("metric");

    useEffect(() => {
        setPeopleAllergies((current) =>
            Array.from({ length: numPeople }, (_, i) => current[i] || { name: `Person ${i + 1}`, allergies: [] })
        );
    }, [numPeople]);

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

    const handleSave = () => {
        console.log("Saving meal preferences", { numPeople, peopleAllergies, dietaryPreferences, trackingPreference, culturalCuisine, unitOfMeasurement });
    };

    return (
        <>
            {/* Persons */}
            <div className="mb-6 flex flex-col justify-start items-center">
                <label className="block text-gray-700 font-medium mb-4">Family Persons</label>
                <div className="flex justify-start items-center gap-6">
                    <button onClick={() => handleUpdate(-1)} className="w-10 h-10 flex items-center justify-center text-2xl font-bold bg-gray-200 text-gray-600 rounded-full">-</button>
                    <span className="text-4xl font-bold text-amber-600">{numPeople}</span>
                    <button onClick={() => handleUpdate(1)} className="w-10 h-10 flex items-center justify-center text-2xl font-bold bg-gray-200 text-gray-600 rounded-full">+</button>
                </div>
            </div>

            {/* Allergies */}
            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Allergies</label>
                <div className="space-y-5">
                    {peopleAllergies.map((person, i) => (
                        <div key={i} className="p-4 border rounded-lg bg-gray-50/50">
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
                <label className="block text-gray-700 font-medium mb-2">Dietary Preferences</label>
                <div className="flex flex-wrap gap-2">
                    {["Vegetarian", "Vegan", "Pescatarian", "Keto", "Paleo", "Gluten-Free", "No Preference"].map((pref, i) => (
                        <Button key={i} styleType={dietaryPreferences.includes(pref) ? "primary" : "outline"} className={"max-w-fit"} onClick={() => handleDietaryToggle(pref)}>
                            {pref}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Tracking Preferences */}
            <div className="mb-8 p-6 border rounded-lg bg-gray-50/50">
                <label className="block text-gray-700 font-medium mb-2">Tracking Preferences</label>
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
                <label className="block text-gray-700 font-medium mb-2">Cultural Cuisine</label>
                <Field value={culturalCuisine} onChange={(e) => setCulturalCuisine(e.target.value)} placeholder="e.g., Italian, Japanese, Mediterranean" />
            </div>

            {/* Unit of Measurement */}
            <div className="mb-8 p-6 border rounded-lg bg-gray-50/50">
                <label className="block text-gray-700 font-medium mb-2">Unit of Measurement</label>
                <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-4 space-y-4 md:space-y-0">
                    <label className="flex items-center">
                        <input type="radio" value="metric" checked={unitOfMeasurement === "metric"} onChange={(e) => setUnitOfMeasurement(e.target.value)} />
                        <span className="ml-2">Metric (g, L)</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" value="imperial" checked={unitOfMeasurement === "imperial"} onChange={(e) => setUnitOfMeasurement(e.target.value)} />
                        <span className="ml-2">Imperial (oz, lbs)</span>
                    </label>
                </div>
            </div>

            <Button styleType="primary" onClick={handleSave}>Save Preferences</Button>
        </>
    );
};

export default MealPreferencesForm;