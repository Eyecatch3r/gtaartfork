import React, { useState } from 'react';


export default function Searchbar({ searchProduct }) {
    const [inputValue, setInputValue] = useState('');

    function handleInputChange(event) {
        setInputValue(event.target.value);
        searchProduct(event.target.value);
    }

    return (
        <div className="md:w-8/12 w-10/12">
            <form
                className="flex items-center h-10 w-full border-2 border-black rounded-full p-2 dark:border-white"
                onSubmit={(e) => e.preventDefault()}
            >
                <label htmlFor="simple-search" className="sr-only">
                    Search
                </label>
                <div className="h-full w-full">
                    <input
                        type="text"
                        id="search"
                        className="text-lg font-bold h-full w-full bg-transparent px-3 focus:outline-none focus:border-none"
                        placeholder="What are you searching for?"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="p-2 bg-transparent rounded-full">
                    <svg
                        className="w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={3}
    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </form>
        </div>
    );
}
