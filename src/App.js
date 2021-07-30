import './App.css';
import DataDisplay from "./components/DataDisplay";
import Modal from "./components/Modal";
import {useState, Fragment} from "react";

function App() {
   const [searchedCity, setSeachedCity] =  useState("");


  return (
            <Fragment>
                <DataDisplay setCitySearch={setSeachedCity} cityName={searchedCity}/>
            </Fragment>
  );
}

export default App;
