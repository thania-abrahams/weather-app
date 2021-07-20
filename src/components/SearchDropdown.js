import styled from 'styled-components';

const StyledListItem = styled.li`
	font-family: 'Roboto Regular', sans-serif;
	display: flex;
	text-decoration: none;
`;

const SearchDropdown = ({ cities, selected, handleSelectedChange }) => {
	const renderedList = cities.map((city) => {
		//We do not want the selected city to display inside of the list as this would be redundant
		if (city.value === selected.value) {
			return null;
		}

		return (
			<StyledListItem
				key={city.value}
				onClick={() => handleSelectedChange(city)}
			>
				{city.label}
			</StyledListItem>
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
