import styled from 'styled-components';

const StyledLabel = styled.label`
	font-family: 'Roboto Bold', sans-serif;
	font-size: 1.5rem;
	text-decoration: none;
`;

const StyledListContainer = styled.div`
	margin: 1.5rem;
	padding: 0.5rem;
	border: 1px solid darkGray;
`;

const StyledList = styled.ul`
	padding-left: 1rem;
	font-size: 1rem;
`;

const StyledListItem = styled.li`
	font-family: 'Roboto Regular', sans-serif;
	list-style: none;
`;

const StyledSelectedListItem = styled.li`
	font-family: 'Roboto Regular', sans-serif;
	list-style: none;
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
				<StyledLabel>Select a city</StyledLabel>
				<StyledListContainer>
					<div>{selected.label}</div>
					<StyledList>{renderedList}</StyledList>
				</StyledListContainer>
			</div>
		</div>
	);
};

export default SearchDropdown;
