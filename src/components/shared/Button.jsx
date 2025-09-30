const Button = ({ key, onClick, children, type = "button", styleType = "primary", className, disabled = false }) => {
    const classMap = {
        primary: "w-full px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 disabled:bg-amber-300 focus:ring-4 focus:ring-amber-300 focus:ring-opacity-75 focus:outline-hidden transition-colors duration-200",
        secondary: "w-full px-6 py-3 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400 disabled:bg-gray-100 focus:ring-4 focus:ring-gray-300 focus:ring-opacity-75 focus:outline-hidden transition-colors duration-200",
        success: "w-full px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 disabled:bg-green-300 focus:ring-4 focus:ring-green-300 focus:ring-opacity-75 focus:outline-hidden transition-colors duration-200",
        warning: "w-full px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 disabled:bg-yellow-300 focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-75 focus:outline-hidden transition-colors duration-200",
        danger: "w-full px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:bg-red-300 focus:ring-4 focus:ring-red-300 focus:ring-opacity-75 focus:outline-hidden transition-colors duration-200",
        blue: "w-full px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:bg-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75 focus:outline-hidden transition-colors duration-200",
        light: "w-full px-6 py-3 bg-gray-200 font-medium rounded-lg hover:bg-gray-300 disabled:bg-gray-100 focus:ring-4 focus:ring-gray-300 focus:ring-opacity-75 focus:outline-hidden transition-colors duration-200",
        white: "w-full px-6 py-3 bg-white font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 focus:ring-4 focus:ring-gray-300 focus:ring-opacity-75 focus:outline-hidden transition-colors duration-200",
        dark: "w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-black disabled:bg-gray-600 focus:ring-4 focus:ring-gray-700 focus:ring-opacity-75 focus:outline-hidden transition-colors duration-200",
        outline: "w-full px-6 py-3 bg-transparent border border-amber-600 text-amber-600 rounded-lg font-medium hover:bg-amber-600 disabled:hover:bg-amber-100 hover:text-white focus:ring-4 focus:ring-amber-300 focus:ring-opacity-75 focus:outline-hidden transition-colors duration-200",
        link: "w-fit p-0 bg-transparent border-0 text-amber-600 hover:underline disabled:text-amber-400",
        text: "w-fit p-0 bg-transparent border-0 text-gray-600 hover:text-amber-600 disabled:text-gray-400"
    };

    return (
        <button key={key} onClick={onClick} className={classMap[styleType] + " " + className} type={type} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;