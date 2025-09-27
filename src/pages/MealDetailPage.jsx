// Components & Libraries
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from "../components/shared/Navbar"
import TopNavbar from '../components/shared/TopNavbar'
import Button from '../components/shared/Button'

// Icons
import { HeartIcon, BookmarkIcon, ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/solid'

// Mock Images (replace with dynamic ones)
import Salmon from '../assets/images/food/salmon.jpg'
import VegCurry from '../assets/images/food/veg-curry.jpg'
import Pizza from '../assets/images/food/pizza.jpg'
import BeefStirFry from '../assets/images/food/beef-stir-fry.jpg'
import Avatar from '../assets/images/avatar.webp'

// Re-using mockPosts from DiscoverPage for demonstration
const mockPosts = [
    {
        id: 1,
        title: 'Grilled Salmon with Lemon & Dill',
        image: Salmon,
        author: { name: 'Jane Doe', avatar: Avatar },
        likes: 125,
        saves: 45,
        ingredients: ['Salmon Fillet', 'Lemon', 'Fresh Dill', 'Olive Oil', 'Salt', 'Pepper'],
        steps: [
            'Preheat grill to medium-high.',
            'Brush salmon with olive oil and season with salt and pepper.',
            'Grill for 6-8 minutes per side, or until cooked through.',
            'Squeeze fresh lemon juice over the top and sprinkle with dill before serving.'
        ],
        comments: [
            { author: { name: 'John Smith', avatar: Avatar }, text: 'Looks delicious! I have to try this.' },
            { author: { name: 'Emily White', avatar: Avatar }, text: 'So simple and healthy, my favorite!' }
        ]
    },
    {
        id: 2,
        title: 'Ultimate Veggie Curry',
        image: VegCurry,
        author: { name: 'Chef Alex', avatar: Avatar },
        likes: 210,
        saves: 88,
        ingredients: ['Coconut Milk', 'Mixed Vegetables', 'Curry Paste', 'Onion', 'Garlic'],
        steps: ['Sauté onion and garlic.', 'Add curry paste and cook for 1 minute.', 'Stir in coconut milk and vegetables.', 'Simmer until vegetables are tender.'],
        comments: []
    },
    {
        id: 3,
        title: 'Classic Pepperoni Pizza',
        image: Pizza,
        author: { name: 'Maria Garcia', avatar: Avatar },
        likes: 450,
        saves: 150,
        ingredients: ['Pizza Dough', 'Tomato Sauce', 'Mozzarella Cheese', 'Pepperoni'],
        steps: ['Preheat oven to 475°F (245°C).', 'Roll out dough.', 'Spread sauce, sprinkle cheese, add pepperoni.', 'Bake for 10-12 minutes.'],
        comments: []
    },
    {
        id: 4,
        title: 'Hearty Beef Stir-fry',
        image: BeefStirFry,
        author: { name: 'Foodie Fan', avatar: Avatar },
        likes: 300,
        saves: 100,
        ingredients: ['Beef Strips', 'Broccoli', 'Carrots', 'Soy Sauce', 'Ginger', 'Garlic'],
        steps: ['Slice beef and vegetables.', 'Stir-fry beef until browned.', 'Add vegetables and stir-fry until tender-crisp.', 'Add sauce and serve.'],
        comments: [{ author: { name: 'Jane Doe', avatar: Avatar }, text: 'Perfect for a quick weeknight dinner!' }]
    }
];

const MealDetailPage = () => {
    const { id } = useParams(); // Get the meal ID from the URL
    const navigate = useNavigate();
    const [meal, setMeal] = useState(null);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        // In a real app, you'd fetch this from an API:
        // fetch(`/api/meals/${id}`).then(res => res.json()).then(setMeal);
        const foundMeal = mockPosts.find(post => post.id === parseInt(id));
        setMeal(foundMeal);
    }, [id]);

    const handleAddComment = (e) => {
        e.preventDefault();
        if (newComment.trim() && meal) {
            const updatedComments = [...meal.comments, { author: { name: 'Current User', avatar: Avatar }, text: newComment.trim() }]; // Mock current user
            setMeal({ ...meal, comments: updatedComments });
            setNewComment('');
            // In a real app, you'd send this to your backend
        }
    };

    if (!meal) {
        return (
            <div className='flex justify-start bg-gray-50'>
                <Navbar />
                <div className='w-full flex flex-col justify-start items-center p-8'>
                    <TopNavbar />
                    <div className='text-center text-gray-600 mt-10'>Loading meal details...</div>
                </div>
            </div>
        );
    }

    // Filter out the current meal from similar meals
    const similarMeals = mockPosts.filter(post => post.id !== meal.id).slice(0, 3); // Show up to 3 similar meals

    return (
        <div className='flex justify-start'>
            <Navbar />
            <div className='w-full flex flex-col justify-start items-center'>
                <TopNavbar />
                <div className='w-full grid grid-cols-1 md:grid-cols-7 gap-4 my-4 px-4'>

                    {/* Main Content - Meal Details */}
                    <div className='md:col-span-5 space-y-6 bg-white p-6 rounded-xl shadow-lg'>
                        <button onClick={() => navigate(-1)} className='flex items-center text-amber-600 hover:text-amber-800 font-medium mb-4'>
                            <ArrowLeftIcon className='size-5 mr-2' /> Back to Discover
                        </button>

                        <img src={meal.image} alt={meal.title} className='w-full h-96 object-cover rounded-xl shadow-md' />

                        <div className='flex justify-between items-center mt-4'>
                            <h1 className='text-4xl font-extrabold text-gray-900'>{meal.title}</h1>
                            <div className='flex items-center space-x-4 text-gray-600'>
                                <button className='flex items-center space-x-1 hover:text-red-500'><HeartIcon className='size-6' /> <span>{meal.likes}</span></button>
                                <button className='hover:text-amber-600'><BookmarkIcon className='size-6' /></button>
                            </div>
                        </div>

                        <div className='flex items-center space-x-3 text-lg text-gray-700'>
                            <img src={meal.author.avatar} alt={meal.author.name} className='w-10 h-10 rounded-full border-2 border-amber-400' />
                            <span>By <span className='font-semibold text-amber-700'>{meal.author.name}</span></span>
                        </div>

                        <hr className='border-gray-200' />

                        {/* Ingredients */}
                        <div>
                            <h2 className='text-2xl font-bold text-amber-700 mb-3'>Ingredients</h2>
                            <ul className='list-disc list-inside text-gray-700 space-y-2 text-lg'>
                                {meal.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                            </ul>
                        </div>

                        {/* Preparation Steps */}
                        <div>
                            <h2 className='text-2xl font-bold text-amber-700 mb-3'>Preparation Steps</h2>
                            <ol className='list-decimal list-inside text-gray-700 space-y-3 text-lg'>
                                {meal.steps.map((step, i) => <li key={i}>{step}</li>)}
                            </ol>
                        </div>

                        <hr className='border-gray-200' />

                        {/* Comments Section */}
                        <div>
                            <h2 className='text-2xl font-bold text-amber-700 mb-4'>Comments ({meal.comments.length})</h2>
                            <div className='space-y-5'>
                                {meal.comments.length > 0 ? (
                                    meal.comments.map((comment, i) => (
                                        <div key={i} className='flex items-start space-x-4 bg-gray-50 p-3 rounded-lg'>
                                            <img src={comment.author.avatar} alt={comment.author.name} className='w-12 h-12 rounded-full border border-gray-200' />
                                            <div>
                                                <p className='font-semibold text-gray-800 text-lg'>{comment.author.name}</p>
                                                <p className='text-gray-700'>{comment.text}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className='text-gray-500'>No comments yet. Be the first to share your thoughts!</p>
                                )}
                            </div>
                            <form onSubmit={handleAddComment} className='mt-6 flex flex-col space-y-3'>
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder='Add a comment...'
                                    rows="2"
                                    className='flex-grow border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                                ></textarea>
                                <Button type="submit" className="bg-amber-600 hover:bg-amber-700 self-end">Post</Button>
                            </form>
                        </div>
                    </div>

                    {/* Side Panel - Actions & Similar Meals */}
                    <div className='md:col-span-2 space-y-6'>
                        {/* Action Buttons */}
                        <div className='rounded-xl p-4 bg-white shadow-lg space-y-3'>
                            <h2 className='text-xl font-bold text-blue-600'>Quick Actions</h2>
                            <Button className="w-full bg-green-500 hover:bg-green-700 flex items-center justify-center space-x-2">
                                <PlusIcon className='size-5' />
                                <span>Add to My Plan</span>
                            </Button>
                            <Button styleType='outline' className="w-full flex items-center justify-center space-x-2">
                                <BookmarkIcon className='size-5' />
                                <span>Save to My Recipes</span>
                            </Button>
                        </div>

                        {/* Similar Meals Widget */}
                        <div className='rounded-xl p-4 bg-white shadow-lg space-y-3'>
                            <h2 className='text-xl font-bold text-purple-600'>Similar Meals</h2>
                            <div className='space-y-4'>
                                {similarMeals.length > 0 ? (
                                    similarMeals.map(similarMeal => (
                                        <div key={similarMeal.id} className='flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg' onClick={() => navigate(`/meal/${similarMeal.id}`)}>
                                            <img src={similarMeal.image} alt={similarMeal.title} className='w-16 h-16 object-cover rounded-md' />
                                            <div>
                                                <p className='font-semibold text-gray-800'>{similarMeal.title}</p>
                                                <p className='text-sm text-gray-600'>By {similarMeal.author.name}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className='text-gray-500 text-sm'>No similar meals found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDetailPage;