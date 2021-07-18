import axios from "axios";
import {useEffect, useState} from "react";
const Card = (props) => {

    const [imgLinks, setImgLinks] = useState("");
    let bgImgInline = {
        backgroundImage:`url(${imgLinks.full})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundSize: "cover"
    }
    useEffect(() => {
        let newUrl = "https://api.unsplash.com/photos/random?query=cold-and-clouds&client_id=eAsl8SA-Wai1oX3_Q1jzG0d7G7Qh1sGcC0_Lrt-0CL4"
        axios.get(newUrl).then(response => {
            console.log(newUrl)
            console.log(response.data)
            setImgLinks(
                {
                    full: response.data.urls.full,
                    regular: response.data.urls.regular
                }
            );
            console.log("img api call made")
        });
    },[])
    return(
        <div style={bgImgInline}>
            {props.children}
        </div>
    )
}
export default Card;