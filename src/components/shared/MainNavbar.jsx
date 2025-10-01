// Components & Libraries
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export default function HeroSection() {
    const NavBtns = [
        { to: "/", text: "Featured" },
        { to: "/", text: "How It Works" },
        { to: "/", text: "Community" },
        { to: "/", text: "Articles" }
    ];

    return (
        <Disclosure>
                {({ open }) => (
                    <>
                        <div className="mx-auto px-4 sm:px-6 lg:px-12 py-6">
                            <div className="relative h-16">
                                <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                                    {/* Mobile menu button*/}
                                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-amber-100 hover:text-amber-600 focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-amber-500">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </DisclosureButton>
                                </div>
                                <div className="nav absolute md:static inset-y-0 right-0 flex items-center">
                                    <div className="hidden md:flex md:items-center">
                                        <ul className='flex justify-start items-center space-x-10'>
                                            {NavBtns.map((btn, idx) => (
                                                <li key={idx}><Link className='text-gray-600 font-medium hover:text-amber-600 transition duration-300' to={btn.to}>{btn.text}</Link></li>
                                            ))}
                                        </ul>
                                    </div>
                                    <h1 className='md:text-center text-2xl font-bold text-amber-600'>Meal<span className='text-amber-950'>.io</span></h1>
                                    <div className="hidden md:block">
                                        <div className='flex justify-end items-center space-x-4'>
                                            <Link className='text-amber-600 font-medium hover:text-amber-800 transition duration-300' to={"/login"}>login</Link>
                                            <Link className='text-amber-600 font-medium border border-amber-600 rounded-md px-5 py-2.5 hover:text-white hover:bg-amber-700 focus:ring focus:ring-amber-500 backdrop-blur-md transition duration-300' to={"/signup"}>Create an account</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DisclosurePanel className="md:hidden bg-white rounded-b-3xl shadow-sm mb-4">
                            <div className="space-y-1 px-4 pb-3 pt-2">
                                {NavBtns.map((btn) => (
                                    <DisclosureButton
                                        key={btn.text}
                                        as={Link}
                                        to={btn.to}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:text-amber-600 transition duration-200"
                                    >
                                        {btn.text}
                                    </DisclosureButton>
                                ))}
                            </div>
                            <div className="border-t-2 border-gray-200 mx-4 py-7 space-y-3">
                                <DisclosureButton as={Link} to="/signup" className="block rounded-lg px-4 py-3 text-base text-center font-medium bg-amber-600 text-white hover:bg-amber-700 hover:text-white transition duration-200">
                                    Create an account
                                </DisclosureButton>
                                <DisclosureButton as={Link} to="/login" className="block rounded-lg px-4 py-3 text-base text-center font-medium bg-transparent border border-amber-600 text-gray-600 hover:bg-amber-700 hover:text-white transition duration-200">
                                    Login
                                </DisclosureButton>
                            </div>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
    );
};