import {useEffect, useState} from "react";
import axios from "axios";
const DataDisplay = (props) => {

    const [weatherData, setWeatherData] = useState("");
    const [location, setLocation] = useState(
        {
            lat: 0,
            lon: 0,
        }
    );

    useEffect(() => {
        if (props.cityName === "" && location.lat === 0 && location.lon === 0){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => setLocation({lat:position.coords.latitude, lon:position.coords.longitude}));
            } else{
                alert("not supported")
            }
        }

        if ((location.lat !== 0 && location.lon !== 0) || (props.cityName !== "" && location.lat === 0 && location.lon === 0)){
            let newUrl = `https://api.openweathermap.org/data/2.5/weather?${props.cityName !== "" ? "q=" + props.cityName : ""}${props.cityName === "" ? "&lat=" + location.lat  + "&lon=" + location.lon : "" }&appid=8d342f682d66b6e1370bc79bd312bcd2&units=imperial`;
            axios.get(newUrl).then(response => {
                console.log(newUrl)
                console.log(response.data)
                setWeatherData(
                    {
                        cityName: response.data.name,
                        currentTemp: response.data.main.temp,
                        maxTemp: response.data.main.temp_max,
                        icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
                        minTemp: response.data.main.temp_min,
                        feels: response.data.main.feels_like,
                        humidity: response.data.main.humidity
                    }
                );
            });
            console.log("call was made!");
        }
    },[location.city, location.lat, location.lon, props.cityName])

    return (<div>
        <button onClick={() => {console.log(location)}} >test</button>
        <img src={weatherData.icon} alt="img of weather"/>
        <div>{weatherData.cityName}</div>
        <div>{weatherData.currentTemp}</div>
        <div>{weatherData.maxTemp}</div>
        <div>{weatherData.minTemp}</div>
        <div>{weatherData.feels}</div>
    </div>)
}
export default DataDisplay;