import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
import '../styles/todayWeather.css'
import icons from '../assets/icons/icon-index';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  plugins,
  elements,
  Ticks,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const   WeatherIcon = ({type, value}) =>{

    return(
        <>
            <div>
                icon {type}
            </div>
        </>
    )
}
const HeatChart = ({dataset}) =>{

    const options = {
        responsive: true,
        plugins:{
            legend: {
                display: false
            },
            title : {
                display: true, 
                text : 'Temperature',
                color: '#1F6099'
            }
        },
        scales:{
            x: {
                grid: {display: false}, 
                border : {display: false},
                ticks : {
                    color: '#1F6099',
                    font: {
                        weight: '550'
                    }
                }
            },
            y: {
                display: false,
                min: 0,
                max: 40,
            },
        
        }, 
        elements:{
            line:{
                tension: 0.4,
            }
        }
    }

    const labels = ['Morning', 'Afternoon', 'Evening', 'Night']
    // const list = ['25', '34', '26', '22']
    const data = {
        labels: labels.map((label, i) => [label, `${dataset[i]}°`]),
        datasets: [{
            label : 'Temperature',
            data: dataset,
            borderColor: '#406E96',
        }]
    }
    return (
        <>
            <Line options={options} data = {data} width={280} height={200}/>
        </>
    )
}

const IconText = ({icon, text}) =>{
    return(
        <div className='icon-text-container'>
            <img src={icon}></img>
            <h4>{text}</h4> 
        </div>
    )
}

const SelectLocation = () =>{
    const {
        locationName, setLocationName,
        locationList,
        locationStr, setLocationStr,
    } = useContext(AppContext)

    
    const handleSelectLocation = (e) =>{
        const [locName, locStr] = e.target.value.split(';')
        setLocationName(locName)
        setLocationStr(locStr)
    }
    return(
        <select className="location-select"
            value={`${locationName};${locationStr}`} 
            onChange={handleSelectLocation}
            name="status" 
            id="status-select">
                {locationList.map((loc) =>
                    <option key={loc.code} value={`${loc.name};${loc.location.lat},${loc.location.lng}`}>{loc.name}</option>
                )}
        </select>
    )
}
const WeatherCard_1 = (props) =>{
    const { currentWeather, dataset} = props
    console.log('day la weather truyen cho card1', currentWeather)
    const {time, temp_c, condition, pressure_mb, humidity, wind_kph} = currentWeather
    const convertTime = (time) =>{
        const obj = dayjs(time)
        return obj.format('HH:mm A')
    }
    console.log('temdataset la', dataset);
    
    
    return (
        <div className="card_1">
            <div className='card_1-el_1'>
                <div className='card_1-el_1_1'>
                    <IconText icon={icons.location} text={<SelectLocation/>}/>
                    <p>{convertTime(time)}</p>
                </div>
                <div className='card_1-el_1_2'>
                    <h1>{temp_c}°</h1>
                    <p>{condition.text}</p>
                </div>
                <div className='card_1-el_1_3'>
                    <IconText icon={icons.pressure} text={`${pressure_mb}hpa`} />
                    <IconText icon={icons.dropWater} text={`${humidity}%`} />
                    <IconText icon={icons.wind} text={`${wind_kph}km/h`} />
                </div>
            </div>

            <div className='chart-container'>
                <HeatChart dataset = {dataset} />
            </div>
        </div>
    )
}
const WeatherCard_2 = (props) =>{
    return(
        <div className='card_2-content'>
            <div className='card_2-el_1'>
                <h3>{props.type}</h3>
                <p>{props.review}</p>
                <h3>{props.value}</h3>
            </div>
            <WeatherIcon type = {props.type} value = {props.value}/>
        </div>
    )
}

const TodayWeather = ({currentWeather, tempDataset}) =>{
    const {today,
        currentHour,
    } = useContext(AppContext)
    
    // console.log('ten location laaaaaaa', location.name)
    return (
        <div className='show-weather-container'>
            {/* <p>hom nay la ngay {today}</p>
            <p> hien tai la {currentHour} gio </p> */}
            {!currentWeather ? <h1>LOADING...</h1> : <div className='card-container'>
                <WeatherCard_1  currentWeather = {currentWeather} dataset = {tempDataset}/>
                {/* <h1>current time {currentWeather.time}</h1> */}
                <WeatherCard_2 type ={'Wind'} review = {'Today wind speed'} value = {currentWeather.wind_kph}/>
                <WeatherCard_2 type ={'Rain Chanse'} review = {'Today rain chanse'} value = {currentWeather.chance_of_rain}/>
                <WeatherCard_2 type ={'Pressure'} review = {'Today Pressure'} value = {currentWeather.pressure_mb}/>
                <WeatherCard_2 type ={'UV Index'} review = {'Today UV index'} value = {currentWeather.uv}/> 
            </div>}
        </div>
    )
}

export {TodayWeather}