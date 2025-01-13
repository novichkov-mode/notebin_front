import React, {useState} from "react";
import "mdb-ui-kit/css/mdb.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function SearchBar({onSearch, doSearch, text}) {
    const [inputValue, setInputValue] = useState(""); // Локальное состояние

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        onSearch(event.target.value);
    };

    const makeSearch = (event) => {
        doSearch(inputValue)
    };

    return (
        <div style={{width: '100%'}}>
            <div className="input-group rounded">
                <input id='searchBar'
                       type="search"
                       className="form-control rounded"
                       placeholder={text}
                       aria-label="Search"
                       aria-describedby="search-addon"
                       onChange={handleInputChange}/>
                <button type='button'
                        className="input-group-text border-0"
                        id="search-addon"
                        onClick={makeSearch}>
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
