import {useEffect, useRef, useState} from "react";

const CitySearch = (props) => {
    const [city, setCity] = useState("");
    const currentCity = useRef("");

    const submit = (e) => {
        e.preventDefault();
        setCity(currentCity.current.value)
    }

    useEffect(() => {
        props.setCitySearch(city)
    },[city]);


    return(
        <form action="" onSubmit={submit}>
            <div>{city}</div>
            <input ref={currentCity}  type="text"/>
            <button type={"submit"}> search</button>
        </form>
    )
}
export default CitySearch;