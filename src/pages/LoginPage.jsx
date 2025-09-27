import { Link } from "react-router-dom"
import Field from "../components/shared/Field"
import Button from "../components/shared/Button"
import BackgroundImage from "../assets/images/login-signup-bg.webp"
import GoogleIcon from "../assets/icons/Google"
import MicrosoftIcon from "../assets/icons/Microsoft"
import FacebookIcon from "../assets/icons/Facebook"
import SparkleIcon from "../assets/icons/Sparkle"

const LoginPage = () => {
    return (
        <div className="p-5 h-screen sm:px-20 sm:py-7">
            <div className="max-w-full h-full mx-auto flex flex-col-reverse justify-center items-center gap-6 sm:flex-row sm:justify-between sm:items-stretch sm:gap-20">
                <div className="w-full h-full flex flex-col justify-center items-start gap-2">
                    <h6 className="text-xl font-bold"><span className="text-amber-600">Meal</span><span className="text-amber-950">.io</span></h6>
                    <h1 className="text-xl font-bold sm:text-4xl">Welcome back!</h1>
                    <p className="text-gray-600 font-medium">To keep connected with us please login with your personal info</p>

                    <form className="w-full flex flex-col justify-start items-center gap-2 mt-2">
                        <Field label={'Email'} type='email' name={'email'} id={'email'} placeholder={'Your Email'} required />
                        <Field label={'Password'} type='password' name={'password'} id={'password'} placeholder={'Your Password'} required />
                        <Button type='submit' className="mt-4" children='Sign In' />
                    </form>

                    <div className="w-full mt-2 text-sm font-medium">
                        <Link key={"restore-account"} to={"/restore-account"} className="text-amber-600 underline hover:text-amber-700 transition">Forgot your password?</Link>
                    </div>

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
                        <span>Don't have an account? </span><Link key={"signup"} to={"/signup"} className="text-amber-600 underline hover:text-amber-800 focus:text-amber-950 transition">Create a new account</Link>
                    </div>
                </div>

                <div className="w-full h-auto rounded-xl bg-center bg-cover bg-no-repeat hidden sm:flex justify-center items-end px-8 py-12 absolute sm:relative -z-10 sm:z-0" style={{ backgroundImage: `url(${BackgroundImage})` }}>
                    <div className="w-full h-full bg-slate-400/30 backdrop-filter backdrop-blur-lg rounded-xl px-8 py-12 text-white flex flex-col justify-between items-start">
                        <div>
                            <div className="w-1/4 flex justify-center items-center gap-x-2.5 mb-10">
                                <span className="bg-white h-px w-full"></span>
                                <span className="font-semibold text-lg">Meal.io</span>
                                <span className="bg-white h-px w-full"></span>
                            </div>
                            <h6 className="font-semibold mb-4">We are</h6>
                            <h1 className="text-3xl mb-4">Plan your meals.</h1>
                            <p className="text-gray-100">10 million+ people joined our app, be one of them now</p>
                        </div>
                        <h6 className="text-gray-100 relative">Powered with AI <SparkleIcon className="absolute bottom-4 left-full w-4 h-4 filter brightness-0 invert" size={3} /></h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;