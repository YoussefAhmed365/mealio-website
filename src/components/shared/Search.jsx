import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const Search = ({ containerClassName, IconClassName, inputClassName, placeholder = "Search anything" }) => {
    return (
        <div className={`w-1/3 flex items-center bg-amber-100 rounded-xl px-3 py-2 border border-amber-300 ${containerClassName}`}>
            <MagnifyingGlassIcon className={`text-gray-500 mr-2 size-6 ${IconClassName}`} />
            <input
                type="text"
                placeholder={placeholder}
                className={`bg-transparent outline-hidden placeholder-gray-500 text-black w-full ${inputClassName}`}
            />
        </div>
    );
};

export default Search;