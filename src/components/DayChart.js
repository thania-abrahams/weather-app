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

const data = [
	{
		day: '00:00',
		temp: '0',
	},
	{
		day: '06:00',
		temp: '10',
	},
	{
		day: '12:00',
		temp: '20',
	},
	{
		day: '18:00',
		temp: '40',
	},
];

const DayChart = ({ forecastData, activeDay }) => {
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
			<LineChart width="100%" height="100%" data={data}>
				<XAxis dataKey="date" />
				<YAxis dataKey="temperature" domain={['auto', 'auto']} />
				<Tooltip />
				<CartesianGrid stroke="cornflowerblue" />
				<Line type="monotone" dataKey="temp" stroke="coral" yAxisId={0} />
			</LineChart>
		</StyledChart>
	);
};

export default DayChart;
