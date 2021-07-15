import {useEffect, useState} from "react";
import axios from "axios";
const DataDisplay = (props) => {
    
   let city = props.cityName;
   const [weatherData, setWeatherData] = useState("");
   const [location, setLocation] = useState(
       {
           city: city,
           lat: 0,
           lon: 0,
       }
   );
   
    useEffect(() => {
        if (city === ""){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => setLocation({city: false, lat:position.coords.latitude.toString(), lon:position.coords.longitude.toString()}));
            } else{
                alert("not supported")
            }
        }

        if (city !== ""){
            setLocation({city: true, lat: 0, lon: 0});
        }

            if (location.city === true || location.lat !== 0){
                let newUrl = `https://api.openweathermap.org/data/2.5/weather?${location.city === true ? "q=" + city : ""}${location.city === false ? "&lat=" + location.lat  + "&lon=" + location.lon : "" }&appid=8d342f682d66b6e1370bc79bd312bcd2&units=imperial`;
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
    },[setLocation, location.city, location.lat, location.lon, city, props])

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