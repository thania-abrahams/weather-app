import React from 'react';
import ReactDOM from 'react-dom';
import FontStyles from './assets/fontStyles';
import App from '../src/App';

ReactDOM.render(
	<React.StrictMode>
		<FontStyles />
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
