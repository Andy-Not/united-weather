import axios from "axios";
import {useEffect, useState} from "react";
const Card = (props) => {

    const [imgLinks, setImgLinks] = useState("");
    const weatherTypes = ["hot-chocolate","camp-fire","beach","sun"];

    let bgImgInline = {
        backgroundImage:`url(${imgLinks.regular})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100%",
        width: "100%",
        backgroundSize: "cover",
        position: "fixed",
        // overflow: "scroll",
        // overflowX: "hidden",
        // scrollbarWidth: "none"
    }



    useEffect(() => {
        
        let typeOfWeather = "";
        let weatherDescription = "";
        
        if (typeOfWeather === "" && weatherDescription === ""){
            if (props.weatherData.currentTemp <= 40){
                typeOfWeather = weatherTypes[0]
                weatherDescription = props.weatherData.description;
            }else if (props.weatherData.currentTemp > 40 && props.weatherData.currentTemp <= 60){
                typeOfWeather = weatherTypes[1]
                weatherDescription = props.weatherData.description;
            }else if (props.weatherData.currentTemp > 60 && props.weatherData.currentTemp <= 80){
                typeOfWeather = weatherTypes[2]
                weatherDescription = props.weatherData.description;
            }else if (props.weatherData.currentTemp > 80){
                typeOfWeather = weatherTypes[3]
                weatherDescription = props.weatherData.description;
            }
        }
        
        if (typeOfWeather !== "") {
            let newUrl = `https://api.unsplash.com/photos/random?query=${typeOfWeather}-with-${weatherDescription}&client_id=eAsl8SA-Wai1oX3_Q1jzG0d7G7Qh1sGcC0_Lrt-0CL4`
            axios.get(newUrl).then(response => {
                setImgLinks(
                    {
                        regular: response.data.urls.regular
                    }
                );
            });
        }

        },[props.weatherData.currentTemp])
    return(
        <div style={bgImgInline}>
            {props.children}
        </div>
    )
}
export default Card;