import styled from 'styled-components';
import { findClosestForecastToTime, getRelativeDay } from '../utils/utils';

const StyledCardList = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 25px;
`;

const StyledCard = styled.div`
	margin: 10px;
	max-width: 150px;
	width: 100%;
	text-align: center;
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

				return (
					<StyledCard>
						<div
							className="content"
							style={{
								border: '1px solid #ccc',
								padding: 32,
								cursor: 'pointer',
								backgroundColor:
									activeDay.getDay() === date.getDay() ? '#ccc' : '#fff',
							}}
							key={forecast.dt}
							onClick={() => onSelectDay(date)}
						>
							<p className="header">{readableDate}</p>
							<h3 className="description">{readableTemperature}</h3>
						</div>
					</StyledCard>
				);
			})}
		</StyledCardList>
	);
};

export default WeeklyForecast;
