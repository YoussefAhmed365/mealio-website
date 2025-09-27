// Components & Libraries
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import Button from '../shared/Button'

// Icons
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Facebook from '../../assets/icons/Facebook'
import Instagram from '../../assets/icons/Instagram'
import XTwitter from '../../assets/icons/Xtwitter'
import Behance from '../../assets/icons/Behance'
import SparkleIcon from '../../assets/icons/Sparkle'

import HeroBG from '../../assets/images/HeroBG.jpg'
import HeroWaves from '../../assets/images/heroWaves.svg'

import './css/Hero.css'

export default function HeroSection() {
    const NavBtns = [
        { to: "/", text: "Featured" },
        { to: "/", text: "How It Works" },
        { to: "/", text: "Community" },
        { to: "/", text: "Articles" }
    ];

    const SocialIcons = [
        { to: "/", icon: Facebook },
        { to: "/", icon: Instagram },
        { to: "/", icon: XTwitter },
        { to: "/", icon: Behance },
    ];

    return (
        <header className='relative'>
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
                                            <Link className='text-amber-600 font-medium border border-amber-600 rounded-md px-5 py-2.5 hover:text-white hover:bg-amber-700 focus:ring focus:ring-amber-500 transition duration-300' to={"/signup"}>Create an account</Link>
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

            <div className='hidden md:block absolute bg-amber-100 w-1/3 h-screen left-0 top-0 -z-10'>
                <div className='relative h-full'>
                    <img alt='Hero Waves' src={HeroWaves} className='absolute -bottom-[2.1rem] left-0 w-0 md:w-full' />
                </div>
            </div>

            <div className='flex justify-center items-center px-8 md:px-0 space-x-0 md:space-x-14'>
                <div className='w-1/3 h-[35rem] hidden md:block relative'>
                    <img alt='Hero Widget' src={HeroBG} className='w-full h-full rounded-xl object-cover contrast-125 shadow-xl' />
                    <div className='absolute w-fit h-fit left-10 bottom-10 bg-white shadow-sm rounded-lg p-5 flex flex-col justify-between items-center'>
                        <div className='space-y-3'>
                            <h1 className='text-6xl font-bold'>18k+</h1>
                            <p className='text-gray-600 font-medium'>Projects Done</p>
                        </div>
                        <hr className='w-4/5 my-4' />
                        <div className='space-y-3'>
                            <h1 className='text-6xl font-bold'>20+</h1>
                            <p className='text-gray-600 font-medium'>Awards Winning</p>
                        </div>
                    </div>
                </div>

                <div className='space-y-6 w-full md:w-1/2'>
                    <h2 className='text-amber-600 text-3xl' style={{ fontFamily: "Winslow-regular" }}>From Cravings to Calendar, Seamlessly.</h2>

                    <h1 className='text-6xl font-bold leading-tight relative'>Crafting Your Ideal<br />Weekly Menu, Intelligently<br /><span className='font-bold' style={{ fontFamily: "Winslow-medium" }}>Designed</span><SparkleIcon className='absolute bottom-16 left-64 size-8 text-yellow-200' /></h1>

                    <div className='flex justify-start items-start space-x-3'>
                        <p className='text-gray-500 text-lg min-w-fit'>———</p>

                        <p className='text-gray-600 font-medium'>We help you plan your meals with the power of AI. Meal.io is an integrated application designed to simplify the process of planning daily and weekly meals. Our core innovation lies in using AI to provide intelligent, creative, and interactive meal plans that dynamically adapt to your needs.</p>
                    </div>

                    <div className='flex justify-start items-center space-x-3'>
                        <Button className={"max-w-fit flex justify-center items-center space-x-4"}>Learn More <ChevronRightIcon className='size-4 m-0 text-white' strokeWidth={2.5} /></Button>

                        <div className='flex min-h-full items-center group'>
                            {SocialIcons.map((social, idx) => (
                                <div
                                    key={idx}
                                    className={'flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-amber-600 text-white shadow-lg hover:shadow-sm transform transition-all duration-300 ease-in-out hover:bg-amber-800 hover:-translate-y-1 -ml-4 first:ml-0 group-hover:ml-1'}
                                >
                                    <Link to={social.to}>
                                        <social.icon />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};