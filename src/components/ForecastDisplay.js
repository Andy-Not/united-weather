import axios from "axios";
import {useEffect, useState} from "react";
import style from "./styles/forecast.module.css";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ForecastDisplay = (props) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
            flexDirection: "row",
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
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
                        forecast: response.data.daily.slice(1)
                    }
                );
                console.log("FORECAST CALL");
            });}
            console.log("loop in forecast")
    },[props.coords])

    const classes = useStyles();

    return(
        <div className={style.days}>
        {forecastData ? forecastData.forecast.map(item => (
            <div key={item.dt}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>{days[new Date(item.dt * 1000).getDay()]} {new Date(item.dt * 1000).getDate()}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component={'span'}>
                            <Paper>High:{Math.round(item.temp.max)}&#176;F</Paper>
                            <Paper>Low:{Math.round(item.temp.min)}&#176;F</Paper>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>)
        ): ""}
        </div>   )

}
export default ForecastDisplay;