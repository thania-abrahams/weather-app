import { useState } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
	font-family: 'Roboto Bold', sans-serif;
	font-size: 1.5rem;
	text-decoration: none;
`;

const StyledListContainer = styled.div`
	margin: 15px;
	padding: 10px;
	border: 1px solid darkGray;
	border-radius: 5px;
`;

const StyledList = styled.ul`
	padding-left: 10px;
	font-size: 1rem;
`;

const StyledListItem = styled.li`
	font-family: 'Roboto Regular', sans-serif;
	list-style: none;
	cursor: pointer;

	&:hover {
		font-size: scale(1.1);
	}
`;

const StyledSelectedListItem = styled.li`
	font-family: 'Roboto Regular', sans-serif;
	list-style: none;
`;

const SearchDropdown = ({ cities, selected, handleSelectedChange }) => {
	const [expanded, setExpanded] = useState(false);

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
