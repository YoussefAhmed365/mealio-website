// Components & Libraries
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from "../components/shared/Navbar"
import TopNavbar from '../components/shared/TopNavbar'
import Button from '../components/shared/Button'

// Icons
import { HeartIcon, ChatBubbleOvalLeftEllipsisIcon, BookmarkIcon } from '@heroicons/react/24/solid'

// Mock Images (replace with dynamic ones)
import Salmon from '../assets/images/food/salmon.jpg'
import VegCurry from '../assets/images/food/veg-curry.jpg'
import Pizza from '../assets/images/food/pizza.jpg'
import BeefStirFry from '../assets/images/food/beef-stir-fry.jpg'
import Avatar from '../assets/images/avatar.webp'

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
        title: 'Beef Stir Fry',
        image: BeefStirFry,
        author: { name: 'Maria Garcia', avatar: Avatar },
        likes: 261,
        saves: 358,
        ingredients: ['Meat Beef', 'Tomato Sauce', 'Mozzarella Cheese', 'Pepperoni'],
        steps: ['Preheat oven to 475°F (245°C).', 'Roll out dough.', 'Spread sauce, sprinkle cheese, add pepperoni.', 'Bake for 10-12 minutes.'],
        comments: []
    },
];

const DiscoverPage = () => {
    const [posts] = useState(mockPosts);

    const RecipePostCard = ({ post }) => (
        <div className='bg-white rounded-xl shadow-lg overflow-hidden group'>
            {/* Use Link to navigate to the new detail page */}
            <Link to={`/meal/${post.id}`}>
                <img src={post.image} alt={post.title} className='w-full h-40 object-cover cursor-pointer' />
            </Link>
            <div className='p-4 space-y-3'>
                {/* Use Link for the title as well */}
                <Link to={`/meal/${post.id}`} className='text-lg font-bold text-gray-800 cursor-pointer hover:text-amber-600'>{post.title}</Link>
                <div className='flex items-center space-x-2'>
                    <img src={post.author.avatar} alt={post.author.name} className='w-8 h-8 rounded-full' />
                    <span className='text-sm font-medium text-gray-600'>{post.author.name}</span>
                </div>
                <div className='flex justify-between items-center text-gray-500'>
                    <div className='flex items-center space-x-4'>
                        <button className='flex items-center space-x-1 hover:text-red-500'><HeartIcon className='size-5' /> <span>{post.likes}</span></button>
                        <button className='flex items-center space-x-1 hover:text-blue-500'><ChatBubbleOvalLeftEllipsisIcon className='size-5' /> <span>{post.comments.length}</span></button>
                    </div>
                    <button className='hover:text-amber-600'><BookmarkIcon className='size-5' /></button>
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
                        <h1 className='text-3xl font-bold text-gray-800'>Discover Community Recipes</h1>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {posts.map(post => <RecipePostCard key={post.id} post={post} />)}
                        </div>
                    </div>

                    {/* Side */}
                    <div className='md:col-span-2 space-y-5'>
                        <div className='rounded-xl p-4 bg-white shadow-lg space-y-3'>
                            <h2 className='text-xl font-bold text-purple-600'>Share Your Meal!</h2>
                            <p className='text-gray-600'>Have a recipe you love? Share it with the community and inspire others.</p>
                            <Button className="w-full bg-purple-500 hover:bg-purple-700">Post a Recipe</Button>
                        </div>
                        <div className='rounded-xl p-4 bg-white shadow-lg space-y-3'>
                            <h2 className='text-xl font-bold text-green-600'>Trending Tags</h2>
                            <div className='flex flex-wrap gap-2'>
                                {['#Vegan', '#QuickDinner', '#LowCarb', '#Dessert', '#Chicken', '#Healthy'].map(tag => (
                                    <span key={tag} className='bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full cursor-pointer hover:bg-green-200'>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscoverPage;