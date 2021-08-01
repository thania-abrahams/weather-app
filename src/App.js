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
		tz: 'GMT+2',
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
	const [selectedCityName, setSelectedCityName] = useState(cities[1]);
	const [selectedDay, setSelectedDay] = useState();
	const [current, setCurrent] = useState([]);
	const [forecast, setForecast] = useState([]);

	useEffect(() => {
		searchCurrent();
		searchForecast();
	}, [selectedCityName]);

	useEffect(() => {
		if (current && current.data) {
			setSelectedDay(new Date(current.data.dt * 1000));
		}
	}, [current]);

	const searchCurrent = async () => {
		const currentData = await openweather
			.get('/weather', {
				params: {
					q: selectedCityName.label,
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
					q: selectedCityName.label,
					units: 'metric',
				},
			})
			.catch((err) => {
				alert(err.message);
			});
		setForecast(forecastData);
		setLoading(false);
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (!current && !forecast)
		return 'An error has occurred, please try again later.';

	const showForecast = selectedDay && current && forecast && forecast.data;
	return (
		<StyledWrapper>
			<SearchDropdown
				cities={cities}
				selectedCity={selectedCityName}
				handleSelectedCity={setSelectedCityName}
			/>
			{showForecast && (
				<>
					<DayList
						currentData={current}
						forecastData={forecast}
						selectedDay={selectedDay}
						handleSelectedDay={setSelectedDay}
					/>
					<DayChart
						currentData={current}
						forecastData={forecast}
						selectedDay={selectedDay}
						cityInfo={forecast.data.city}
					/>
				</>
			)}
		</StyledWrapper>
	);
};

export default App;
