import styled from 'styled-components';
import { useState, useEffect } from 'react';
import openweather from './apis/openweather';
import SearchDropdown from './components/SearchDropdown';
import WeeklyForecast from './components/WeeklyForecast';
// import DailyForecast from './components/DailyForecast';
import LoadingSpinner from './components/LoadingSpinner';

const StyledWrapper = styled.div`
	margin: 20px;
`;

const cities = [
	{
		label: 'Amsterdam',
		value: 'amsterdam',
		lat: 52.366667,
		lon: 4.9,
	},
	{
		label: 'Cape Town',
		value: 'cape-town',
		lat: -33.918861,
		lon: 18.4233,
	},
	{
		label: 'Guadalajara',
		value: 'guadalajara',
		lat: 20.676667,
		lon: -103.3475,
	},
];

const App = () => {
	const [isLoading, setLoading] = useState(true);
	const [selected, setSelected] = useState(cities[1]);
	const [current, setCurrent] = useState([]);
	const [forecast, setForecast] = useState([]);

	useEffect(() => {
		searchCurrent();
		searchForecast();
	}, [selected]);

	const searchCurrent = async () => {
		const currentData = await openweather
			.get('/weather', {
				params: {
					q: selected.label,
					units: 'metric',
				},
			})
			.catch((err) => {
				alert(err.message);
			});
		setCurrent(currentData);
		setLoading(false);
	};

	const searchForecast = async () => {
		const forecastData = await openweather
			.get('/forecast', {
				params: {
					q: selected.label,
				},
			})
			.catch((err) => {
				alert(err.message);
			});
		setForecast(forecastData.data.list);
		setLoading(false);
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (!current && !forecast)
		return 'An error has occurred, please try again later.';

	return (
		<StyledWrapper>
			<SearchDropdown
				cities={cities}
				selected={selected}
				handleSelectedChange={setSelected}
			/>
			{current && forecast && (
				<WeeklyForecast currentData={current} forecastData={forecast} />
			)}
		</StyledWrapper>
	);
};

export default App;
