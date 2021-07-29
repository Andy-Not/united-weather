import axios from "axios";
import {useEffect, useState} from "react";

const ForecastDisplay = (props) => {

    const [forecastData, setForecastData] = useState("");
    console.log("FORECAST")
    useEffect(() => {
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
    },[props.cityName])
    console.log(forecastData.forecast)
    return( <div>
                <ul>

                </ul>
            </div>)
}
export default ForecastDisplay;