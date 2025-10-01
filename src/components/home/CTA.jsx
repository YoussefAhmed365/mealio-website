import { Link } from 'react-router-dom'
import AnimatedBackground from '../../animations/AnimatedBackground'

const CTA = () => {
    return (
        <main className="mt-20 w-full px-4 md:px-28 flex justify-center items-center">
            <div className='p-0.5 rounded-3xl w-full bg-gradient-to-r from-gray-200 to-amber-100'>
                <div className='relative bg-white overflow-hidden px-4 md:px-20 py-16 rounded-[22px]'>
                    <AnimatedBackground />
                    <div className="relative z-10 flex flex-col justify-center items-center">
                        <div className="mb-6">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 backdrop-blur-xs border border-gray-200 mb-6">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">Don't wait. Start today</span>
                            </div>
                        </div>

                        <h1 className="text-5xl font-bold text-center">Join & plan with <span className="text-amber-600">Meal</span><span className="text-amber-950">.io</span> now!</h1>
                        <h3 className="w-full md:w-2/3 text-xl font-medium text-center mt-7 text-gray-700">Sign up for free, plan your weekly meals, track your progress, and try out new recipes.</h3>
                        <div className="mt-10 flex justify-center items-center space-x-2">
                            <Link to={'/signup'} className="bg-amber-600 text-white font-semibold shadow-sm text-sm px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200">Get Started</Link>
                            <Link to={'/faq'} className="bg-transparent border text-gray-800 font-semibold text-sm px-6 py-3 rounded-lg hover:text-amber-600 transition-colors duration-200">Learn More</Link>
                        </div>

                        <div className="text-center mt-8 text-sm text-gray-500">
                            No credit card required • 30-day free trial • Cancel anytime
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CTA;