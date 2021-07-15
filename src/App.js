import './App.css';
import CitySearch from "./components/CitySearch";
import DataDisplay from "./components/DataDisplay";
import {useState} from "react";

function App() {
   const [searchedCity, setSeachedCity] =  useState("");
  return (
    <div>
        <CitySearch setCitySearch={setSeachedCity}/>
        <DataDisplay cityName={searchedCity}/>
    </div>
  );
}

export default App;
