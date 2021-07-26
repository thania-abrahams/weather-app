import styled from 'styled-components';
import DayCard from './DayCard';

const StyledCardList = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 25px;
`;

const WeeklyForecast = ({ currentData, forecastData }) => {
	const getDay = (timestamp) => {
		let day = new Date(timestamp);

		return day.toLocaleDateString(undefined, { weekday: 'long' });
	};

	const getForecast =
		forecastData.data &&
		forecastData.data.list.filter((reading) =>
			reading.dt_txt.includes('12:00:00')
		);

	const renderedForecast =
		getForecast &&
		getForecast.map((item, index) => {
			return (
				<DayCard
					key={index}
					title={new Date(item.dt_txt).toLocaleDateString(undefined, {
						weekday: 'long',
					})}
					icon={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
					subtitle={item.main.temp}
					description={item.weather[0].description}
					handleActiveChange={() => console.log('I was clicked by the list!')}
				></DayCard>
			);
		});

	const handleActiveChange = () => {
		console.log('whoop');
	};

	return (
		<StyledCardList>
			<DayCard
				title={getDay(currentData.data.dt)}
				icon={`http://openweathermap.org/img/w/${currentData.data.weather[0].icon}.png`}
				subtitle={Math.round(currentData.data.main.temp)}
				description={currentData.data.weather[0].description}
				handleActiveChange={handleActiveChange}
			/>
			{renderedForecast}
		</StyledCardList>
	);
};

export default WeeklyForecast;
