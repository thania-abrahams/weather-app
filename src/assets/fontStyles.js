import { createGlobalStyle } from 'styled-components';
import RobotoWoff from './fonts/roboto-v27-latin-regular.woff';
import RobotoWoff2 from './fonts/roboto-v27-latin-regular.woff2';
import RobotoBoldWoff from './fonts/roboto-v27-latin-500.woff';
import RobotoBoldWoff2 from './fonts/roboto-v27-latin-500.woff2';

const FontStyles = createGlobalStyle`
    @font-face {
    font-family: 'Roboto Regular';
    src: url(${RobotoWoff2}) format('woff2'),
        url(${RobotoWoff}) format('woff');
    },

    @font-face {
        font-family: 'Roboto Bold';
        src: url(${RobotoBoldWoff2}) format('woff2'),
            url(${RobotoBoldWoff}) format('woff');
    }
`;

export default FontStyles;
