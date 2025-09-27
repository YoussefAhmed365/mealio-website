import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import './css/Navbar.css'

// Pages
import Dashboard from '../../pages/DashboardPage'
import Plans from '../../pages/PlansPage'
import Recipes from '../../pages/RecipesPage'
import Shopping from '../../pages/ShoppingPage'
import Discover from '../../pages/DiscoverPage'
import Analysis from '../../pages/AnalysisPage'
import Settings from '../../pages/SettingsPage'

// Icons
import DiscoverIcon from '../../assets/icons/Utensils'
import { HomeIcon as HomeSolid, CalendarIcon as CalenderSolid, ShoppingBagIcon as ShoppingBagSolid, ChatBubbleOvalLeftIcon as ChatBubbleSolid, ChartBarIcon as ChartBarSolid, Cog6ToothIcon as SettingsSolid } from '@heroicons/react/24/solid'
import { HomeIcon as HomeOutline, CalendarIcon as CalenderOutline, ShoppingBagIcon as ShoppingBagOutline, ChatBubbleOvalLeftIcon as ChatBubbleOutline, ChartBarIcon as ChartBarOutline, Cog6ToothIcon as SettingsOutline, ArrowLeftStartOnRectangleIcon as Logout } from '@heroicons/react/24/outline'

// Icons using inline SVG for a lightweight solution
const HomeIconFn = ({ isActive }) => isActive ? (
    <HomeSolid className='size-6 transition-transform duration-300 scale-110' />
) : (
    <HomeOutline className='size-6 transition-transform duration-300' />
);

const PlanIconFn = ({ isActive }) => isActive ? (
    <CalenderSolid className='size-6 transition-transform duration-300 scale-110' />
) : (
    <CalenderOutline className='size-6 transition-transform duration-300' />
);

const RecipesIconFn = ({ isActive }) => (
    <DiscoverIcon strokeWidth={isActive ? 2 : 1.5} stroke="currentColor" className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
);

const ShoppingIconFn = ({ isActive }) => isActive ? (
    <ShoppingBagSolid className='size-6 transition-transform duration-300 scale-110' />
) : (
    <ShoppingBagOutline className='size-6 transition-transform duration-300' />
);

const DiscoverIconFn = ({ isActive }) => isActive ? (
    <ChatBubbleSolid className='size-6 transition-transform duration-300 scale-110' />
) : (
    <ChatBubbleOutline className='size-6 transition-transform duration-300' />
);

const AnalysisIconFn = ({ isActive }) => isActive ? (
    <ChartBarSolid className='size-6 transition-transform duration-300 scale-110' />
) : (
    <ChartBarOutline className='size-6 transition-transform duration-300' />
);

const SettingsIconFn = ({ isActive }) => isActive ? (
    <SettingsSolid className='size-6 transition-transform duration-300 scale-110' />
) : (
    <SettingsOutline className='size-6 transition-transform duration-300' />
);

const pages = [
    { name: 'Home', path: '/dashboard', icon: HomeIconFn },
    { name: 'Weekly Plans', path: '/plans', icon: PlanIconFn },
    { name: 'Recipes', path: '/recipes', icon: RecipesIconFn },
    { name: 'Shopping List', path: '/shopping-list', icon: ShoppingIconFn },
    { name: 'Discover Recipes', path: '/discover', icon: DiscoverIconFn },
    { name: 'Nutrition Analysis', path: '/analysis', icon: AnalysisIconFn },
    { name: 'Settings', path: '/settings', icon: SettingsIconFn },
];

// Move isTrackNutrition state up to Navbar and pass as prop
const Sidebar = ({ isCollapsed, setIsCollapsed, isTrackNutrition }) => {
    const filteredPages = isTrackNutrition
        ? pages
        : pages.filter(page => page.name !== 'Nutrition Analysis');

    return (
        <div
            className={`hidden md:fixed top-0 left-0 h-full bg-amber-600 shadow-lg px-4 pb-4 transition-all duration-300 ease-in-out md:flex flex-col justify-between ${isCollapsed ? 'w-20' : 'w-64 rounded-r-2xl'}`}
            onMouseEnter={() => setIsCollapsed(false)}
            onMouseLeave={() => setIsCollapsed(true)}
        >
            {/* Navigation links */}
            <nav className="flex flex-col gap-2 mt-10">
                {filteredPages.map((page, index) => (
                    <NavLink
                        key={index}
                        to={page.path}
                        className={({ isActive }) =>
                            `nav-link flex items-center gap-4 py-2 px-3 rounded-xl transition-colors duration-300 ${isActive
                                ? 'bg-amber-100 text-amber-600 font-semibold'
                                : 'text-white hover:bg-gray-100'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <div className={`link-icon text-2xl ${isActive ? 'text-amber-500' : 'text-gray-100'}`}>
                                    <page.icon isActive={isActive} />
                                </div>
                                {!isCollapsed && (
                                    <span className="whitespace-nowrap transition-opacity duration-300 opacity-100 font-semibold">
                                        {page.name}
                                    </span>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Logout Button */}
            <button
                type="button"
                onClick={async () => {
                    try {
                        await fetch('/api/logout', { method: 'POST', credentials: 'include' });
                        window.location.href = '/login'
                    } catch (error) {
                        // Optionally handle error (e.g., show a toast)
                        console.error('Logout failed', error);
                    }
                }}
                className="nav-link flex items-center gap-4 py-2 px-3 rounded-xl bg-transparent border-none outline-hidden cursor-pointer transition-colors duration-300 text-white hover:bg-gray-100 hover:text-amber-600"
            >
                <div className="link-icon text-2xl text-gray-100">
                    <Logout className='size-6' />
                </div>
                {!isCollapsed && (
                    <span className="whitespace-nowrap transition-opacity duration-300 opacity-100 font-semibold">Logout</span>
                )}
            </button>
        </div>
    );
};

const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isTrackNutrition] = useState(true);

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} isTrackNutrition={isTrackNutrition} />
            <main className={`flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? 'ml-20' : 'ml-20 md:ml-64 z-50 md:z-0 '}`}>
                <Routes>
                    <Route path="/dashboard/*" element={<Dashboard />} />
                    <Route path="/plans/*" element={<Plans />} />
                    <Route path="/recipes/*" element={<Recipes />} />
                    <Route path="/shopping/*-list" element={<Shopping />} />
                    <Route path="/discover/*" element={<Discover />} />
                    <Route path="/analysis/*" element={<Analysis />} />
                    <Route path="/settings/*" element={<Settings />} />
                </Routes>
            </main>
        </div>
    );
};

export default Navbar;