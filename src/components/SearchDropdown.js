import { useState, useEffect, useRef } from 'react';

// TODO: Refactor to use styled components
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
		<div className="ui container">
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
		</div>
	);
};

export default SearchDropdown;
