// Components & Libraries
import { Link } from 'react-router-dom'

export default function HeroSection() {
    const NavBtns = [
        { to: "/", text: "Featured" },
        { to: "/", text: "How It Works" },
        { to: "/", text: "Community" },
        { to: "/", text: "Articles" }
    ];

    return (
        <nav className='grid grid-cols-3 px-12 py-6'>
            <ul className='col-span-1 flex justify-start items-center space-x-10'>
                {NavBtns.map((btn, idx) => (
                    <li key={idx}><Link className='text-gray-600 font-medium hover:text-amber-600 transition duration-300' to={btn.to}>{btn.text}</Link></li>
                ))}
            </ul>

            <h1 className='col-span-1 text-center text-xl font-bold text-amber-600'>Meal<span className='text-amber-950'>.io</span></h1>

            <div className='col-span-1 text-right space-x-4'>
                <Link className='text-amber-600 font-medium hover:text-amber-800 transition duration-300' to={"/login"}>login</Link>
                <Link className='text-amber-600 font-medium border border-amber-600 rounded-md px-5 py-2.5 hover:text-white hover:bg-amber-700 focus:ring focus:ring-amber-500 transition duration-300' to={"/signup"}>Create an account</Link>
            </div>
        </nav>
    );
};