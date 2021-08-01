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

const ONE_DAY_MS = 24 * 60 * 60 * 1001;

const DayChart = ({ currentData, forecastData, selectedDay }) => {
	const now = new Date();

	let data;
	if (selectedDay.getDate() === now.getDate()) {
		data = [
			{
				...currentData.data,
				dt: currentData.data.dt - (currentData.data.dt % 3600),
			},
			...forecastData.data.list.filter((forecast) => {
				const d = new Date(forecast.dt * 1000);
				return d.getTime() <= now.getTime() + ONE_DAY_MS;
			}),
		];
	} else {
		data = forecastData.data.list.filter((forecast) => {
			const d = new Date(forecast.dt * 1000);
			return (
				d.getTime() >= selectedDay.getTime() &&
				d.getTime() <= selectedDay.getTime() + ONE_DAY_MS
			);
		});
	}

	const displayData = data.map((forecast) => {
		const d = new Date(forecast.dt * 1000);
		return {
			temperature: Math.round(forecast.main.temp),
			date: d.toLocaleTimeString(undefined, {
				minute: 'numeric',
				hour: 'numeric',
			}),
		};
	});

	const startDomain = new Date();
	startDomain.setHours(0);

	return (
		<StyledChart>
			<LineChart width={800} height={400} data={displayData}>
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

export default DayChart;
