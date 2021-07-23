import {useEffect, useRef, useState} from "react";
import classes from "./styles/citysearch.module.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';

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
            <div>
                <TextField inputRef={currentCity} id="outlined-basic" label="City" variant="outlined" />
                <Button style={{height: "3.5rem"}} type={"submit"}><SearchIcon/></Button>
             </div>
            <a className={classes.link} href="https://github.com/Andy-Not">
                <Avatar className={classes.large} alt="Joandy Alejo garcia" src="https://avatars.githubusercontent.com/u/63996685?v=4" />
            </a>
        </form>
    )
}
export default CitySearch;