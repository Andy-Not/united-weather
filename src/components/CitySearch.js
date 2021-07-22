import {useEffect, useRef, useState} from "react";
import classes from "./styles/citysearch.module.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

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
            <TextField inputRef={currentCity} id="outlined-basic" label="City" variant="outlined" />
            {/*<input   type="text"/>*/}
            <Button style={{height: "3.5rem"}} type={submit}><SearchIcon/></Button>
            {/*<button type={"submit"} onClick={submit}> search</button>*/}
        </form>
    )
}
export default CitySearch;