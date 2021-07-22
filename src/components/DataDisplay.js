import {useEffect, useState} from "react";
import axios from "axios";
import classes from "./styles/datadisplay.module.css";
import Card from "./Card/Card";
import CitySearch from "./CitySearch";
const DataDisplay = (props) => {

    const {cityName, setCitySearch} = props;
    const [weatherData, setWeatherData] = useState("");
    const [location, setLocation] = useState(
        {
            lat: 0,
            lon: 0,
        }
    );
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
                        description: response.data.weather[0].description
                    }
                );
            });
            console.log("call was made!");
        }

    },[location.city, location.lat, location.lon, cityName])
    return (
            <Card weatherData={weatherData}>
                <CitySearch setCitySearch={setCitySearch}/>
                <div className={classes["info-wrapper"]}>
                    <h1>{weatherData.cityName}</h1>
                    <div className={classes["img-wrapper"]}>
                        <h3>{weatherData.description}</h3>
                        <img src={weatherData.icon} alt="img of weather"/>
                    </div>
                    <div className={classes.info} >
                        <p>Current temperature</p>
                        <div>{weatherData.currentTemp}&#176;F</div>
                    </div>
                    <div className={classes.info} >
                        <p>High</p>
                        <div>{weatherData.maxTemp}&#176;F</div>
                    </div>
                    <div className={classes.info} >
                        <p>Low</p>
                        <div>{weatherData.minTemp}&#176;F</div>
                    </div>

                    <div className={classes.info} >
                        <p>Feels like</p>
                        <div>{weatherData.feels}&#176;F</div>
                    </div>
                </div>
            </Card>
            )
}
export default DataDisplay;