import axios from 'axios';

const KEY = 'db7852bd77fc0d305f875710997743f6';

export default axios.create({
	baseURL: 'https://api.openweathermap.org/data/2.5',
	params: {
		appid: KEY,
	},
});
