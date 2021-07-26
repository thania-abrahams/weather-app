import styled from 'styled-components';
import moment from 'moment';

const StyledCardList = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 25px;
`;

const StyledCard = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px;
	padding: 20px;
	max-width: 150px;
	width: 100%;
	min-height: 150px;
	text-align: center;
	color: darkblue;
	border: 1px solid lightgray;
	opacity: 0.7;
	background-color: lightgray;

	&:hover {
		opacity: 1;
		transform: scale(1.1);
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
				<StyledCard>
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
							{item.main.temp} °C
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
