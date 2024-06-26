import "./searchinput.component.css"
import {useState} from "react";

interface SearchProps {
    onFocus: () => void;
    onSearch: (value: string) => void;
}

const SearchInput = ({onFocus, onSearch}: SearchProps) => {
    const [inputValue, setInputValue] = useState<string>("")
    return (
        <div className={"root_input "}>
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <input onChange={(e) => setInputValue(e.target.value)} onFocus={onFocus} type="search"
                       id="default-search"
                       className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                       placeholder="Введите критерии поиска" required/>
                <button type="submit"
                        onClick={() => onSearch(inputValue)}
                        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Поиск
                </button>
            </div>
        </div>
    );
};

export default SearchInput;