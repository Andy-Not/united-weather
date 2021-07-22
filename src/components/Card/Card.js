import axios from "axios";
import {useEffect, useState} from "react";
const Card = (props) => {

    const [imgLinks, setImgLinks] = useState("");
    const x = ["cat","lizard","dog","bird"];
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
        let typeOfWeather = "";
        let weatherDescription = "";
        // const typeOfweather = ["cold-weather","chill-weather","summer-time","hot-weather"];
        if (typeOfWeather === "" && weatherDescription === ""){
            if (props.weatherData.currentTemp <= 40){
                typeOfWeather = x[0]
                console.log("cat")
            }else if (props.weatherData.currentTemp > 40 && props.weatherData.currentTemp <= 60){
                typeOfWeather = x[1]
                console.log("lizard")
            }else if (props.weatherData.currentTemp > 60 && props.weatherData.currentTemp <= 80){
                typeOfWeather = x[2]
                console.log("dog")
            }else if (props.weatherData.currentTemp > 80){
                typeOfWeather = x[3]
                console.log("bird")
            }

        if (typeOfWeather !== "") {
            let newUrl = `https://api.unsplash.com/photos/random?query=${typeOfWeather}-with-${""}-clouds&client_id=eAsl8SA-Wai1oX3_Q1jzG0d7G7Qh1sGcC0_Lrt-0CL4`
            axios.get(newUrl).then(response => {
                console.log(newUrl)
                setImgLinks(
                    {
                        regular: response.data.urls.regular
                    }
                );
                console.log("img api call made")
            });
            console.log("in api img");
        }

        console.log("EFFECT ACTIVE")


            console.log("loopi")
        }
        },[props.weatherData.currentTemp])
    console.log(props.weatherData)
    return(
        <div style={bgImgInline}>
            {props.children}
        </div>
    )
}
export default Card;