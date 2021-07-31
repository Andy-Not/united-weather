import {useEffect, useRef, useState} from "react";
// import classes from "./styles/citysearch.module.css";
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import SearchIcon from '@material-ui/icons/Search';
// import Avatar from '@material-ui/core/Avatar';


import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(0),
            width: "auto"
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch"
            }
        }
    }
}));

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