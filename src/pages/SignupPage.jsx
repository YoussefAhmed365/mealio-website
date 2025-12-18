// Libraries
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Components
import Field from "../components/shared/Field";
import Button from "../components/shared/Button";

// Images & Icons
import BackgroundImage from "../assets/images/login-signup-bg.webp";
import GoogleIcon from "../assets/icons/Google";
import MicrosoftIcon from "../assets/icons/Microsoft";
import FacebookIcon from "../assets/icons/Facebook";

const SignupPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        if (!firstName || !lastName || !email || !password) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        const result = await register(firstName, lastName, email, password);

        setLoading(false);

        if (result.success) {
            navigate("/get-started");
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="px-6 py-10 md:px-20 md:py-7">
            <div className="max-w-full mx-auto flex flex-col-reverse justify-center items-center gap-10 md:flex-row md:justify-between md:items-stretch md:gap-20">
                <div className="w-full flex flex-col justify-center items-start gap-2">
                    <h6 className="text-2xl md:text-xl font-bold"><span className="text-amber-600">Meal</span><span className="text-amber-950">.io</span></h6>
                    <h1 className="text-4xl font-bold">Create a new account!</h1>
                    <p className="text-gray-600 font-medium">Join us now and try Meal.io to see the magic in planning</p>

                    {/* Error Message Display */}
                    {error && (
                        <div className="w-full text-center mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded transition-opacity duration-300">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="w-full flex flex-col justify-start items-center space-y-3 mt-2">
                        <div className="flex w-full justify-center items-center space-x-3">
                            <Field label={'First Name'} className={"flex-1"} type='text' name={'first-name'} id={'first-name'} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={'Your First Name'} required />
                            <Field label={'Last Name'} className={"flex-1"} type='text' name={'last-name'} id={'last-name'} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={'Your Last Name'} required />
                        </div>
                        <Field label={'Email'} type='email' name={'email'} id={'email'} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Your Email'} required />
                        <Field label={'Password'} type='password' name={'password'} id={'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={'Your Password'} required />
                        <Field label={'Confirm Password'} type='password' name={'confirm-password'} id={'confirm-password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={'Confirm Your Password'} required />
                        <Button type='submit' className="mt-4" children='Sign Up' disabled={loading} />
                    </form>

                    <div className="w-full mt-4 flex justify-center items-center gap-x-2.5">
                        <span className="bg-slate-400 h-px w-full"></span>
                        <span className="text-slate-700">OR</span>
                        <span className="bg-slate-400 h-px w-full"></span>
                    </div>

                    <div className="w-full mt-2 flex justify-between items-center gap-5">
                        <button className="w-full py-4 border border-gray-400 rounded-md bg-transparent flex justify-center items-center text-gray-950 hover:bg-slate-100 transition duration-200">
                            <GoogleIcon className="size-7" />
                        </button>
                        <button className="w-full py-4 border border-gray-400 rounded-md bg-transparent flex justify-center items-center text-gray-950 hover:bg-slate-100 transition duration-200">
                            <MicrosoftIcon className="size-7" />
                        </button>
                        <button className="w-full py-4 border border-gray-400 rounded-md bg-transparent flex justify-center items-center text-gray-950 hover:bg-slate-100 transition duration-200">
                            <FacebookIcon className="size-7" />
                        </button>
                    </div>

                    <div className="w-full mt-4 text-center text-sm font-medium">
                        <span>Already have an account? </span><Link key={"login"} to={"/login"} className="text-amber-600 underline hover:text-amber-800 focus:text-amber-950 transition">Sign In</Link>
                    </div>
                </div>

                <div className="w-full h-fit md:h-auto rounded-2xl bg-center bg-cover bg-no-repeat flex justify-center items-end px-4 md:px-8 py-6 md:py-12" style={{ backgroundImage: `url(${BackgroundImage})` }}>
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