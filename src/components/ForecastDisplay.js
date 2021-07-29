import axios from "axios";
import {useEffect, useState} from "react";

const ForecastDisplay = (props) => {

 let tomorrowDay = new Date().getUTCDate();
 const [forecastData, setForecastData] = useState(null);
 const [forecastDays, setForecastDays] = useState(null);
    console.log("FORECAST")
    useEffect(() => {

        if (!forecastData && props.cityName){
            let newUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=8d342f682d66b6e1370bc79bd312bcd2&units=imperial`;

            let newUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${props.cityName}&appid=8d342f682d66b6e1370bc79bd312bcd2&units=imperial`;
        axios.get(newUrl).then(response => {
            console.log(newUrl)
            console.log(response.data)
            setForecastData(
                {
                    forecast: response.data.list
                }
            );
            console.log("FORECAST CALL");
        });
        }
        if (!forecastDays && forecastData){
            console.log("set")
            setForecastDays(forecastData.forecast.map(item =>  (<div>{item.main.temp}   date: {item.dt_txt}</div>)));
        }
    },[props.cityName, forecastData, forecastDays])
    console.log(forecastDays)
    // console.log(forecastData.forecast[0].dt_txt.substr(8,2))

    return( <div>
                <ul>
                    {forecastDays}
                </ul>
            </div>)
}
export default ForecastDisplay;