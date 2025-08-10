import React, { useState, useEffect, useCallback } from 'react';

const SearchBar = ({ onSearch, placeholder = 'Search tickets...' }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearch = useCallback(
        debounce((term) => {
            onSearch(term);
        }, 300),
        [onSearch]
    );

    useEffect(() => {
        debouncedSearch(searchTerm);

        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm, debouncedSearch]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClear = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <div className="search-bar">
            <form onSubmit={(e) => e.preventDefault()} role="search">
                <div className="search-input-wrapper">
                    <input
                        type="search"
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={handleChange}
                        aria-label="Search tickets by title, description, or priority"
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="clear-button"
                            aria-label="Clear search"
                        >
                            ✕
                        </button>
                    )}
                    <button
                        type="submit"
                        className="search-button"
                        aria-label="Search"
                    >
                        <span role="img" aria-hidden="true">🔍</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

function debounce(func, wait) {
    let timeout;

    const debounced = (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };

    debounced.cancel = () => clearTimeout(timeout);

    return debounced;
}

export default React.memo(SearchBar);
