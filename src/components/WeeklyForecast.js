import styled from 'styled-components';
import { findClosestForecastToTime, getRelativeDay } from '../utils/utils';

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
`;

const StyledCardContent = styled.div`
	padding: 30px,
	min-height: 200px;
	cursor: 'pointer',
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
`;

const WeeklyForecast = ({ forecastData, onSelectDay, activeDay }) => {
	const now = new Date();

	console.log(forecastData);
	const forecastsToShow = [];

	forecastsToShow.push(forecastData.list[0]);

	for (let i = 1; i < 4; i++) {
		const dailyForecasts = forecastData.list.filter((f) => {
			const day = new Date(f.dt_txt);

			return day.getDay() === now.getDay() + i;
		});

		const closest = findClosestForecastToTime(12, dailyForecasts);

		if (closest) {
			forecastsToShow.push(closest);
		}
	}

	return (
		<StyledCardList>
			{forecastsToShow.map((forecast) => {
				const readableTemperature = `${Math.round(forecast.main.temp - 270)} C`;

				const date = new Date(forecast.dt_txt);

				const readableDate = getRelativeDay(date);

				const description = forecast.weather[0].description;

				const icon = forecast.weather[0].icon;

				return (
					<StyledCard key={forecast.dt}>
						<StyledCardContent onClick={() => onSelectDay(date)}>
							<StyledCardContentTitle>{readableDate}</StyledCardContentTitle>
							<StyledCardContentIcon
								src={`http://openweathermap.org/img/w/${icon}.png`}
							></StyledCardContentIcon>
							<StyledCardContentSubtitle>
								{readableTemperature}
							</StyledCardContentSubtitle>
							<StyledCardContentDescription>
								{description}
							</StyledCardContentDescription>
						</StyledCardContent>
					</StyledCard>
				);
			})}
		</StyledCardList>
	);
};

export default WeeklyForecast;
