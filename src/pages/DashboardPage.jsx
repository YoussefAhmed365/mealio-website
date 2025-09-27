// Components & Libraries
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import Navbar from '../components/shared/Navbar'
import TopNavbar from '../components/shared/TopNavbar'
import SearchField from '../components/shared/Search'
import Button from '../components/shared/Button'

//Images
import MainSectionBG from '../assets/images/dashboard-bg.webp'
import Bread from '../assets/images/food/red-bread-jam.jpg'
import Chicken from '../assets/images/food/grilled-chicken.jpg'
import Salad from '../assets/images/food/cashew-nut-salad.jpg'

// Shopping List Images
import Milk from '../assets/images/shop-items/milk.jpg'
import Butter from '../assets/images/shop-items/butter.jpg'
import Egg from '../assets/images/shop-items/egg.jpg'
import Oil from '../assets/images/shop-items/oil.jpg'

// Icons
import StopwatchIcon from '../assets/icons/Stopwatch'
import { FireIcon, PencilSquareIcon as EditSolid, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { PencilSquareIcon as EditOutline } from '@heroicons/react/24/outline'

const Dashboard = () => {

    // Track which row is hovered
    const [hoveredRow, setHoveredRow] = useState(null);
    const rows = [
        {
            day: 'Saturday',
            meal: 'Oatmeal with berries',
            ingredients: '1/2kg Meat, Spagitte, 2 Spones of Salt, Sunflower Oil',
            calories: '250K',
            time: '30m'
        },
        {
            day: 'Sunday',
            meal: 'Chicken Salad',
            ingredients: '1/2kg Meat, Spagitte, 2 Spones of Salt, Sunflower Oil',
            calories: '300K',
            time: '45m'
        },
        {
            day: 'Monday',
            meal: 'Salmon with roasted vegetables',
            ingredients: '1/2kg Meat, Spagitte, 2 Spones of Salt, Sunflower Oil',
            calories: '400K',
            time: '60m'
        },
        {
            day: 'Tuesday',
            meal: 'Lentil Soup',
            ingredients: '1/2kg Meat, Spagitte, 2 Spones of Salt, Sunflower Oil',
            calories: '200K',
            time: '35m'
        },
        {
            day: 'Wednesday',
            meal: 'Beef Stir-fry',
            ingredients: '1/2kg Meat, Spagitte, 2 Spones of Salt, Sunflower Oil',
            calories: '450K',
            time: '50m'
        },
        {
            day: 'Thursday',
            meal: 'Vegetable Curry',
            ingredients: '1/2kg Meat, Spagitte, 2 Spones of Salt, Sunflower Oil',
            calories: '320K',
            time: '40m'
        },
        {
            day: 'Friday',
            meal: 'Pizza Night',
            ingredients: '1/2kg Meat, Spagitte, 2 Spones of Salt, Sunflower Oil',
            calories: '600K',
            time: '70m'
        },
    ];

    // State
    const [ingredients, setIngredients] = useState([
        { id: 1, name: "Tomato", category: "Vegetables", amount: "3 pcs" },
        { id: 2, name: "Chicken Breast", category: "Meat", amount: "500 g" },
        { id: 3, name: "Salt", category: "Spices", amount: "200 g" },
    ]);

    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm] = useState("");

    // Open modal for new ingredient
    const handleAddIngredient = () => {
        setSelectedIngredient({ name: "", category: "Uncategorized", amount: "" });
        setIsModalOpen(true);
    };

    // Open modal for edit
    const handleEditIngredient = (ingredient) => {
        setSelectedIngredient(ingredient);
        setIsModalOpen(true);
    };

    // Save (add or update)
    const handleSaveIngredient = (e) => {
        e.preventDefault();
        if (selectedIngredient.id) {
            setIngredients(
                ingredients.map((ing) =>
                    ing.id === selectedIngredient.id ? selectedIngredient : ing
                )
            );
        } else {
            setIngredients([
                ...ingredients,
                { ...selectedIngredient, id: Date.now() },
            ]);
        }
        setIsModalOpen(false);
        setSelectedIngredient(null);
    };

    // Delete
    const handleDeleteIngredient = (id) => {
        setIngredients(ingredients.filter((ing) => ing.id !== id));
    };

    // Filter
    const filteredIngredients = ingredients.filter((ing) =>
        ing.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='flex justify-start'>
            <Navbar />
            <div className='w-full flex flex-col justify-start items-center'>
                <TopNavbar />
                <div className='w-full grid grid-cols-1 xl:grid-cols-7 gap-4 my-4 px-4'>

                    {/* Main */}
                    <div className='md:col-span-5 space-y-5'>

                        {/* Header */}
                        <div className='rounded-xl py-10 px-6 md:px-14 text-center md:text-start bg-gradient-to-l from-amber-500 to-amber-200 shadow-lg relative overflow-hidden'>
                            <h1 className='text-4xl font-bold text-amber-800 md:w-1/2 mb-4'>Start Generating Your Meals of The Week.</h1>
                            <p className='text-gray-600 md:w-3/4 mb-6 font-medium'>Discover the magic of effortless meal planning! Generate delicious, personalized meal plans tailored to your preferences with just one click.</p>
                            <Link key={"Generate"} to={"/generate-meal-ai"}><Button className={"text-base max-w-fit"}>Generate With AI</Button></Link>
                            <img src={MainSectionBG} alt='Header Background' className='absolute top-0 md:-top-[24%] right-0 h-full md:h-96 opacity-60 object-cover' />
                        </div>

                        {/* Food Widgets */}
                        <div className='w-full grid grid-cols-1 md:grid-cols-9 gap-4 h-fit'>
                            <div className='col-span-3 shadow-sm rounded-xl h-full p-4 bg-yellow-100 space-y-2'>
                                <div className='flex justify-start items-center space-x-4'>

                                    {/* Day Date */}
                                    <div className='border-2 p-2 border-amber-600 rounded-t-full rounded-b-full flex flex-col justify-center items-center'>
                                        <h2 className='text-lg font-semibold text-amber-600 leading-5'>13</h2>
                                        <p className='text-sm font-semibold text-amber-600'>Mon</p>
                                    </div>

                                    {/* Title */}
                                    <h1 className='text-2xl font-semibold text-amber-600'>Your Meal Today</h1>
                                </div>

                                {/* Card Content */}
                                <h2 className='text-lg font-semibold text-gray-700'>Spagitte with Meat Balls</h2>
                                <div className='today-meal-box p-2 text-gray-600 h-24 overflow-hidden'>
                                    <p>
                                        <b>Ingredients</b>
                                        <br />
                                    </p>
                                    <ul className='list-disc ml-5'>
                                        <li>1/2kg Meat</li>
                                        <li>Spagitte</li>
                                        <li>2 Spones of Salt</li>
                                        <li>Sunflower Oil</li>
                                    </ul>
                                    <br />
                                    <b>Preparation</b>
                                    <br />
                                    <ol className='list-decimal ml-5'>
                                        <li>Boil the spagitte for 10 minutes</li>
                                        <li>Mix the meat with the salt and make small balls</li>
                                        <li>Fry the meat balls until it gets brown</li>
                                        <li>Mix them all together and serve it hot</li>
                                    </ol>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='flex justify-start items-center space-x-1 text-gray-600'>
                                        <StopwatchIcon />
                                        <span className='font-medium text-sm'>30m</span>
                                        <FireIcon className='size-6' />
                                        <span className='font-medium text-sm'>50k</span>
                                    </div>
                                    <Button styleType={"outline"} className={"px-2 py-[6px] border-2 rounded-full max-w-fit"}>Details</Button>
                                </div>
                            </div>
                            <div className='col-span-3 md:col-span-2 shadow-sm rounded-xl h-full p-4 bg-red-200 flex flex-col justify-between items-stretch'>
                                <h1 className='text-xl font-semibold text-gray-600 text-center'>Red Bread & Jam</h1>
                                <div className='flex justify-center items-center w-full'>
                                    <div className='w-32 h-32 rounded-full border-4 border-amber-600/40 overflow-hidden flex justify-center items-center bg-no-repeat bg-center bg-cover' style={{ backgroundImage: `url(${Bread})` }}></div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <Button styleType={"outline"} className={"px-[6px] py-[6px] border-2 rounded-full max-w-fit"}>See recipe</Button>
                                    <div className='text-gray-600'>
                                        <div className='flex justify-start items-center'>
                                            <StopwatchIcon size={20} />
                                            <span className='font-medium text-sm'>6m</span>
                                        </div>
                                        <div className='flex justify-start items-center'>
                                            <FireIcon className='size-5' />
                                            <span className='font-medium text-sm'>250cal</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-3 md:col-span-2 shadow-sm rounded-xl h-full p-4 bg-green-200 flex flex-col justify-between items-stretch'>
                                <h1 className='text-xl font-semibold text-gray-600 text-center'>Grilled Chicken</h1>
                                <div className='flex justify-center items-center w-full'>
                                    <div className='w-32 h-32 rounded-full border-4 border-amber-600/40 overflow-hidden flex justify-center items-center bg-no-repeat bg-center bg-cover' style={{ backgroundImage: `url(${Chicken})` }}></div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <Button styleType={"outline"} className={"px-[6px] py-[6px] border-2 rounded-full max-w-fit"}>See recipe</Button>
                                    <div className='text-gray-600'>
                                        <div className='flex justify-start items-center'>
                                            <StopwatchIcon size={20} />
                                            <span className='font-medium text-sm'>~1h</span>
                                        </div>
                                        <div className='flex justify-start items-center'>
                                            <FireIcon className='size-5' />
                                            <span className='font-medium text-sm'>30K</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-3 md:col-span-2 shadow-sm rounded-xl h-full p-4 bg-blue-200 flex flex-col justify-between items-stretch'>
                                <h1 className='text-xl font-semibold text-gray-600 text-center'>Cashew Nut Salad</h1>
                                <div className='flex justify-center items-center w-full'>
                                    <div className='w-32 h-32 rounded-full border-4 border-amber-600/40 overflow-hidden flex justify-center items-center bg-no-repeat bg-center bg-cover' style={{ backgroundImage: `url(${Salad})` }}></div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <Button styleType={"outline"} className={"px-[6px] py-[6px] border-2 rounded-full max-w-fit"}>See recipe</Button>
                                    <div className='text-gray-600'>
                                        <div className='flex justify-start items-center'>
                                            <StopwatchIcon size={20} />
                                            <span className='font-medium text-sm'>15m</span>
                                        </div>
                                        <div className='flex justify-start items-center'>
                                            <FireIcon className='size-5' />
                                            <span className='font-medium text-sm'>150cal</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Week Plan Table */}
                        <div className='w-full rounded-xl py-4 space-y-4'>
                            <h1 className='text-2xl font-semibold text-gray-700'>Your Meal Plan This Week</h1>
                            <div className='overflow-x-auto'>
                                <table className="min-w-full divide-y divide-amber-600">
                                    <thead className="bg-amber-600">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Day</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Meal</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Ingredients</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Calories</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Time</th>
                                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-300">
                                        {rows.map((rowData, index) => (
                                            <tr
                                                key={index}
                                                className='even:bg-gray-200 odd:bg-white hover:bg-gray-300'
                                                onMouseEnter={() => setHoveredRow(index)}
                                                onMouseLeave={() => setHoveredRow(null)}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{rowData.day}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rowData.meal}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rowData.ingredients}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rowData.calories}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rowData.time}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-amber-600 hover:text-amber-900">
                                                        {hoveredRow === index ? <EditSolid className='size-6' /> : <EditOutline className='size-6' />}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Add & Manage Available Ingridents */}
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <h1 className="text-3xl font-bold text-gray-800">My Ingredients</h1>
                            <div className="flex flex-col md:flex-row items-center space-x-2 space-y-4 md:space-y-0">
                                <SearchField containerClassName={"w-full py-3"} />
                                <Button
                                    onClick={handleAddIngredient}
                                    className="flex items-center space-x-2 min-w-auto"
                                >
                                    <PlusIcon className="size-5" />
                                    <span>Add Ingredient</span>
                                </Button>
                            </div>
                        </div>

                        {/* Ingredient List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredIngredients.map((ing) => (
                                <div
                                    key={ing.id}
                                    className="bg-white rounded-lg shadow-sm p-4 flex flex-col justify-between"
                                >
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">{ing.name}</h2>
                                        <p className="text-sm text-gray-500">{ing.category}</p>
                                        <p className="text-gray-700 mt-1">{ing.amount}</p>
                                    </div>
                                    <div className="flex space-x-2 mt-4">
                                        <Button
                                            onClick={() => handleEditIngredient(ing)}
                                            className="flex-1 flex items-center justify-center space-x-1"
                                        >
                                            <PencilIcon className="size-4" />
                                            <span>Edit</span>
                                        </Button>
                                        <Button
                                            styleType="danger"
                                            onClick={() => handleDeleteIngredient(ing.id)}
                                            className="flex-1 flex items-center justify-center space-x-1 transition duration-200"
                                        >
                                            <TrashIcon className="size-4" />
                                            <span>Delete</span>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Modal */}
                        <Dialog
                            open={isModalOpen}
                            onClose={() => {
                                setIsModalOpen(false);
                                setSelectedIngredient(null);
                            }}
                            className="relative z-50"
                        >
                            <DialogBackdrop className="fixed inset-0 bg-black/50" />
                            <div className="fixed inset-0 flex items-center justify-center p-4">
                                <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                                    <DialogTitle className="text-2xl font-bold text-gray-800 mb-4">
                                        {selectedIngredient?.id ? "Edit Ingredient" : "Add Ingredient"}
                                    </DialogTitle>

                                    <form onSubmit={handleSaveIngredient} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                value={selectedIngredient?.name || ""}
                                                onChange={(e) =>
                                                    setSelectedIngredient({
                                                        ...selectedIngredient,
                                                        name: e.target.value,
                                                    })
                                                }
                                                required
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Category
                                            </label>
                                            <select
                                                value={selectedIngredient?.category || "Uncategorized"}
                                                onChange={(e) =>
                                                    setSelectedIngredient({
                                                        ...selectedIngredient,
                                                        category: e.target.value,
                                                    })
                                                }
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            >
                                                <option>Vegetables</option>
                                                <option>Fruits</option>
                                                <option>Meat</option>
                                                <option>Dairy</option>
                                                <option>Grains</option>
                                                <option>Spices</option>
                                                <option>Uncategorized</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Amount
                                            </label>
                                            <input
                                                type="text"
                                                value={selectedIngredient?.amount || ""}
                                                onChange={(e) =>
                                                    setSelectedIngredient({
                                                        ...selectedIngredient,
                                                        amount: e.target.value,
                                                    })
                                                }
                                                placeholder="e.g., 2 cups, 500 g, 3 pcs"
                                                required
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            />
                                        </div>

                                        <div className="flex space-x-2 pt-2">
                                            <Button type="submit" className="flex-1">
                                                Save
                                            </Button>
                                            <Button
                                                type="button"
                                                styleType="outline"
                                                onClick={() => {
                                                    setIsModalOpen(false);
                                                    setSelectedIngredient(null);
                                                }}
                                                className="flex-1"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                </DialogPanel>
                            </div>
                        </Dialog>
                    </div>

                    {/* Side */}
                    <div className='md:col-span-2 space-y-5'>

                        {/* Shopping List */}
                        <div className='rounded-xl p-4 bg-white shadow-lg space-y-4'>
                            <div>
                                <h1 className='text-2xl font-bold text-red-500'>Shopping List</h1>
                                <p className='text-gray-600'>Missing items added automatically from your meal plan</p>
                            </div>
                            <div className='flex flex-col justify-center items-center'>

                                {/* List Items */}
                                <div className='w-full flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 my-1 py-2 border-b border-b-gray-300 last:border-none px-3'>
                                    <div className='flex justify-start items-center space-x-4'>
                                        <div className='w-14 h-14 rounded-md overflow-hidden flex justify-center items-center'>
                                            <img src={Milk} alt='Item 1' className='w-full' />
                                        </div>
                                        <div>
                                            <h2 className='text-base font-medium'>Milk</h2>
                                            <p className='text-gray-600'>1L</p>
                                        </div>
                                    </div>

                                    {/* Field to enter amount with accept button */}
                                    <div className='flex justify-center items-center space-x-2'>
                                        <input type='number' className='w-full md:w-24 p-2 border border-gray-300 rounded-md text-center' placeholder='Amount' />
                                        <Button styleType={"danger"} className={"px-[1rem] py-2 text-sm"}>Add</Button>
                                    </div>
                                </div>
                                <div className='w-full flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 my-1 py-2 border-b border-b-gray-300 last:border-none px-3'>
                                    <div className='flex justify-start items-center space-x-4'>
                                        <div className='w-14 h-14 rounded-md overflow-hidden flex justify-center items-center'>
                                            <img src={Oil} alt='Item 2' className='w-full' />
                                        </div>
                                        <div>
                                            <h2 className='text-base font-medium'>Oil</h2>
                                            <p className='text-gray-600'>50mL</p>
                                        </div>
                                    </div>

                                    {/* Field to enter amount with accept button */}
                                    <div className='flex justify-center items-center space-x-2'>
                                        <input type='number' className='w-full md:w-24 p-2 border border-gray-300 rounded-md text-center' placeholder='Amount' />
                                        <Button styleType={"danger"} className={"px-[1rem] py-2 text-sm"}>Add</Button>
                                    </div>
                                </div>
                                <div className='w-full flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 my-1 py-2 border-b border-b-gray-300 last:border-none px-3'>
                                    <div className='flex justify-start items-center space-x-4'>
                                        <div className='w-14 h-14 rounded-md overflow-hidden flex justify-center items-center'>
                                            <img src={Egg} alt='Item 3' className='w-full' />
                                        </div>
                                        <div>
                                            <h2 className='text-base font-medium'>Egg</h2>
                                            <p className='text-gray-600'>3 eggs</p>
                                        </div>
                                    </div>

                                    {/* Field to enter amount with accept button */}
                                    <div className='flex justify-center items-center space-x-2'>
                                        <input type='number' className='w-full md:w-24 p-2 border border-gray-300 rounded-md text-center' placeholder='Amount' />
                                        <Button styleType={"danger"} className={"px-[1rem] py-2 text-sm"}>Add</Button>
                                    </div>
                                </div>
                                <div className='w-full flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 my-1 py-2 border-b border-b-gray-300 last:border-none px-3'>
                                    <div className='flex justify-start items-center space-x-4'>
                                        <div className='w-14 h-14 rounded-md overflow-hidden flex justify-center items-center'>
                                            <img src={Butter} alt='Item 4' className='w-full' />
                                        </div>
                                        <div>
                                            <h2 className='text-base font-medium'>Butter</h2>
                                            <p className='text-gray-600'>100g</p>
                                        </div>
                                    </div>

                                    {/* Field to enter amount with accept button */}
                                    <div className='flex justify-center items-center space-x-2'>
                                        <input type='number' className='w-full md:w-24 p-2 border border-gray-300 rounded-md text-center' placeholder='Amount' />
                                        <Button styleType={"danger"} className={"px-[1rem] py-2 text-sm"}>Add</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Budget */}
                        <div className='rounded-xl p-4 bg-white shadow-lg space-y-4'>
                            <div>
                                <h1 className='text-2xl font-bold text-green-500'>Budget</h1>
                                <p className='text-gray-600'>Track your spending and save money</p>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='w-full flex justify-between items-center my-1 py-2 border-b border-b-gray-300 last:border-none px-3'>
                                    <h2 className='text-base font-medium'>Weekly Budget</h2>
                                    <p className='text-gray-600'>$100</p>
                                </div>
                                <div className='w-full flex justify-between items-center my-1 py-2 border-b border-b-gray-300 last:border-none px-3'>
                                    <h2 className='text-base font-medium'>Spent This Week</h2>
                                    <p className='text-red-500'>$75</p>
                                </div>
                                <div className='w-full flex justify-between items-center my-1 py-2 border-b border-b-gray-300 last:border-none px-3'>
                                    <h2 className='text-base font-medium'>Remaining</h2>
                                    <p className='text-green-500'>$25</p>
                                </div>
                            </div>
                            <Button styleType={"success"}>Manage Budget</Button>
                        </div>

                        {/* Tracking */}
                        <div className='rounded-xl p-4 bg-white shadow-lg space-y-4'>
                            <div>
                                <h1 className='text-2xl font-bold text-blue-600'>Tracking</h1>
                                <p className='text-gray-600'>Monitor your nutritional intake</p>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='w-full flex justify-between items-center my-1 py-2 border-b border-b-gray-300 last:border-none px-3'>
                                    <h2 className='text-base font-medium'>Calories Today</h2>
                                    <p className='text-gray-600'>1800 / 2200</p>
                                </div>
                                <div className='w-full flex justify-between items-center my-1 py-2 border-b border-b-gray-300 last:border-none px-3'>
                                    <h2 className='text-base font-medium'>Protein Today</h2>
                                    <p className='text-gray-600'>70g / 100g</p>
                                </div>
                                <div className='w-full flex justify-between items-center my-1 py-2 border-b border-b-gray-300 last:border-none px-3'>
                                    <h2 className='text-base font-medium'>Carbs Today</h2>
                                    <p className='text-gray-600'>200g / 250g</p>
                                </div>
                                <div className='w-full flex justify-between items-center my-1 py-2 border-b border-b-gray-300 last:border-none px-3'>
                                    <h2 className='text-base font-medium'>Fats Today</h2>
                                    <p className='text-gray-600'>60g / 70g</p>
                                </div>
                            </div>
                            <Button styleType={"blue"}>View Details</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;