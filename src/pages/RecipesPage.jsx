// Components & Libraries
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Navbar from "../components/shared/Navbar"
import TopNavbar from '../components/shared/TopNavbar'
import Button from '../components/shared/Button'

// Icons
import { MagnifyingGlassIcon, PlusIcon, StarIcon, SparklesIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/solid'

// Mock Images
import Salmon from '../assets/images/food/salmon.jpg'
import VegCurry from '../assets/images/food/veg-curry.jpg'
import Pizza from '../assets/images/food/pizza.jpg'

const mockRecipes = [
    { id: 1, title: 'My Famous Pizza', image: Pizza, ingredients: ['Dough', 'Tomato Sauce', 'Cheese'], instructions: 'Bake it.', category: 'Dinner', isFavorite: true, source: 'user' },
    { id: 2, title: 'Spicy Vegetable Curry', image: VegCurry, ingredients: ['Mixed Veggies', 'Coconut Milk', 'Curry Paste'], instructions: 'Simmer everything.', category: 'Dinner', isFavorite: false, source: 'user' },
    { id: 3, title: 'AI: Quick Salmon Dish', image: Salmon, ingredients: ['Salmon Fillet', 'Lemon', 'Dill'], instructions: 'Grill salmon, squeeze lemon.', category: 'Lunch', isFavorite: false, source: 'ai' },
];


const RecipesPage = () => {
    const [recipes, setRecipes] = useState(mockRecipes);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    // State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Open handler
    const handleAddNewRecipe = () => {
        setSelectedRecipe({
            title: '',
            image: null,
            ingredients: [],
            instructions: '',
            category: 'Uncategorized',
            isFavorite: false,
            source: 'user',
        });
        setIsEditing(true);
        setIsAddModalOpen(true);
    };

    // Save handler
    const handleSaveRecipe = (e) => {
        e.preventDefault();
        console.log("Saving recipe:", selectedRecipe);

        if (selectedRecipe.id) {
            setRecipes(recipes.map(r => r.id === selectedRecipe.id ? selectedRecipe : r));
        } else {
            setRecipes([...recipes, { ...selectedRecipe, id: Date.now() }]);
        }

        setIsEditing(false);
        setIsAddModalOpen(false);
        setSelectedRecipe(null);
    };


    const handleSelectRecipe = (recipe) => {
        setSelectedRecipe(recipe);
        setIsEditing(false);
    };

    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const RecipeCard = ({ recipe }) => (
        <div onClick={() => handleSelectRecipe(recipe)} className='bg-white rounded-lg shadow-sm p-3 space-y-2 cursor-pointer hover:shadow-xl transition-shadow-sm'>
            <img src={recipe.image} alt={recipe.title} className='w-full h-32 rounded-md object-cover' />
            <div className='flex justify-between items-center'>
                <h3 className='font-bold text-gray-800'>{recipe.title}</h3>
                <div className='flex items-center space-x-1'>
                    {recipe.isFavorite && <StarIcon className='size-5 text-yellow-400' title="Favorite" />}
                    {recipe.source === 'ai' && <SparklesIcon className='size-5 text-purple-500' title="AI Generated" />}
                </div>
            </div>
            <p className='text-xs font-semibold text-gray-500 uppercase'>{recipe.category}</p>
        </div>
    );

    const RecipeDetailView = () => (
        <div className='rounded-xl p-4 bg-white shadow-lg space-y-4'>
            {selectedRecipe.image && <img src={selectedRecipe.image} alt={selectedRecipe.title} className='w-full h-40 rounded-xl object-cover' />}
            <h1 className='text-2xl font-bold text-gray-800'>{selectedRecipe.title}</h1>
            <div>
                <h2 className='font-bold text-amber-700'>Ingredients</h2>
                <ul className='list-disc list-inside text-gray-600'>
                    {selectedRecipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                </ul>
            </div>
            <div>
                <h2 className='font-bold text-amber-700'>Instructions</h2>
                <p className='text-gray-600'>{selectedRecipe.instructions}</p>
            </div>
            <div className='flex space-x-2'>
                <Button onClick={() => setIsEditing(true)} className="flex-1 flex items-center justify-center space-x-1"><PencilIcon className='size-4' /><span>Edit</span></Button>
                <Button styleType='danger' className="flex-1 flex items-center justify-center space-x-1"><TrashIcon className='size-4' /><span>Delete</span></Button>
            </div>
            <Button className="w-full bg-green-500 hover:bg-green-700">Add to Plan</Button>
        </div>
    );

    const RecipeEditView = () => (
        <form onSubmit={handleSaveRecipe} className='rounded-xl p-4 bg-white shadow-lg space-y-4'>
            <h1 className='text-2xl font-bold text-gray-800'>{selectedRecipe.id ? 'Edit Recipe' : 'Add New Recipe'}</h1>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Title</label>
                <input type="text" defaultValue={selectedRecipe.title} className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2' />
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Ingredients (comma separated)</label>
                <textarea defaultValue={selectedRecipe.ingredients.join(', ')} rows="3" className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'></textarea>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Instructions</label>
                <textarea defaultValue={selectedRecipe.instructions} rows="5" className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'></textarea>
            </div>
            <div className='flex space-x-2'>
                <Button type="submit" className="flex-1">Save Recipe</Button>
                <Button styleType='outline' onClick={() => { setIsEditing(false); if (!selectedRecipe.id) setSelectedRecipe(null); }} className="flex-1">Cancel</Button>
            </div>
        </form>
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
                            <h1 className='text-3xl font-bold text-gray-800'>My Recipes</h1>
                            <div className='flex items-center space-x-2'>
                                <div className='relative'>
                                    <MagnifyingGlassIcon className='size-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2' />
                                    <input
                                        type="text"
                                        placeholder='Search recipes...'
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className='pl-10 pr-4 py-2 border rounded-full focus:outline-hidden focus:ring-2 focus:ring-amber-500'
                                    />
                                </div>
                                {/* This button now opens a modal for adding a new recipe */}
                                <Button onClick={handleAddNewRecipe} className="flex items-center space-x-2">
                                    <PlusIcon className='size-5' />
                                    <span>Add Recipe</span>
                                </Button>

                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {filteredRecipes.map(recipe => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))}
                        </div>
                    </div>

                    <Dialog
                        open={isAddModalOpen}
                        onClose={() => { setIsAddModalOpen(false); setIsEditing(false); setSelectedRecipe(null); }}
                        className="relative z-50"
                    >
                        <DialogBackdrop className="fixed inset-0 bg-black/50" />

                        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                            <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                                <DialogTitle as="h2" className="text-2xl font-bold text-gray-800 mb-4">
                                    {selectedRecipe?.id ? "Edit Recipe" : "Add New Recipe"}
                                </DialogTitle>

                                <form onSubmit={handleSaveRecipe} className="space-y-4">
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700'>Title</label>
                                        <input
                                            name="title"
                                            type="text"
                                            placeholder="e.g., My Famous Pizza"
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                                            required
                                            value={selectedRecipe?.title || ''}
                                            onChange={(e) => setSelectedRecipe({ ...selectedRecipe, title: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-sm font-medium text-gray-700'>Ingredients (comma separated)</label>
                                        <textarea
                                            name="ingredients"
                                            rows="3"
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                                            required
                                            value={selectedRecipe?.ingredients.join(', ') || ''}
                                            onChange={(e) => setSelectedRecipe({
                                                ...selectedRecipe,
                                                ingredients: e.target.value.split(',').map(s => s.trim())
                                            })}
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className='block text-sm font-medium text-gray-700'>Instructions</label>
                                        <textarea
                                            name="instructions"
                                            rows="5"
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                                            required
                                            value={selectedRecipe?.instructions || ''}
                                            onChange={(e) => setSelectedRecipe({ ...selectedRecipe, instructions: e.target.value })}
                                        ></textarea>
                                    </div>

                                    <div className='flex space-x-2 pt-2'>
                                        <Button type="submit" className="flex-1">Save Recipe</Button>
                                        <Button
                                            type="button"
                                            onClick={() => { setIsAddModalOpen(false); setIsEditing(false); setSelectedRecipe(null); }}
                                            styleType='outline'
                                            className="flex-1"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </div>
                    </Dialog>


                    {/* Side */}
                    <div className='md:col-span-2 space-y-5'>
                        <div className='rounded-xl p-4 bg-white shadow-lg space-y-3'>
                            <div className='flex items-center space-x-2'>
                                <SparklesIcon className='size-8 text-purple-500' />
                                <div>
                                    <h1 className='text-xl font-bold text-purple-600'>Ask AI</h1>
                                    <p className='text-gray-600 text-sm'>Generate a new recipe.</p>
                                </div>
                            </div>
                            <input type="text" placeholder='e.g., "low-carb chicken pasta"' className='w-full border border-gray-300 rounded-md shadow-sm p-2' />
                            <Button className="w-full bg-purple-500 hover:bg-purple-700">Generate</Button>
                        </div>

                        {selectedRecipe && (isEditing ? <RecipeEditView /> : <RecipeDetailView />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipesPage;