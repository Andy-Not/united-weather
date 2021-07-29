import axios from "axios";
import {useEffect, useState} from "react";

const ForecastDisplay = (props) => {

 const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
 const [forecastData, setForecastData] = useState(null);
    console.log("FORECAST")
    useEffect(() => {

if (!forecastData && props.coords){let newUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.coords.lat}&lon=${props.coords.lon}&exclude=minutely&appid=8d342f682d66b6e1370bc79bd312bcd2&units=imperial`;
    axios.get(newUrl).then(response => {
        console.log(newUrl)
        console.log(response.data)
        setForecastData(
            {
                forecast: response.data.daily
            }
        );
        console.log("FORECAST CALL");
    });}
 console.log("loop in forecast")
    },[forecastData, props.coords])

    return( <div>
                <ul>
                    {forecastData ? forecastData.forecast.map(item => (<li key={Math.random()}>Temp: {item.temp.day} day:{days[new Date(item.dt * 1000).getDay()]}</li>)): "LOADING"}
                </ul>
            </div>)
}
export default ForecastDisplay;