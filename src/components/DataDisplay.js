import {useEffect, useState} from "react";
import axios from "axios";
const DataDisplay = (props) => {

   const [weatherData, setWeatherData] = useState("");
   const [location, setLocation] = useState(
       {
           lat: 0,
           lon: 0
       }
   );

    const apiReq = () => {
            let city = props.cityName;
            let newUrl = `https://api.openweathermap.org/data/2.5/weather?${"q=" + city}&appid=8d342f682d66b6e1370bc79bd312bcd2&units=imperial`;
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





    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => setLocation({lat:position.coords.latitude.toString(), lon:position.coords.longitude.toString()}));
        } else {
            alert("not supported")
        }
        apiReq()
    },[props.cityName])

    return (<div>
        <button onClick={() => {console.log(location)}}>test</button>
        <img src={weatherData.icon} alt=""/>
                <div>{weatherData.cityName}</div>
                <div>{weatherData.currentTemp}</div>
                <div>{weatherData.maxTemp}</div>
                <div>{weatherData.minTemp}</div>
                <div>{weatherData.feels}</div>
            </div>)
}
export default DataDisplay;