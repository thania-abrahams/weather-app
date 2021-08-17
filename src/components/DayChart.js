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
				const date = new Date(forecast.dt * 1000);
				return date.getTime() <= now.getTime() + ONE_DAY_MS;
			}),
		];
		console.log(currentData.data.dt);
	} else {
		data = forecastData.data.list.filter((forecast) => {
			const date = new Date(forecast.dt * 1000);

			const periodToDisplay =
				date.getTime() >= selectedDay.getTime() &&
				date.getTime() <= selectedDay.getTime() + ONE_DAY_MS;

			return periodToDisplay;
		});
	}

	const displayData = data.map((forecast) => {
		const date = new Date(forecast.dt * 1000);

		return {
			temperature: Math.round(forecast.main.temp),
			date: date.toLocaleTimeString(undefined, {
				minute: 'numeric',
				hour: 'numeric',
			}),
		};
	});

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
