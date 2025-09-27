const Field = ({ label, type = "text", name, id, value, required = false, placeholder, autoComplete = "off", className, onChange }) => {
    const classMap = {
        hidden: "hidden",
        text: "w-full px-3 border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-transparent transition",
        email: "w-full px-3 border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:invalid:ring-red-500 invalid:ring-red-500 invalid:text-red-500 transition",
        password: "w-full px-3 border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-transparent transition",
    }

    if (label) {
        return (
            <label htmlFor={id} className="w-full relative block">
                <span className="text-sm/6 font-bold text-gray-700 absolute bottom-10 left-3">{label}</span>
                <input
                    type={type}
                    name={name}
                    id={id}
                    value={value}
                    required={required}
                    placeholder={placeholder}
                    className={'pt-10 pb-2 ' + classMap[type] || classMap['text'] + ' pt-10 ' + className}
                    autoComplete={autoComplete}
                    onChange={onChange}
                />
            </label>
        );
    } else {
        return (
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                required={required}
                placeholder={placeholder}
                className={'py-2 ' + classMap[type] || classMap['text'] + ' py-2 ' + className}
                autoComplete={autoComplete}
                onChange={onChange}
            />
        );
    }
};

export default Field;