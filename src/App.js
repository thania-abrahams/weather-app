import { useState, useEffect } from 'react';
import openweather from './apis/openweather';
import SearchDropdown from './components/SearchDropdown';
import WeeklyForecast from './components/WeeklyForecast';

const cities = [
	{
		label: 'Amsterdam',
		value: 'amsterdam',
	},
	{
		label: 'Cape Town',
		value: 'cape-town',
	},
	{
		label: 'Guadalajara',
		value: 'guadalajara',
	},
];

const App = () => {
	const [selected, setSelected] = useState(cities[1]);
	const [results, setResults] = useState();

	useEffect(() => {
		const search = async () => {
			const response = await openweather.get('/forecast', {
				params: {
					q: selected.label,
				},
			});

			setResults(response.data);
		};

		search();
	}, [selected]);

	return (
		<div className="ui container">
			<SearchDropdown
				cities={cities}
				selected={selected}
				handleSelectedChange={setSelected}
			/>
			{results && <WeeklyForecast forecastData={results} />}
		</div>
	);
};

export default App;
