import React from "react";

function SearchBar({ value, onChange }) {
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search by name..."
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default SearchBar;