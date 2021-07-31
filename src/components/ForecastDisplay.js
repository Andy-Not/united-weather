import axios from "axios";
import {useEffect, useState} from "react";
import classes from "./styles/forecast.module.css";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
const ForecastDisplay = (props) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0.5),
                width: theme.spacing(16),
                height: theme.spacing('auto'),
                background: "#FFFFFF",
                background: "linear-gradient(to bottom, #FFFFFF 0%, rgba(0, 0, 0, 0) 90%)"
            },
        },

    }));

 const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
 const [forecastData, setForecastData] = useState(null);

    useEffect(() => {
        if (props.coords){let newUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.coords.lat}&lon=${props.coords.lon}&exclude=minutely&appid=8d342f682d66b6e1370bc79bd312bcd2&units=imperial`;
            axios.get(newUrl).then(response => {
                console.log(newUrl)
                console.log(response.data)
                setForecastData(
                    {
                        forecast: response.data.daily
                    }
                );
                console.log("FORECAST CALL");
            });}
            console.log("loop in forecast")
    },[props.coords])

    const classes = useStyles();

    return(     <div className={classes.root}>
                        {forecastData ? forecastData.forecast.map(item => (
                            <Paper className={classes.paper} key={Math.random()} elevation={3}>
                                <div> <h3>{days[new Date(item.dt * 1000).getDay()]}</h3></div>
                                <div>Temp: {Math.round(item.temp.day)}&#176;F</div>
                                <div>High:{Math.round(item.temp.max)}&#176;F</div>
                                <div>Low:{Math.round(item.temp.min)}&#176;F</div>
                            </Paper>)): ""}
                </div>)
}
export default ForecastDisplay;