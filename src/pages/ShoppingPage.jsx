// Components & Libraries
import { useState } from 'react'
import Navbar from "../components/shared/Navbar"
import TopNavbar from '../components/shared/TopNavbar'
import Button from '../components/shared/Button'

// Icons
import { CheckCircleIcon, TrashIcon, PlusIcon, ArrowPathIcon, DocumentTextIcon } from '@heroicons/react/24/solid'
import { CheckCircleIcon as CheckCircleIconOutline } from '@heroicons/react/24/outline'


const mockShoppingList = [
    { id: 1, name: 'Chicken Breast', quantity: '2 lbs', category: 'Meat & Fish', isChecked: false },
    { id: 2, name: 'Salmon Fillet', quantity: '1 lb', category: 'Meat & Fish', isChecked: false },
    { id: 3, name: 'Mixed Greens', quantity: '1 bag', category: 'Produce', isChecked: true },
    { id: 4, name: 'Tomatoes', quantity: '4 medium', category: 'Produce', isChecked: false },
    { id: 5, name: 'Avocado', quantity: '2', category: 'Produce', isChecked: false },
    { id: 6, name: 'Lentils', quantity: '1 can', category: 'Pantry Staples', isChecked: false },
    { id: 7, name: 'Pizza Dough', quantity: '1', category: 'Pantry Staples', isChecked: true },
    { id: 8, name: 'Shredded Mozzarella', quantity: '1 bag', category: 'Dairy & Eggs', isChecked: false },
];

const mockPantryItems = ['Olive Oil', 'Salt', 'Black Pepper', 'Garlic Powder', 'Onion', 'Oats'];

const ShoppingPage = () => {
    const [shoppingList, setShoppingList] = useState(mockShoppingList);
    const [newItemName, setNewItemName] = useState('');

    const handleToggleItem = (id) => {
        setShoppingList(list =>
            list.map(item =>
                item.id === id ? { ...item, isChecked: !item.isChecked } : item
            )
        );
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        if (!newItemName.trim()) return;
        const newItem = {
            id: Date.now(),
            name: newItemName.trim(),
            quantity: '1',
            category: 'Miscellaneous',
            isChecked: false,
        };
        setShoppingList([...shoppingList, newItem]);
        setNewItemName('');
    };

    const handleRemoveItem = (id) => {
        setShoppingList(list => list.filter(item => item.id !== id));
    };

    const groupedList = shoppingList.reduce((acc, item) => {
        (acc[item.category] = acc[item.category] || []).push(item);
        return acc;
    }, {});

    return (
        <div className='flex justify-start'>
            <Navbar />
            <div className='w-full flex flex-col justify-start items-center'>
                <TopNavbar />
                <div className='w-full grid grid-cols-1 xl:grid-cols-7 gap-4 my-4 px-4'>

                    {/* Main */}
                    <div className='md:col-span-5 space-y-5'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-3xl font-bold text-gray-800'>Your Shopping List</h1>
                            <Button className="max-w-fit flex items-center space-x-2">
                                <ArrowPathIcon className='size-5' />
                                <span>Regenerate from Plan</span>
                            </Button>
                        </div>

                        <div className='bg-white p-4 rounded-xl shadow-lg space-y-4'>
                            {Object.entries(groupedList).map(([category, items]) => (
                                <div key={category}>
                                    <h2 className='text-xl font-bold text-amber-700 border-b-2 border-amber-200 pb-1 mb-2'>{category}</h2>
                                    <ul className='space-y-2'>
                                        {items.map(item => (
                                            <li key={item.id} className={`flex items-center justify-between p-2 rounded-md ${item.isChecked ? 'bg-green-50 text-gray-400' : ''}`}>
                                                <div className='flex items-center'>
                                                    <button onClick={() => handleToggleItem(item.id)} className='mr-3'>
                                                        {item.isChecked ? <CheckCircleIcon className='size-6 text-green-500' /> : <CheckCircleIconOutline className='size-6 text-gray-300' />}
                                                    </button>
                                                    <span className={`font-medium ${item.isChecked ? 'line-through' : 'text-gray-800'}`}>{item.name}</span>
                                                    <span className='text-sm ml-2'>({item.quantity})</span>
                                                </div>
                                                <button onClick={() => handleRemoveItem(item.id)} title="Remove Item">
                                                    <TrashIcon className='size-5 text-gray-400 hover:text-red-500' />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            <form onSubmit={handleAddItem} className='flex items-center space-x-2 pt-4 border-t'>
                                <input
                                    type="text"
                                    value={newItemName}
                                    onChange={(e) => setNewItemName(e.target.value)}
                                    placeholder='Add a new item...'
                                    className='flex-grow border border-gray-300 rounded-md shadow-sm p-2'
                                />
                                <Button type="submit" className="flex items-center space-x-2 max-w-fit">
                                    <PlusIcon className='size-5' />
                                    <span>Add</span>
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Side */}
                    <div className='md:col-span-2 space-y-5'>
                        <div className='rounded-xl p-4 bg-white shadow-lg space-y-3'>
                            <div>
                                <h1 className='text-2xl font-bold text-blue-600'>What You Have</h1>
                                <p className='text-gray-600'>Ingredients in your pantry.</p>
                            </div>
                            <div className='flex flex-wrap gap-2'>
                                {mockPantryItems.map(item => (
                                    <span key={item} className='bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full'>{item}</span>
                                ))}
                            </div>
                        </div>
                        <div className='rounded-xl p-4 bg-white shadow-lg space-y-3'>
                            <div>
                                <h1 className='text-2xl font-bold text-green-600'>Actions</h1>
                                <p className='text-gray-600'>Manage your list.</p>
                            </div>
                            <Button styleType='outline' className={"w-full flex items-center justify-center space-x-2"}>
                                <DocumentTextIcon className='size-5' />
                                <span>Export List</span>
                            </Button>
                            <Button styleType='danger' className="w-full" onClick={() => setShoppingList(list => list.filter(item => !item.isChecked))}>
                                Clear Acquired Items
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingPage;