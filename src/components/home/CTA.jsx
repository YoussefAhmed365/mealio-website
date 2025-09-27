import { Link } from 'react-router-dom'

const AnimatedBackground = () => {
    const styles = {
        primary: 'from-amber-300 to-amber-500',
        secondary: 'from-amber-100 to-amber-300',
        accent: 'from-amber-50 to-amber-200',
    };

    if (typeof document !== 'undefined' && !document.getElementById('cta-animated-bg-keyframes')) {
        const style = document.createElement('style');
        style.id = 'cta-animated-bg-keyframes'
        style.innerHTML = `
            @keyframes moveShape1 {
                0% { transform: rotate(12deg) translateY(0px); }
                50% { transform: rotate(18deg) translateY(30px); }
                100% { transform: rotate(12deg) translateY(0px); }
            }
            @keyframes moveShape2 {
                0% { transform: rotate(-15deg) translateX(0px); }
                50% { transform: rotate(-10deg) translateX(30px); }
                100% { transform: rotate(-15deg) translateX(0px); }
            }
            @keyframes moveShape3 {
                0% { transform: scale(1) translateY(0px); }
                50% { transform: scale(1.1) translateY(-30px); }
                100% { transform: scale(1) translateY(0px); }
            }
            @keyframes moveShape4 {
                0% { transform: rotate(25deg) translateY(0px); }
                50% { transform: rotate(35deg) translateY(100px); }
                100% { transform: rotate(25deg) translateY(0px); }
            }
            @keyframes moveShape5 {
                0% { transform: rotate(-10deg) scaleX(1); }
                50% { transform: rotate(-5deg) scaleX(1.5); }
                100% { transform: rotate(-10deg) scaleX(1); }
            }
            @keyframes moveShape6 {
                0% { transform: translateY(0px) scale(1); }
                50% { transform: translateY(10px) scale(1.25); }
                100% { transform: translateY(0px) scale(1); }
            }
            @keyframes moveShape7 {
                0% { transform: rotate(45deg) translateY(0px); }
                50% { transform: rotate(60deg) translateY(-50px); }
                100% { transform: rotate(45deg) translateY(0px); }
            }
        `;
        document.head.appendChild(style);
    }

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none`}>
            {/* Large flowing shape - top right */}
            <div
                className={`absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br ${styles.primary} rounded-full opacity-20 blur-2xl animate-[moveShape1_5s_ease-in-out_infinite]`}
            />

            {/* Medium organic shape - bottom left */}
            <div
                className={`absolute -bottom-24 -left-24 w-80 h-64 bg-gradient-to-tr ${styles.secondary} opacity-15 blur-xl animate-[moveShape2_5s_ease-in-out_infinite]`}
                style={{
                    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                    transform: 'rotate(-15deg)'
                }}
            />

            {/* Small accent shape - top left */}
            <div
                className={`absolute top-16 left-16 w-32 h-32 bg-gradient-to-br ${styles.accent} rounded-full opacity-25 blur-lg animate-[moveShape3_5s_ease-in-out_infinite]`}
            />

            {/* Curved shape - right side */}
            <div
                className={`absolute top-1/3 -right-16 w-48 h-96 bg-gradient-to-l ${styles.primary} opacity-10 blur-xl animate-[moveShape4_5s_ease-in-out_infinite]`}
                style={{
                    borderRadius: '50% 0% 0% 50%',
                    transform: 'rotate(25deg)'
                }}
            />

            {/* Bottom accent */}
            <div
                className={`absolute bottom-8 right-1/4 w-40 h-20 bg-gradient-to-r ${styles.accent} opacity-20 blur-lg animate-[moveShape5_5s_ease-in-out_infinite]`}
                style={{
                    borderRadius: '50% 50% 0% 100%',
                    transform: 'rotate(-10deg)'
                }}
            />

            {/* Subtle background shapes */}
            <div
                className={`absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br ${styles.secondary} rounded-full opacity-10 blur-md transform -translate-x-1/2 -translate-y-1/2 animate-[moveShape6_5s_ease-in-out_infinite]`}
            />

            <div
                className={`absolute bottom-1/3 left-1/4 w-16 h-32 bg-gradient-to-t ${styles.primary} opacity-15 blur-md animate-[moveShape7_5s_ease-in-out_infinite]`}
                style={{
                    borderRadius: '0% 100% 50% 50%',
                    transform: 'rotate(45deg)'
                }}
            />
        </div>
    );
};

const CTA = () => {
    return (
        <div className="mt-20 w-full px-4 md:px-28 flex justify-center items-center">
            <div className='relative overflow-hidden w-full px-4 md:px-20 py-16 border-2 border-gradient-to-r from-gray-400 to-amber-300 rounded-3xl'>
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
                        <Link to={'/signup'} className="bg-amber-600 text-white font-semibold shadow-xs text-sm px-6 py-3 rounded-lg hover:bg-amber-700 transition duration-200">Get Started</Link>
                        <Link to={'/faq'} className="bg-white border text-gray-800 font-semibold text-sm/6 px-6 py-3 rounded-lg hover:bg-gray-100 hover:text-amber-900 transition-colors duration-200">Learn More</Link>
                    </div>

                    <div className="text-center mt-8 text-sm text-gray-500">
                        No credit card required • 14-day free trial • Cancel anytime
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTA;