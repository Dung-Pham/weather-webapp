import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import dayjs from "dayjs";

export const ForecastHourBox = (props) =>{
    const {hour, setHour} = useContext(AppContext) 
    const {time, icon, temp_c} = props
    // console.log('trong tung hour', props);
    const handleClickForecast = () =>{
        setHour(time)
    }
    return(
        <>
            <button onClick={handleClickForecast}>
                <p>{time}</p>
                <p>icon: {icon}</p>
                <h3>{temp_c}</h3>
            </button>
            
        </>
    )
} 

const ForecastHoursDay = ({forecastday}) =>{
    // console.log('forsecastday trong comp forcast', forecastday);
    
    return(
        <>
            {
                forecastday.map((hour, i) =>
                    <ForecastHourBox key = {i} time ={hour.time} icon = {hour.condition.icon} temp_c = {hour.temp_c}/>
                )
            }
        </>
    )
}

export default ForecastHoursDay