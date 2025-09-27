import SetPreferences from '../../assets/images/2589.webp'
import AskAI from '../../assets/images/3134.webp'
import MealReady from '../../assets/images/45264.webp'

const HowToUse = () => {
    const steps = [
        {
            number: 1,
            title: "Tell Us What You Like",
            subtitle: "Get Your Ideas Ready in Just a Minute With Generative AI!",
            description: "We take the guesswork out of meal planning by intelligently automating the process. Simply tell us what you're craving, and Meal.io's AI assistant \"Mealio\" handles the rest. Whether you're planning for yourself or a group, our system adapts meal plans based on your preferences, dietary restrictions, and calorie goals.",
            image: SetPreferences,
            reverse: false,
            bg: true,
        },
        {
            number: 2,
            title: "Set Your Preferences",
            subtitle: "Your Plan, Your Rules.",
            description: (
                <>
                    <h3 className="text-lg font-medium text-gray-700">Mealio tailors meal plans based on a variety of factors:</h3>
                    <ul className="list-disc list-inside mt-2 ml-4 space-y-2 text-gray-600">
                        <li><b>Dietary Preferences & Allergies:</b> Specify allergies, such as gluten sensitivity, or general dietary preferences to get a plan that's just right for you.</li>
                        <li><b>Budget:</b> On a tight budget? No problem. The AI can suggest affordable plans, like limiting meat to a maximum of two days a week.</li>
                        <li><b>Ingredients:</b> Have specific ingredients you need to use? Tell us what you have, and the AI will incorporate them into its suggestions.</li>
                        <li><b>Cultural Cuisine:</b> Explore meal plans based on specific cultural traditions from around the world.</li>
                        <li><b>Number of People:</b> Adjust meal quantities to serve the specified number of individuals, ensuring adequate portions.</li>
                    </ul>
                </>
            ),
            image: AskAI,
            reverse: true,
            bg: false,
        },
        {
            number: 3,
            title: "Get AI-Powered Ideas",
            subtitle: "Ask Our AI for Meal Ideas",
            description: "Mealio acts as your personal culinary assistant. Simply ask for a new plan, and the AI will provide comprehensive recipes with clear, step-by-step preparation instructions. Mealio can generate a full 7-day weekly meal plan or a single meal suggestion.",
            image: MealReady,
            reverse: false,
            bg: true,
        },
        {
            number: 4,
            title: "Your Personalized Plan is Here!",
            subtitle: "Tada! Your Meal Plan is Ready!",
            description: "The AI will generate a structured file with all the meal details, including the name, description, ingredients, and preparation steps. Our app will display this organized plan on your dashboard. If you decide to refuse a meal, the AI will replace only that item, keeping the rest of the plan intact. You can also save your favorite recipes and add missing ingredients to an automatic shopping list",
            image: AskAI,
            reverse: true,
            bg: false,
        },
    ];

    const Step = ({ number, title, subtitle, description, image, reverse, bg }) => (
        <div className={`w-full py-14 px-8 md:px-28 space-y-10 md:space-y-0 flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} justify-between items-center${bg ? " bg-amber-50" : ""}`}>
            <div className='w-full md:w-1/2'>
                <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-4 mb-4">
                    <span className="bg-gradient-to-r from-amber-600 to-amber-400 rounded-full w-10 h-10 flex items-center justify-center text-white text-lg font-bold border-4 border-slate-300">{number}</span>
                    <h1 className="font-bold text-3xl text-gray-900">{title}</h1>
                </div>
                <h2 className='text-xl font-semibold text-gray-800 mb-3'>{subtitle}</h2>
                {typeof description === "string" ? <p className="text-gray-600">{description}</p> : description}
            </div>

            <div
                className="w-full md:w-1/3 h-56 rounded-2xl bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url(${image})` }}
            ></div>
        </div>
    );

    return (
        <div className="mt-20">
            {steps.map((step, idx) => (
                <Step key={idx} {...step} />
            ))}
        </div>
    );
};

export default HowToUse;
