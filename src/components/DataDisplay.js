import {useEffect, useState} from "react";
import axios from "axios";
import classes from "./styles/datadisplay.module.css";
import Card from "./Card/Card";
import Paper from '@material-ui/core/Paper';
import CitySearch from "./CitySearch";
import ForecastDisplay from "./ForecastDisplay";
import Error from "./Error";
const DataDisplay = (props) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const {cityName, setCitySearch} = props;
    const [weatherData, setWeatherData] = useState("");
    const [location, setLocation] = useState(
        {
            lat: 0,
            lon: 0,
        }
    );
    const errorHandle = (e) => {
        console.log("got error");
        if (e.response){
            setErrorMessage("invalid city name")
        }else if (e.request){
            console.log("api seems to be having trouble try again later")
        }else {
            console.log("error" ,e.message)
        }
    }

    useEffect(() => {

        if (cityName === "" && location.lat === 0 && location.lon === 0){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => setLocation({lat:position.coords.latitude, lon:position.coords.longitude}));
            } else{
                alert("not supported")
            }
        }

        if ((location.lat !== 0 && location.lon !== 0) || (cityName !== "" && location.lat === 0 && location.lon === 0)){
            let newUrl = `https://api.openweathermap.org/data/2.5/weather?${cityName !== "" ? "q=" + cityName : ""}${cityName === "" ? "&lat=" + location.lat  + "&lon=" + location.lon : "" }&appid=8d342f682d66b6e1370bc79bd312bcd2&units=imperial`;
            axios.get(newUrl).then(response => {
                console.log(newUrl)
                console.log(response.data)
                setWeatherData(
                    {
                        cityName: response.data.name,
                        currentTemp: Math.round(response.data.main.temp),
                        maxTemp: Math.round(response.data.main.temp_max),
                        icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
                        minTemp: Math.round(response.data.main.temp_min),
                        feels: Math.round(response.data.main.feels_like),
                        humidity: Math.round(response.data.main.humidity),
                        description: response.data.weather[0].description,
                        coords: response.data.coord
                    }
                );
                console.log("call was made!");
            }).catch(errorHandle);

        }

    },[location.city, location.lat, location.lon, cityName])
    return (
        <>
            {errorMessage && <Error message={errorMessage} setError={setErrorMessage}/>}
            <Card weatherData={weatherData}>
                <CitySearch setCitySearch={setCitySearch}/>
                <div className={classes["info-wrapper"]}>
                    <h1>{weatherData.cityName}</h1>
                    <Paper className={classes["img-wrapper"]}>
                        <h3>{weatherData.description}</h3>
                        <img src={weatherData.icon} alt="img of weather"/>
                    </Paper>
                    <Paper className={classes.info} >
                        <p>Current temperature</p>
                        <div>{weatherData.currentTemp}&#176;F</div>
                    </Paper>
                    <Paper className={classes.info} >
                        <p>High</p>
                        <div>{weatherData.maxTemp}&#176;F</div>
                    </Paper>
                    <Paper className={classes.info} >
                        <p>Low</p>
                        <div>{weatherData.minTemp}&#176;F</div>
                    </Paper>
                    <Paper className={classes.info} >
                        <p>Feels like</p>
                        <div>{weatherData.feels}&#176;F</div>
                    </Paper>
                </div>
                <ForecastDisplay city={cityName} coords={weatherData.coords}/>
            </Card>
        </>
            )
}
export default DataDisplay;