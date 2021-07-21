import {
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Line,
	Tooltip,
} from 'recharts';

const DailyForecast = ({ forecastData, day }) => {
	const data = forecastData.list
		.filter((forecast) => {
			const d = new Date(forecast.dt_txt);
			return d.getDay() === day.getDay();
		})
		.map((forecast) => {
			const d = new Date(forecast.dt_txt);
			return {
				temperature: Math.round(forecast.main.temp - 270),
				date: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
			};
		});

	return (
		<div className="ui container">
			<LineChart width={800} height={400} data={data}>
				<XAxis dataKey="date" />
				<YAxis dataKey="temperature" domain={['auto', 'auto']} />
				<Tooltip />
				<CartesianGrid stroke="#f5f5f5" />
				<Line
					type="monotone"
					dataKey="temperature"
					stroke="#ff7300"
					yAxisId={0}
				/>
			</LineChart>
		</div>
	);
};

export default DailyForecast;
