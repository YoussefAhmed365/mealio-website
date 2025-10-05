// Components & Libraries
import MainNavbar from '../shared/MainNavbar'
import { Link } from 'react-router-dom'
import Button from '../shared/Button'

// Icons
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import FacebookIcon from '../../assets/icons/Facebook'
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
        { to: "/", icon: FacebookIcon },
        { to: "/", icon: Instagram },
        { to: "/", icon: XTwitter },
        { to: "/", icon: Behance },
    ];

    return (
        <header className='relative'>
            <MainNavbar />

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
                                        <social.icon className='size-4' />
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