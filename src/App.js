import './App.css';
import CitySearch from "./components/CitySearch";
import DataDisplay from "./components/DataDisplay";
import Card from "./components/Card/Card";
import {useState} from "react";

function App() {
   const [searchedCity, setSeachedCity] =  useState("");
   const [weatherData, setWeatherData] = useState("");
   const weather = (data) => {
        setWeatherData(data);
   }

  return (
            <Card weatherData={weatherData}>
                <CitySearch setCitySearch={setSeachedCity}/>
                <DataDisplay cityName={searchedCity} passInfo={weather}/>
            </Card>
  );
}

export default App;
