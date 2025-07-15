import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import dayjs from "dayjs";

export const ForecastDayBox = (props) =>{
    const {setDate, setHour} = useContext(AppContext) 
    const {day, icon, temp_c} = props
    console.log('trong tung day', props);
    const handleClickForecast = () =>{
        setDate(day)
        const newTime = day + ' 00:00'
        console.log("checkkkk new time", newTime);
        setHour(newTime)
        
    }
    return(
        <>
            <button onClick={handleClickForecast}>
                <p>{day}</p>
                <p>icon: {icon}</p>
                <h3>{temp_c}</h3>
            </button>
            
        </>
    )
} 

const ForecastDay = ({forecastdays}) =>{
    console.log('forsecast trong comp forcastday', forecastdays);
    
    return(
        <>
            {
                forecastdays.map((day, i) =>
                    <ForecastDayBox key = {i} day ={day.date} icon = {day.condition.icon} temp_c = {day.avgtemp_c}/>
                )
            }
        </>
    )
}

export default ForecastDay