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

const DayChart = ({ dailyData, selectedDay }) => {
	const data = dailyData && dailyData.data && dailyData.data.hourly;
	const half = dailyData && dailyData.data && Math.ceil(data.length / 2 + 1);

	const firstHalf =
		dailyData &&
		dailyData.data &&
		data.slice(0, half).map((day) => {
			const d = new Date(day.dt);
			return {
				temperature: Math.round(day.temp),
				date: d.toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
				}),
			};
		});

	return (
		<StyledChart>
			<LineChart width={800} height={400} data={firstHalf}>
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
