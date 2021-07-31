import {useEffect, useRef, useState} from "react";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles/navStyle";

const CitySearch = (props) => {
    const classes = useStyles();
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
        <form onSubmit={submit}>
            <div className={classes.root}>
                <AppBar position="static" style={{backgroundColor: "#B24085"}}>
                    <Toolbar>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                inputRef={currentCity}
                                placeholder="Search City"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                inputProps={{ "aria-label": "search" }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </form>
    )
}
export default CitySearch;