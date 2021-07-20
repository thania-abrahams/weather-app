import { useState, useEffect } from 'react';
import SearchDropdown from './components/SearchDropdown';
import WeeklyForecast from './components/WeeklyForecast';
import DailyForecast from './components/DailyForecast';

const cities = [
    {
        label: 'Amsterdam',
        value: 'amsterdam'
    },
    {
        label: 'Cape Town',
        value: 'cape-town'
    },
    {
        label: 'Guadalajara',
        value: 'guadalajara'
    }
]

const App = () => {
    const [selected, setSelected] = useState(cities[1]);

    return (
        <div className="ui container">
            <SearchDropdown cities={cities} selected={selected} handleSelectedChange={setSelected} />
            <WeeklyForecast />
            <DailyForecast />
        </div>
    )
}

export default App;