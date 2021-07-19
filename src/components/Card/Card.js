import axios from "axios";
import {useEffect, useState} from "react";
const Card = (props) => {

    const [imgLinks, setImgLinks] = useState("");
    const [weatherDescription, setWeatherDescription] = useState(
        {
            temp: "",
            description: ""
        }
    )
    let bgImgInline = {
        backgroundImage:`url(${imgLinks.regular})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundSize: "cover"
    }
    useEffect(() => {
        const typeOfweather = ["cold-weather","chill-weather","warm-weather","hot-weather"];
        if (props.weatherData !== "" && (weatherDescription.temp !== "" && weatherDescription.description !== "")) {
            let newUrl = `https://api.unsplash.com/photos/random?query=${weatherDescription.temp}-with-${weatherDescription.description}-clouds&client_id=eAsl8SA-Wai1oX3_Q1jzG0d7G7Qh1sGcC0_Lrt-0CL4`
            axios.get(newUrl).then(response => {
                console.log(newUrl)
                setImgLinks(
                    {
                        regular: response.data.urls.regular
                    }
                );
                console.log("img api call made")
            });
            console.log(props.weatherData);
        }
        if (props.weatherData !== ""){
            if (props.weatherData.currentTemp <= 40){
                setWeatherDescription(
                    {
                        temp: typeOfweather[0],
                        description: props.weatherData.description
                    }
                )
            }else if (props.weatherData.currentTemp > 40 && props.weatherData.currentTemp <= 60){
                setWeatherDescription(
                    {
                        temp: typeOfweather[1],
                        description: props.weatherData.description
                    }
                )
            }else if (props.weatherData.currentTemp > 60 && props.weatherData.currentTemp <= 80){
                setWeatherDescription(
                    {
                        temp: typeOfweather[2],
                        description: props.weatherData.description
                    }
                )
            }else {
                setWeatherDescription(
                    {
                        temp: typeOfweather[3],
                        description: props.weatherData.description
                    }
                )
            }
        }

        console.log("loops test")
        },[props.weatherData,weatherDescription.temp,weatherDescription.description])
    console.log(weatherDescription)
    return(
        <div style={bgImgInline}>
            {props.children}
        </div>
    )
}
export default Card;