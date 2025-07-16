import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import '../styles/forecastDay.css'
import dayjs from "dayjs";
export const ForecastDayBox = (props) =>{
    const {date, setDate, setHour, currentDate, hour} = useContext(AppContext) 
    const {day, icon, temp_c} = props
    const dateObj = dayjs(day)
    const dayName = dateObj.format('dddd')
    const dayMonth = dateObj.format('DD MMM')
    // console.log();
    // const checkday = dayjs(day.date).day()
 
    console.log('trong tung day', props);
    const handleClickForecast = () =>{
        setDate(day)
        const newTime = `${day} ${dayjs(hour).format('HH:mm')}`
        console.log("checkkkk new time", newTime);
        setHour(newTime)
    }
    return(
        <>
            <button className ={`${date === day ? "selected-button" : ""} ${currentDate.day() > dateObj.day() ? 'outOfWeek': ""}`} onClick={handleClickForecast}>
                <div className="el el-1 date-container">
                    <h3>{dayName}</h3>
                    <p>{dayMonth}</p>
                </div>
                <h3 className="el el-2">{temp_c}°</h3>
                <img className="el el-3" src={`https:${icon}`} alt="Weather Icon" />
            </button>
            
        </>
    )
} 

const ForecastDay = ({forecastdays}) =>{
    console.log('forsecast trong comp forcastday', forecastdays);
    return(
        <div className="forecast-day-container">
            {
                forecastdays.map((day, i) =>
                    <ForecastDayBox key = {i} day ={day.date} icon = {day.condition.icon} temp_c = {day.avgtemp_c}/> 
                )
            }
        </div>
    )
}

export default ForecastDay