import { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../AppContext";
import '../styles/forecastHoursDay.css'
import dayjs from "dayjs";
export const ForecastHourBox = (props) =>{
    const {hour, setHour,
    } = useContext(AppContext) 
    const {time, icon, temp_c} = props
    // console.log('trong tung hour', props);
    const buttonRef = useRef(null)

    const handleClickForecast = () =>{
        setHour(time)
    }
    const timeConverted = dayjs(time).format('hh A')
    return(
        <>
            <button ref = {buttonRef} className ={`${hour === time ? "selected-button" : ""}`} onClick={handleClickForecast}>
                <p>{timeConverted}</p>
                <img src={`https:${icon}`} alt="Weather Icon" />
                <h3>{temp_c}°</h3>
            </button>
            
        </>
    )
} 

const ForecastHoursDay = ({forecastday}) =>{
    // console.log('forsecastday trong comp forcast', forecastday);
    const sliderRef = useRef(null)
    const {hour} = useContext(AppContext)
    useEffect(()=>{
        const selected = sliderRef.current.querySelector('.selected-button')
        if (selected) {
            selected.scrollIntoView({
                behavior: 'smooth',
                inline : 'start'
            })
        }
    },[hour])
    return(
        <div className="slide-container" ref={sliderRef}>
            {
                forecastday.map((hour, i) =>
                    <ForecastHourBox key = {i} time ={hour.time} icon = {hour.condition.icon} temp_c = {hour.temp_c}/>
                )
            }
        </div>
    )
}

export default ForecastHoursDay