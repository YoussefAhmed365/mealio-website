// Components & Libraries
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from "../components/shared/Navbar"
import TopNavbar from '../components/shared/TopNavbar'
import Button from '../components/shared/Button'

// Icons
import { FireIcon, ArrowPathIcon, PencilSquareIcon, DocumentTextIcon } from '@heroicons/react/24/solid'
import StopwatchIcon from '../assets/icons/Stopwatch'

// Mock Images (replace with dynamic ones)
import Oatmeal from '../assets/images/food/oatmeal.jpg'
import ChickenSalad from '../assets/images/food/cashew-nut-salad.jpg'
import Salmon from '../assets/images/food/salmon.jpg'
import LentilSoup from '../assets/images/food/lentil-soup.jpg'
import BeefStirFry from '../assets/images/food/beef-stir-fry.jpg'
import VegCurry from '../assets/images/food/veg-curry.jpg'
import Pizza from '../assets/images/food/pizza.jpg'


const PlansPage = () => {
    // Mock data for the weekly meal plan. This would typically come from an API.
    const [mealPlan] = useState([
        {
            day: 'Monday',
            meals: {
                breakfast: { name: 'Oatmeal with Berries', calories: 250, time: '10m', image: Oatmeal },
                lunch: { name: 'Chicken Salad', calories: 350, time: '15m', image: ChickenSalad },
                dinner: { name: 'Salmon with Roasted Vegetables', calories: 500, time: '30m', image: Salmon },
            }
        },
        {
            day: 'Tuesday',
            meals: {
                breakfast: { name: 'Scrambled Eggs', calories: 300, time: '10m', image: Oatmeal },
                lunch: { name: 'Lentil Soup', calories: 300, time: '20m', image: LentilSoup },
                dinner: { name: 'Beef Stir-fry', calories: 550, time: '25m', image: BeefStirFry },
            }
        },
        {
            day: 'Wednesday',
            meals: {
                breakfast: { name: 'Greek Yogurt', calories: 200, time: '5m', image: Oatmeal },
                lunch: { name: 'Leftover Beef Stir-fry', calories: 550, time: '5m', image: BeefStirFry },
                dinner: { name: 'Vegetable Curry', calories: 450, time: '35m', image: VegCurry },
            }
        },
        {
            day: 'Thursday',
            meals: {
                breakfast: { name: 'Oatmeal with Berries', calories: 250, time: '10m', image: Oatmeal },
                lunch: { name: 'Chicken Salad', calories: 350, time: '15m', image: ChickenSalad },
                dinner: { name: 'Salmon with Roasted Vegetables', calories: 500, time: '30m', image: Salmon },
            }
        },
        {
            day: 'Friday',
            meals: {
                breakfast: { name: 'Scrambled Eggs', calories: 300, time: '10m', image: Oatmeal },
                lunch: { name: 'Lentil Soup', calories: 300, time: '20m', image: LentilSoup },
                dinner: { name: 'Pizza Night', calories: 700, time: '20m', image: Pizza },
            }
        },
        // ... Add data for Saturday and Sunday
    ]);

    const handleEdit = (day, mealType) => {
        console.log(`Editing ${mealType} for ${day}`);
        // Add logic to open an edit modal
    };

    const handleReplace = (day, mealType) => {
        console.log(`Replacing ${mealType} for ${day}`);
        // Add logic to open a replacement modal (manual or AI)
    };

    const MealCard = ({ day, mealType, meal }) => (
        <div className='bg-white rounded-lg shadow-sm p-3 space-y-2'>
            <div className='flex justify-between items-start'>
                <div>
                    <p className='text-xs font-semibold text-gray-500 uppercase'>{mealType}</p>
                    <h3 className='font-bold text-gray-800'>{meal.name}</h3>
                </div>
                <img src={meal.image} alt={meal.name} className='w-16 h-16 rounded-md object-cover' />
            </div>
            <div className='flex justify-between items-center text-sm text-gray-600'>
                <div className='flex items-center space-x-2'>
                    <div className='flex items-center'><FireIcon className='size-4 text-red-500 mr-1' /> {meal.calories}kcal</div>
                    <div className='flex items-center'><StopwatchIcon size={16} /> {meal.time}</div>
                </div>
                <div className='flex items-center space-x-2'>
                    <button onClick={() => handleEdit(day, mealType)} title="Edit Meal">
                        <PencilSquareIcon className='size-5 text-gray-400 hover:text-amber-600' />
                    </button>
                    <button onClick={() => handleReplace(day, mealType)} title="Replace Meal">
                        <ArrowPathIcon className='size-5 text-gray-400 hover:text-amber-600' />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className='flex justify-start'>
            <Navbar />
            <div className='w-full flex flex-col justify-start items-center'>
                <TopNavbar />
                <div className='w-full grid grid-cols-1 xl:grid-cols-7 gap-4 my-4 px-4'>

                    {/* Main */}
                    <div className='md:col-span-5 space-y-5'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-3xl font-bold text-gray-800'>Your Weekly Meal Plan</h1>
                            <Button className={"max-w-fit"}>Generate New Plan</Button>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {mealPlan.map(plan => (
                                <div key={plan.day} className='bg-gray-100 p-3 rounded-xl space-y-3'>
                                    <h2 className='text-xl font-semibold text-center text-amber-700'>{plan.day}</h2>
                                    <MealCard day={plan.day} mealType="Breakfast" meal={plan.meals.breakfast} />
                                    <MealCard day={plan.day} mealType="Lunch" meal={plan.meals.lunch} />
                                    <MealCard day={plan.day} mealType="Dinner" meal={plan.meals.dinner} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Side */}
                    <div className='md:col-span-2 space-y-5'>
                        {/* Weekly Nutrition Summary */}
                        <div className='rounded-xl p-4 bg-white shadow-lg space-y-3'>
                            <div>
                                <h1 className='text-2xl font-bold text-green-600'>Weekly Summary</h1>
                                <p className='text-gray-600'>Your estimated nutritional overview.</p>
                            </div>
                            <div className='space-y-2 text-sm'>
                                <div className='flex justify-between items-center'><span className='font-medium text-gray-700'>Avg. Daily Calories:</span> <span className='font-bold text-gray-800'>1850 kcal</span></div>
                                <div className='flex justify-between items-center'><span className='font-medium text-gray-700'>Avg. Daily Protein:</span> <span className='font-bold text-gray-800'>95 g</span></div>
                                <div className='flex justify-between items-center'><span className='font-medium text-gray-700'>Avg. Daily Carbs:</span> <span className='font-bold text-gray-800'>210 g</span></div>
                                <div className='flex justify-between items-center'><span className='font-medium text-gray-700'>Avg. Daily Fats:</span> <span className='font-bold text-gray-800'>70 g</span></div>
                            </div>
                            <Link to="/analysis">
                                <Button className={"bg-green-500 hover:bg-green-700 mt-3"}>View Detailed Report</Button>
                            </Link>
                        </div>

                        {/* Shopping List */}
                        <div className='rounded-xl p-4 bg-white shadow-lg space-y-3'>
                            <div>
                                <h1 className='text-2xl font-bold text-red-500'>Shopping List</h1>
                                <p className='text-gray-600'>Generated from your meal plan.</p>
                            </div>
                            <ul className='space-y-2 text-sm list-disc list-inside'>
                                <li>Oats (1)</li>
                                <li>Mixed Berries (2 cups)</li>
                                <li>Chicken Breast (2 lbs)</li>
                                <li>Mixed Greens (1 bag)</li>
                                <li>Salmon Fillet (2)</li>
                                <li>Broccoli (1 head)</li>
                                <li>Lentils (1 can)</li>
                                <li>Beef Strips (1 lb)</li>
                            </ul>
                            <Button styleType='outline' className={"flex items-center justify-center space-x-2"}>
                                <DocumentTextIcon className='size-5' />
                                <span>Export List</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlansPage;