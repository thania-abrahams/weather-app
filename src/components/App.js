import SearchDropdown from './SearchDropdown';
import WeeklyForecast from './WeeklyForecast';
import DailyForecast from './DailyForecast';

const App = () => {
    return (
        <div className="ui container">
            <SearchDropdown />
            <WeeklyForecast />
            <DailyForecast />
        </div>
    )
}

export default App;