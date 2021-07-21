export const findClosestForecastToTime = (targetTime, forecasts) => {
	const closestTime = forecasts
		.map((forecast) => ({
			dt_txt: forecast.dt_txt,

			delta: Math.abs(targetTime - new Date(forecast.dt_txt).getHours()),
		}))
		.sort((a, b) => (a.delta > b.delta ? 1 : -1))[0];

	return forecasts.find((forecast) => forecast.dt_txt === closestTime.dt_txt);
};

export const getRelativeDay = (date) => {
	const now = new Date();

	let readableDate = 'Today';

	if (date.getDay() === now.getDay() + 1) {
		readableDate = 'Tomorrow';
	} else if (date.getDay() > now.getDay()) {
		readableDate = date.toLocaleDateString(undefined, { weekday: 'long' });
	}

	return readableDate;
};
