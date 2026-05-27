const SearchBar = ({ searchText, setSearchText, onSearch }) => {

    const EnterKeyPress = (event) => {
        if (event.key === "Enter") {
            onSearch();
        }
    };

    return (
        <div className="search_bar">
            <input
                id="searchInput"
                name="search"
                type="text"
                aria-label="Search movies and series"
                placeholder="Search..."
                className="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={EnterKeyPress}
            />
        </div>
    );
};

export default SearchBar;