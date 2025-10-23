import React, { useState, useRef, useEffect } from 'react'
import BGImage from '../assets/images/reset-password.webp'
import Button from '../components/shared/Button'
import Field from '../components/shared/Field'

const OTPPasswordResetPage = () => {
    // State to hold the OTP digits, initialized as an array of empty strings
    const [otp, setOtp] = useState(new Array(6).fill(''));
    // Refs for each input field to manage focus
    const inputRefs = useRef([]);

    // Use useEffect to initialize inputRefs
    useEffect(() => {
        // Dynamically create refs for each input field
        inputRefs.current = otp.map((_, i) => inputRefs.current[i] ?? React.createRef());
    }, [otp]); // Re-run if otp array structure changes (though unlikely for a fixed size)

    /**
     * Handles changes in an individual OTP input field.
     * @param {number} index - The index of the input field that changed.
     * @param {string} value - The new value of the input field.
     */
    const handleChange = (index, value) => {
        // Ensure only digits are entered and only one character per field
        if (!/^\d*$/.test(value) || value.length > 1) {
            return; // Prevent non-digit or multi-character input
        }

        const newOtp = [...otp]; // Create a mutable copy of the OTP array
        newOtp[index] = value; // Update the specific digit

        setOtp(newOtp); // Update the state

        // If a digit was entered and it's not the last field, move focus to the next field
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.current?.focus();
        }
    };

    /**
     * Handles keydown events, specifically for backspace.
     * @param {number} index - The index of the input field.
     * @param {Object} e - The keyboard event object.
     */
    const handleKeyDown = (index, e) => {
        // If backspace is pressed and the current field is empty, move focus to the previous field
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.current?.focus();
        }
    };

    /**
     * Handles paste events for the OTP field.
     * It attempts to paste the first six digits from the clipboard into the fields.
     * @param {Object} e - The paste event object.
     */
    const handlePaste = (e) => {
        e.preventDefault(); // Prevent default paste behavior
        const pasteData = e.clipboardData.getData('text/plain'); // Get pasted text
        const digits = pasteData.replace(/\D/g, '').substring(0, otp.length).split(''); // Extract digits, limit to OTP length

        const newOtp = new Array(otp.length).fill(''); // Start with empty array
        digits.forEach((digit, i) => {
            if (i < otp.length) {
                newOtp[i] = digit; // Fill with pasted digits
            }
        });

        setOtp(newOtp); // Update OTP state

        // Move focus to the last filled field or the last field if all are filled
        const lastFilledIndex = Math.min(digits.length - 1, otp.length - 1);
        if (lastFilledIndex >= 0) {
            inputRefs.current[lastFilledIndex]?.current?.focus();
        }
    };

    // Determine if the OTP is complete (all fields filled)
    const isOtpComplete = otp.every(digit => digit.length === 1);

    // Use state to manage which section is visible.
    // true: 'provide-email-container' is visible, false: 'send-mail-container' is visible
    const [checkOTP, setCheckOTP] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setCheckOTP(false); // Switch to show the 'send-mail-container'
    };

    // Define Tailwind classes conditionally based on the 'checkOTP' state
    const provideEmailClasses = checkOTP
        ? 'left-1/2 -translate-x-1/2 opacity-100' // Visible in center
        : '-left-full -translate-x-0 opacity-0'   // Moved left, out of view

    const sendMailClasses = checkOTP
        ? 'left-full -translate-x-0 opacity-0'   // Off-right, out of view
        : 'left-1/2 -translate-x-1/2 opacity-100' // Visible in center

    const containerHeightClass = checkOTP
        ? 'h-96' // Height for 'provide-email-container'
        : 'h-96' // Height for 'send-mail-container'

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
                    <h1 className='text-2xl font-semibold mb-4 text-center'>Enter your OTP code</h1>
                    <h3 className='mb-6 text-center text-gray-600'>Please enter the 6-digit code sent to your email.</h3>

                    <div className="flex justify-center space-x-2 sm:space-x-3 mb-8" onPaste={handlePaste}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text" // Use text type to handle single digits and paste more easily
                                inputMode="numeric" // Suggest numeric keyboard on mobile
                                maxLength="1" // Limit to one character
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                ref={inputRefs.current[index]}
                                className="w-10 h-14 sm:w-12 sm:h-16 text-center text-3xl font-bold text-gray-800
                         bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                         focus:border-amber-500 focus:ring-2 focus:ring-amber-200
                         outline-hidden transition-all duration-200 ease-in-out
                         focus:scale-105"
                            />
                        ))}
                    </div>

                    <Button onclick={handleSubmit} disabled={!isOtpComplete} styleType='primary' children={"Verify OTP"} className={isOtpComplete
                        ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg'
                        : 'bg-amber-300 text-amber-100 cursor-not-allowed hover:bg-amber-200'
                    } />
                </div>

                {/* Send Mail Confirmation Container */}
                <div
                    className={`absolute top-1/2 -translate-y-1/2 p-8 w-full h-full transition-all duration-300 ease-in-out ${sendMailClasses}`}
                >
                    <h2 className='text-xl font-bold mb-6 text-center'><span className='text-amber-600'>Meal</span><span className='text-amber-950'>.io</span></h2>
                    <h1 className='text-2xl font-semibold mb-4 text-center'>Create a new password</h1>
                    <p className='mb-6 text-center text-gray-600'>Your OTP has been verified. You can now create a new password for your account.</p>

                    <form className='space-y-4'>
                        <Field id={'username'} name={'username'} value={'username'} type='hidden' autoComplete='off' />
                        <Field label={'New Password'} id={'new-password'} name={'new-password'} type='password' placeholder={'Enter your new password'} required={true} className={'mb-4'} />

                        <Button onclick={() => alert('Password reset functionality to be implemented.')} styleType='primary' children={"Reset Password"} className='shadow-md hover:shadow-lg' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OTPPasswordResetPage;