import moment from 'moment';
import styled from 'styled-components';

const StyledCardList = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	margin: 25px;
`;

const StyledCard = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px;
	padding: 20px;
	max-width: 100%;
	width: 150px;
	min-height: 150px;
	text-align: center;
	color: darkblue;
	border: 1px solid lightgray;
	opacity: 0.7;

	&:hover {
		opacity: 1;
	}
`;

const StyledCardContent = styled.div`
	padding: 30px,
	min-height: 200px;
	cursor: pointer;
`;

const StyledCardContentTitle = styled.p`
	margin: 0;
`;

const StyledCardContentIcon = styled.img`
	width: 50px;
	height: 50px;
`;

const StyledCardContentSubtitle = styled.h3`
	margin: 0;
`;

const StyledCardContentDescription = styled.p`
	margin-top: 15px;
	text-transform: capitalize;
`;

const WeeklyForecast = ({
	currentData,
	forecastData,
	handleSelectedDay,
	activeDay,
}) => {
	const getDay = (timestamp) => {
		let day = new Date(timestamp * 1000);

		return moment(day).format('dddd');
	};

	let currentList = [];

	let getCurrentDayString = () => {
		let currentDay = new Date();

		return moment(currentDay).format('dddd');
	};

	const getForecast =
		forecastData.data &&
		forecastData.data.list.filter(
			(reading) => (currentList = reading.dt_txt.includes('12:00:00'))
		);

	currentList =
		forecastData.data && getCurrentDayString() === getDay(getForecast[0].dt)
			? getForecast.slice(1)
			: getForecast.slice(0, 4);

	console.log(currentList);

	const renderedForecast =
		getForecast &&
		currentList.map((item, index) => {
			const date = new Date(item.dt);
			return (
				<StyledCard key={index} onClick={() => handleSelectedDay(date)}>
					<StyledCardContent>
						<StyledCardContentTitle>
							{new Date(item.dt_txt).toLocaleDateString(undefined, {
								weekday: 'long',
							})}
						</StyledCardContentTitle>
						<StyledCardContentIcon
							src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
						/>
						<StyledCardContentSubtitle>
							{Math.round(item.main.temp)} °C
						</StyledCardContentSubtitle>
						<StyledCardContentDescription>
							{item.weather[0].description}
						</StyledCardContentDescription>
					</StyledCardContent>
				</StyledCard>
			);
		});

	return (
		<StyledCardList>
			<StyledCard>
				<StyledCardContent>
					<StyledCardContentTitle>
						{getDay(currentData.data.dt)}
					</StyledCardContentTitle>
					<StyledCardContentIcon
						src={`http://openweathermap.org/img/w/${currentData.data.weather[0].icon}.png`}
					/>
					<StyledCardContentSubtitle>
						{Math.round(currentData.data.main.temp)} °C
					</StyledCardContentSubtitle>
					<StyledCardContentDescription>
						{currentData.data.weather[0].description}
					</StyledCardContentDescription>
				</StyledCardContent>
			</StyledCard>
			{renderedForecast}
		</StyledCardList>
	);
};

export default WeeklyForecast;
