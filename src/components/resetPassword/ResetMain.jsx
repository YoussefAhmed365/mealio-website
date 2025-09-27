import { useState } from 'react'
import BGImage from '../../assets/images/reset-password.webp'
import Button from '../shared/Button'
import Field from '../shared/Field'

const ResetMain = () => {
    // Use state to manage which section is visible.
    // true: 'provide-email-container' is visible, false: 'send-mail-container' is visible
    const [showProvideEmail, setShowProvideEmail] = useState(true);
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setShowProvideEmail(false); // Switch to show the 'send-mail-container'
    };

    // Define Tailwind classes conditionally based on the 'showProvideEmail' state
    const provideEmailClasses = showProvideEmail
        ? 'left-1/2 -translate-x-1/2 opacity-100' // Visible in center
        : '-left-full -translate-x-0 opacity-0'   // Moved left, out of view

    const sendMailClasses = showProvideEmail
        ? 'left-full -translate-x-0 opacity-0'   // Off-right, out of view
        : 'left-1/2 -translate-x-1/2 opacity-100' // Visible in center

    const containerHeightClass = showProvideEmail
        ? 'h-96' // Height for 'provide-email-container'
        : 'h-80' // Height for 'send-mail-container'

    return (
        <div className="h-screen w-full flex items-center justify-center relative">
            <img
                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover -z-10'
                src={BGImage}
                alt='Background'
            />
            <div className={`bg-white rounded-lg shadow-2xl relative overflow-hidden ${containerHeightClass} transition-all duration-300 ease-in-out w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 p-4`}> {/* Added p-4 for internal padding */}
                {/* Provide Email Container */}
                <div
                    className={`absolute top-1/2 -translate-y-1/2 p-8 w-full h-full transition-all duration-300 ease-in-out ${provideEmailClasses}`}
                >
                    <h2 className='text-xl font-bold mb-6 text-center'><span className='text-amber-600'>Meal</span><span className='text-amber-950'>.io</span></h2>
                    <h1 className='text-2xl font-semibold mb-4 text-center'>Forgot your password?</h1>
                    <h3 className='mb-6 text-center text-gray-600'>Enter your email address below and we'll send you a link to reset your password.</h3>

                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <Field label={"Email"} type='email' name={"email"} id={"email"} placeholder={"Your Email"} required={true} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Button type='submit' children='Send Reset Link' />
                    </form>
                </div>

                {/* Send Mail Confirmation Container */}
                <div
                    className={`absolute top-1/2 -translate-y-1/2 p-8 w-full h-full transition-all duration-300 ease-in-out ${sendMailClasses}`}
                >
                    <h2 className='text-xl font-bold mb-6 text-center'><span className='text-amber-600'>Meal</span><span className='text-amber-950'>.io</span></h2>
                    <h1 className='text-2xl font-semibold mb-4 text-center'>Check your email!</h1>
                    <p className='mb-3 textsm text-center text-gray-600'>We've sent a reset link to <span className='font-semibold text-gray-800'>{email}</span>. Please check your inbox or spam folder.</p>
                    <h6 className='mb-4 text-center text-sm font-semibold text-gray-700'>Didn't recieve the email? <Button styleType='link' children={'Resend Link'} /></h6>
                    <Button onclick={() => setShowProvideEmail(true)} styleType='secondary' children={"Go Back"} />
                </div>
            </div>
        </div>
    );
};

export default ResetMain;