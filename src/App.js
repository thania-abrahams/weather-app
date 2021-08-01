import { useState, useEffect } from 'react';

import styled from 'styled-components';

import openweather from './apis/openweather';

import LoadingSpinner from './components/LoadingSpinner';
import SearchDropdown from './components/SearchDropdown';
import DayList from './components/DayList';
import DayChart from './components/DayChart';

const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
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
	const [selectedCity, setSelectedCity] = useState(cities[1]);
	const [selectedDay, setSelectedDay] = useState(new Date());
	const [current, setCurrent] = useState([]);
	const [forecast, setForecast] = useState([]);
	const [daily, setDaily] = useState([]);

	useEffect(() => {
		searchCurrent();
		searchForecast();
		searchDaily();
	}, [selectedCity]);

	const searchCurrent = async () => {
		const currentData = await openweather
			.get('/weather', {
				params: {
					q: selectedCity.label,
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
					q: selectedCity.label,
					units: 'metric',
				},
			})
			.catch((err) => {
				alert(err.message);
			});
		setForecast(forecastData);
		setLoading(false);
	};

	const searchDaily = async () => {
		const dailyData = await openweather
			.get('/onecall', {
				params: {
					lat: selectedCity.lat,
					lon: selectedCity.lon,
					units: 'metric',
				},
			})
			.catch((err) => {
				alert(err.message);
			});
		setDaily(dailyData);
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
				selectedCity={selectedCity}
				handleSelectedCity={setSelectedCity}
			/>
			{current && forecast && (
				<DayList
					currentData={current}
					forecastData={forecast}
					selectedDay={selectedDay}
					handleSelectedDay={setSelectedDay}
				/>
			)}
			<DayChart dailyData={daily} selectedDay={selectedDay} />
		</StyledWrapper>
	);
};

export default App;
