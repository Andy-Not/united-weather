import './App.css';
import CitySearch from "./components/CitySearch";
import DataDisplay from "./components/DataDisplay";
import Card from "./components/Card/Card";
import {useState} from "react";

function App() {
   const [searchedCity, setSeachedCity] =  useState("");
  return (
    <Card>
        <CitySearch setCitySearch={setSeachedCity}/>
        <DataDisplay cityName={searchedCity}/>
    </Card>
  );
}

export default App;
