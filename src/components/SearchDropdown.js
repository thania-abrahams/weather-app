const SearchDropdown = ({ cities, selected, handleSelectedChange }) => {
    const renderedList = cities.map((city) => {
        return (
            <li key={city.value} onClick={() => handleSelectedChange(city)}>
                {city.label}
            </li>
        );
    })

    return (
        <div>
            <div>
                <label>Select a city</label>
                <div>
                    <div>{selected.label}</div>
                    <ul>
                        {renderedList}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SearchDropdown;