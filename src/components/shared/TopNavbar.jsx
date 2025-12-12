// Components
import { Link } from 'react-router-dom';
import { Popover, PopoverPanel, PopoverButton } from '@headlessui/react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import Button from '../shared/Button';

// Icons
import { BellIcon } from '@heroicons/react/24/outline';
import SearchField from '../../components/shared/Search';

// Images
import UserAvatar from '../../assets/images/avatar.webp';

const TopNavbar = () => {
    const { notifications } = useNotification();

    // 1. Get the user object from AuthContext
    const { user } = useAuth();

    // 2. Derive the display name safely
    const displayName = `${user.firstname} ${user.lastname}`;

    return (
        <nav className="bg-white px-4 mt-6 mb-2 flex justify-between items-center" style={{ minWidth: "calc(100% - 32px)" }}>
            {/* Meal.io App Name */}
            <h2 className='text-2xl font-bold text-amber-600 cursor-default'>Meal<span className='text-amber-950'>.io</span></h2>

            {/* Search Bar */}
            <SearchField />

            {/* Profile and Notifications */}
            <div className='flex justify-center items-center space-x-4'>
                <Popover className='relative'>
                    {({ open }) => (
                        <>
                            <PopoverButton className='block p-0 bg-transparent border-none border-0 focus:outline-hidden cursor-pointer'>
                                <BellIcon aria-hidden="true" className="size-6 text-gray-600" />
                            </PopoverButton>
                            <PopoverPanel className={`absolute right-0 z-10 mt-4 bg-white w-96 p-4 shadow-lg rounded-2xl origin-top-right transition-all duration-300 ${open
                                ? "opacity-100 translate-y-0 scale-100"
                                : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                                }`}
                                static
                            >
                                <div className='flex justify-between items-center border-b border-gray-200 pb-2'>
                                    <h2 className='text-lg font-semibold'>Notifications</h2>
                                    {Array.isArray(notifications) && notifications.length > 0 &&
                                        <Button styleType='text'>Clear All</Button>
                                    }
                                </div>
                                {Array.isArray(notifications) && notifications.length > 0 ? notifications.map((notification, index) => (
                                    <div key={index} className='flex justify-between items-center py-2'>
                                        <div className='flex items-center space-x-2'>
                                            <div></div>
                                            <div className='flex flex-col'>
                                                <h2 className='text-base font-semibold'>{notification.title}</h2>
                                                <p className='text-sm text-gray-600'>{notification.message}</p>
                                            </div>
                                        </div>
                                        <Button styleType='text'>Clear</Button>
                                    </div>
                                )) :
                                    <div className='h-36 flex flex-col justify-center items-center'>
                                        <h5 className='text-center text-lg font-semibold mb-1'>You Doing Great!</h5>
                                        <p className='text-center text-gray-600'>There's no notifications right now.</p>
                                    </div>}
                            </PopoverPanel>
                        </>
                    )}
                </Popover>
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <PopoverButton className="block p-0 bg-transparent border-none border-0 focus:outline-hidden cursor-pointer">
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
                                        <span className="font-semibold text-gray-800">{displayName}</span>
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