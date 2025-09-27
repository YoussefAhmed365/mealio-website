// Components
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Popover, PopoverPanel, PopoverButton } from '@headlessui/react'

// Icons
import { BellIcon } from '@heroicons/react/24/outline'
import SearchField from '../../components/shared/Search'

// Images
import UserAvatar from '../../assets/images/avatar.webp'

const TopNavbar = () => {
    const [userName, setUserName] = useState('');

    // Fetch user name (prevent double fetch in StrictMode)
    useEffect(() => {
        let didFetch = false;
        if (!didFetch) {
            fetch('/api/user')
                .then(response => response.json())
                .then(data => {
                    setUserName(data.name);
                    console.log("User data:", data);
                })
                .catch(error => console.error("Error fetching user data:", error));
            didFetch = true;
        }
    }, []);

    return (
        <nav className="bg-white shadow-md rounded-xl p-4 my-4 flex justify-between items-center" style={{ minWidth: "calc(100% - 32px)" }}>
            {/* Meal.io App Name */}
            <h2 className='text-2xl font-bold text-amber-600 cursor-default'>Meal<span className='text-amber-950'>.io</span></h2>

            {/* Search Bar */}
            <SearchField />

            {/* Profile and Notifications */}
            <div className='flex justify-center items-center space-x-4'>
                <button className='p-0 bg-transparent border-none border-0'>
                    <BellIcon aria-hidden="true" className="size-6 text-gray-600" />
                </button>
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <PopoverButton className="block focus:outline-hidden">
                                <div className="overflow-hidden w-11 h-11 rounded-full border-2 border-amber-600">
                                    <img alt="Profile" src={UserAvatar} className='w-full h-full' />
                                </div>
                            </PopoverButton>
                            <PopoverPanel
                                className={`absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black/5 p-4 transition-all duration-300 ${open
                                        ? "opacity-100 translate-y-0 scale-100"
                                        : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                                    }`}
                                static
                            >
                                <div className="flex flex-row items-center space-x-4">
                                    <img src={UserAvatar} alt="User" className="w-16 h-16 rounded-full border-2 border-amber-600" />
                                    <div className="flex flex-col space-y-1">
                                        <span className="font-semibold text-gray-800">{userName}</span>
                                        <Link
                                            to="/profile"
                                            className="text-gray-600 hover:text-gray-900 transition"
                                        >
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            </PopoverPanel>
                        </>
                    )}
                </Popover>
            </div>
        </nav>
    );
};

export default TopNavbar;