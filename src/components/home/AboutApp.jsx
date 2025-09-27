import Image1 from '../../assets/images/3215.webp'
import Image2 from '../../assets/images/2589.webp'
import Image3 from '../../assets/images/3134.webp'
import Image4 from '../../assets/images/45264.webp'

const AboutApp = () => {
    return (
        <div className="flex flex-col md:flex-row items-stretch justify-start md:justify-center gap-20 mt-32 min-h-96">
            <div className="px-8 md:pl-28 w-full md:w-3/5 flex flex-col justify-center">
                <span className="text-2xl font-900 text-amber-500" style={{ fontFamily: "Winslow-regular" }}>Plan Your Meals</span>
                <br></br>
                <h1 className="font-semibold text-6xl text-amber-700 mb-3">Get Your Ideas Ready In Just A Minute With Generative AI!</h1>
                <div className="bg-amber-700 w-24 h-1 rounded-full mb-2"></div>
                <div className="bg-amber-700 w-20 h-1 rounded-full mb-6"></div>
                <p className="text-gray-700 text-lg font-medium">Meal.io simplifies the process of planning your daily and weekly meals. Our AI-powered assistant, "Mealio," creates customized plans based on your dietary restrictions, budget, available ingredients, and personal preferences. Get innovative recipes, detailed preparation steps, and an automatically generated shopping list, all in one place.</p>
            </div>
            <div className="grid grid-cols-2 gap-5 w-full md:w-2/5 h-96 md:h-auto pl-8 md:pl-0">
                <span className="w-full h-full rounded-2xl bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${Image1})` }}></span>
                <div className="grid grid-rows-3 gap-5">
                    <span className="min-w-full h-full rounded-l-2xl bg-fit bg-no-repeat bg-center" style={{ backgroundImage: `url(${Image2})` }}></span>
                    <span className="min-w-full h-full rounded-l-2xl bg-fit bg-no-repeat bg-center" style={{ backgroundImage: `url(${Image3})` }}></span>
                    <span className="min-w-full h-full rounded-l-2xl bg-fit bg-no-repeat bg-center" style={{ backgroundImage: `url(${Image4})` }}></span>
                </div>
            </div>
        </div>
    );
};

export default AboutApp;