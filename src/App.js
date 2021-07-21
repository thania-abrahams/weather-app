import { useState, useEffect } from 'react';
import openweather from './apis/openweather';
import SearchDropdown from './components/SearchDropdown';
import WeeklyForecast from './components/WeeklyForecast';
import DailyForecast from './components/DailyForecast';

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
	const [activeDay, setActiveDay] = useState(new Date());

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

	console.log(selected);

	return (
		<div>
			<SearchDropdown
				cities={cities}
				selected={selected}
				handleSelectedChange={setSelected}
			/>
			{results && (
				<>
					<WeeklyForecast
						forecastData={results}
						onSelectDay={(d) => setActiveDay(d)}
						activeDay={activeDay}
					/>
					<DailyForecast forecastData={results} day={activeDay} />
				</>
			)}
		</div>
	);
};

export default App;
