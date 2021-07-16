import {useEffect, useRef, useState} from "react";

const CitySearch = (props) => {
    const [city, setCity] = useState("");
    const currentCity = useRef("");

    const {setCitySearch} = props;

    const submit = (e) => {
        e.preventDefault();
        setCity(currentCity.current.value)
    }

    useEffect(() => {
        setCitySearch(city);
    },[city, setCitySearch]);


    return(
        <form action="" onSubmit={submit}>
            <div>{city}</div>
            <input ref={currentCity}  type="text"/>
            <button type={"submit"}> search</button>
        </form>
    )
}
export default CitySearch;