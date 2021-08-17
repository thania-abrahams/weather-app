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
	background-color: ${(props) => (props.active ? '#0d98ba' : '#eee')};

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
	selectedDay,
	handleSelectedDay,
}) => {
	const currentDate = new Date(currentData.data.dt * 1000);

	const getDay = (timestamp) => {
		let day = new Date(timestamp * 1000);

		return moment(day).format('dddd');
	};

	const getForecast =
		forecastData.data &&
		forecastData.data.list.filter((reading) => {
			const date = new Date(reading.dt * 1000);

			return (
				reading.dt_txt.includes('12:00:00') &&
				date.getDate() !== currentDate.getDate()
			);
		});

	const getForecastAmended = getForecast && getForecast.slice(0, 4);

	const renderedForecast =
		getForecast &&
		getForecastAmended.map((item, index) => {
			const date = new Date(item.dt * 1000);

			const isActive = selectedDay.getTime() === date.getTime();

			return (
				<StyledCard
					active={isActive}
					key={index}
					onClick={() => handleSelectedDay(date)}
				>
					<StyledCardContent>
						<StyledCardContentTitle>
							{date.toLocaleDateString(undefined, {
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

	const isActive = selectedDay.getTime() === currentDate.getTime();

	return (
		<StyledCardList>
			<StyledCard
				active={isActive}
				onClick={() => handleSelectedDay(currentDate)}
			>
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
