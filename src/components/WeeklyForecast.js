import { findClosestForecastToTime, getRelativeDay } from '../utils/utils';

const WeeklyForecast = ({ forecastData }) => {
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
		<div>
			{forecastsToShow.map((forecast) => {
				const readableTemperature = `${Math.round(forecast.main.temp - 270)} C`;
				const date = new Date(forecast.dt_txt);
				const readableDate = getRelativeDay(date);
				return (
					<div
						style={{
							border: '1px solid #ccc',
							padding: 32,
							cursor: 'pointer',
						}}
						key={forecast.dt}
					>
						<p>{readableDate}</p>
						<h3>{readableTemperature}</h3>
					</div>
				);
			})}
		</div>
	);
};

export default WeeklyForecast;
