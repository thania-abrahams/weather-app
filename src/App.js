import styled from 'styled-components';
import { useState, useEffect } from 'react';
import openweather from './apis/openweather';
import SearchDropdown from './components/SearchDropdown';
import WeeklyForecast from './components/WeeklyForecast';
import DailyForecast from './components/DailyForecast';
import LoadingSpinner from './components/LoadingSpinner';

const StyledWrapper = styled.div`
	margin: 20px;
`;

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
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = React.useState(null);
	const [selected, setSelected] = useState(cities[1]);
	const [results, setResults] = useState();
	const [activeDay, setActiveDay] = useState(new Date());

	useEffect(() => {
		const search = async () => {
			const response = await openweather
				.get('/forecast', {
					params: {
						q: selected.label,
					},
				})
				.catch(() => {
					setError(error);
				});

			setResults(response.data);

			if (error) return `Error: ${error.message}`;

			if (!results) return 'An error has occurred, please try again later.';

			setLoading(false);
		};

		search();
	}, [selected]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<StyledWrapper>
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
		</StyledWrapper>
	);
};

export default App;
