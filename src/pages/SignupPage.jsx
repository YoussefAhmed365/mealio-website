import { Link } from "react-router-dom"
import Field from "../components/shared/Field"
import Button from "../components/shared/Button"
import BackgroundImage from "../assets/images/login-signup-bg.webp"
import GoogleIcon from "../assets/icons/Google"
import MicrosoftIcon from "../assets/icons/Microsoft"
import FacebookIcon from "../assets/icons/Facebook"

const SignupPage = () => {
    return (
        <div className="p-5 h-screen sm:px-20 sm:py-7">
            <div className="max-w-full h-full mx-auto flex justify-center items-center gap-6 sm:flex-row sm:justify-between sm:items-stretch sm:gap-20">
                <div className="w-full h-full flex flex-col justify-center items-start gap-2">
                    <h6 className="text-xl font-bold"><span className="text-amber-600">Meal</span><span className="text-amber-950">.io</span></h6>
                    <h1 className="text-3xl font-bold sm:text-4xl">Create a new account!</h1>
                    <p className="text-gray-600 font-medium">Join us now and try Meal.io to see the magic in planning</p>

                    <form className="w-full flex flex-col justify-start items-center space-y-3 mt-2">
                        <Field label={'First Name'} type='text' name={'first-name'} id={'first-name'} placeholder={'Your First Name'} required />
                        <Field label={'Last Name'} type='text' name={'last-name'} id={'last-name'} placeholder={'Your Last Name'} required />
                        <Field label={'Email'} type='email' name={'email'} id={'email'} placeholder={'Your Email'} required />
                        <Field label={'Password'} type='password' name={'password'} id={'password'} placeholder={'Your Password'} required />
                        <Button type='submit' className="mt-4" children='Sign Up' />
                    </form>

                    <div className="w-full mt-4 flex justify-center items-center gap-x-2.5">
                        <span className="bg-slate-400 h-px w-full"></span>
                        <span className="text-slate-700">OR</span>
                        <span className="bg-slate-400 h-px w-full"></span>
                    </div>
                    
                    <div className="w-full mt-2 flex justify-between items-center gap-5">
                        <button className="w-full py-3 border border-gray-400 rounded-md bg-transparent flex justify-center items-center text-gray-950 hover:bg-slate-100 transition duration-200">
                            <GoogleIcon />
                        </button>
                        <button className="w-full py-3 border border-gray-400 rounded-md bg-transparent flex justify-center items-center text-gray-950 hover:bg-slate-100 transition duration-200">
                            <MicrosoftIcon />
                        </button>
                        <button className="w-full py-3 border border-gray-400 rounded-md bg-transparent flex justify-center items-center text-gray-950 hover:bg-slate-100 transition duration-200">
                            <FacebookIcon />
                        </button>
                    </div>

                    <div className="w-full mt-4 text-center text-sm font-medium">
                        <span>Already have an account? </span><Link key={"login"} to={"/login"} className="text-amber-600 underline hover:text-amber-800 focus:text-amber-950 transition">Sign In</Link>
                    </div>
                </div>

                <div className="w-full h-auto rounded-2xl bg-center bg-cover bg-no-repeat hidden sm:flex justify-center items-end px-8 py-12 absolute sm:relative -z-10 sm:z-0" style={{ backgroundImage: `url(${BackgroundImage})` }}>
                    <div>
                        <div className="flex justify-start items-center gap-4 mb-5">
                            <button className="px-4 py-1.5 bg-transparent border border-gray-300 text-slate-100 font-medium rounded-lg backdrop-filter hover:bg-slate-400/30 hover:backdrop-blur-md transition">Community of chiefs</button>
                            <button className="px-4 py-1.5 bg-transparent border border-gray-300 text-slate-100 font-medium rounded-lg backdrop-filter hover:bg-slate-400/30 hover:backdrop-blur-md transition">Creative recipes</button>
                        </div>
                        <div className="w-full h-1/3 bg-slate-400/40 backdrop-filter backdrop-blur-md rounded-2xl border border-slate-300 p-3 text-white flex flex-col justify-between items-start">
                            <h2 className="text-xl">I have generated my weekly plan in easy way just with one tap, managed meals, set salary, and track my calories.</h2>
                            <h6 className="text-gray-100 mt-6 mb-3">John Doe</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;