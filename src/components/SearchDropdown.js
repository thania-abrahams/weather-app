import { useState, useEffect, useRef } from 'react';
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react';
import styled from 'styled-components';

// const StyledLabel = styled.label`
// 	font-family: 'Roboto Bold', sans-serif;
// 	font-size: 1.5rem;
// 	text-decoration: none;
// `;

// const StyledListContainer = styled.div`
// 	margin: 15px;
// 	padding: 10px;
// 	border: 1px solid darkGray;
// 	border-radius: 5px;
// `;

// const StyledList = styled.ul`
// 	padding-left: 10px;
// 	font-size: 1rem;
// `;

// const StyledListItem = styled.li`
// 	font-family: 'Roboto Regular', sans-serif;
// 	list-style: none;
// 	cursor: pointer;

// 	&:hover {
// 		font-size: scale(1.1);
// 	}
// `;

// const StyledSelectedListItem = styled.li`
// 	font-family: 'Roboto Regular', sans-serif;
// 	list-style: none;
// `;

const SearchDropdown = ({ cities, selected, handleSelectedChange }) => {
	const [expanded, setExpanded] = useState(false);
	const ref = useRef();

	useEffect(() => {
		document.body.addEventListener('click', (e) => {
			//If element clicked on is inside of dropdown then return early
			if (ref.current && ref.current.contains(e.target)) {
				return;
			}

			//Body clicked on so set state to close dropdown
			setExpanded(false);
		});
	}, []);

	const renderedList = cities.map((city) => {
		//We do not want the selected city to display inside of the list as this would be redundant
		if (city.value === selected.value) {
			return null;
		}

		return (
			<div
				className="item"
				key={city.value}
				onClick={() => handleSelectedChange(city)}
			>
				{city.label}
			</div>
		);
	});

	return (
		<div className="ui form" ref={ref}>
			<div className="field">
				<label className="label">Select a city</label>
				<div
					//If state.expanded === open then show dropdown
					className={`ui selection dropdown ${
						expanded ? 'visible active' : ''
					}`}
					onClick={() => setExpanded(!expanded)}
				>
					<i className="dropdown icon"></i>
					<div className="text">{selected.label}</div>
					<div className={`menu ${expanded ? 'visible transition' : ''}`}>
						{renderedList}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchDropdown;
