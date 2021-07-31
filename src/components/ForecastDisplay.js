import axios from "axios";
import {useEffect, useState} from "react";
import classes from "./styles/forecast.module.css";

const ForecastDisplay = (props) => {

 const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
 const [forecastData, setForecastData] = useState(null);

    useEffect(() => {
        if (props.coords){let newUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.coords.lat}&lon=${props.coords.lon}&exclude=minutely&appid=8d342f682d66b6e1370bc79bd312bcd2&units=imperial`;
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
    },[props.coords])

    return( <div>
                <div>
                    <ul className={classes.["forecast-wrapper"]}>
                        {forecastData ? forecastData.forecast.map(item => (
                            <li className={classes.days} key={Math.random()}>
                                <div>{days[new Date(item.dt * 1000).getDay()]}</div>
                                <div>Temp: {item.temp.day}</div>
                                <div>High:{item.temp.max}</div>
                                <div>Low:{item.temp.min}</div>
                            </li>)): ""}
                    </ul>
                </div>
            </div>)
}
export default ForecastDisplay;