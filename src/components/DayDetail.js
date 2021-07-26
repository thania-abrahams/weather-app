import styled from 'styled-components';
import {
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Line,
	Tooltip,
} from 'recharts';

const StyledChart = styled.div`
	padding: 15px;
	border: 1px solid darkgray;
`;

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
		<StyledChart>
			<LineChart width={400} height={200} data={data}>
				<XAxis dataKey="date" />
				<YAxis dataKey="temperature" domain={['auto', 'auto']} />
				<Tooltip />
				<CartesianGrid stroke="cornflowerblue" />
				<Line
					type="monotone"
					dataKey="temperature"
					stroke="coral"
					yAxisId={0}
				/>
			</LineChart>
		</StyledChart>
	);
};

export default DailyForecast;
