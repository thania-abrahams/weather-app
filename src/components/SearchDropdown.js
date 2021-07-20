import styled from 'styled-components';

const styledListItem = styled.li`
    text-decoration

`;

const SearchDropdown = ({ cities, selected, handleSelectedChange }) => {
	const renderedList = cities.map((city) => {
		//We do not want the selected city to display inside of the list as this would be redundant
		if (city.value === selected.value) {
			return null;
		}

		return (
			<li key={city.value} onClick={() => handleSelectedChange(city)}>
				{city.label}
			</li>
		);
	});

	return (
		<div>
			<div>
				<label>Select a city</label>
				<div>
					<div>{selected.label}</div>
					<ul>{renderedList}</ul>
				</div>
			</div>
		</div>
	);
};

export default SearchDropdown;
