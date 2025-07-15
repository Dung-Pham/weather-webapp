import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
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
} from 'chart.js';
import { Line } from 'react-chartjs-2';

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
                text : 'Temperature'
            }
        },
        scales:{
            x: {grid: {display: false}, border : {display: false}},
            y: {
                display: false,
                min: 0,
                max: 50,
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
            borderColor: 'red',
            backgroundColor : 'blue'

        }]
    }
    return (
        <>
            <p>day la chart</p>
            <Line options={options} data = {data}/>
        </>
    )
}
const WeatherCard_1 = (props) =>{
    const {location , currentWeather, dataset} = props
    console.log('day la weather truyen cho card1', currentWeather)
    const {time, temp_c, condition, pressure_mb, humidity, wind_kph} = currentWeather
 
    console.log('temdataset la', dataset);
    
    
    return (
        <>
            <div>
                <div>
                    <h3>thanh pho: {location}</h3>
                    <p>Today: {time}</p>
                </div>
                <div>
                    <h1>nhiet do: {temp_c}</h1>
                    <p>mo ta: {condition.text}</p>
                </div>
                <div>
                    <p>ap suat: {pressure_mb}</p>
                    <p>do am: {humidity}</p>
                    <p>toc do gio: {wind_kph}</p>
                </div>
            </div>

            <div style={{ width: '600px', height: '300px' }}>
                <HeatChart dataset = {dataset}/>
            </div>
        </>
    )
}
const WeatherCard_2 = (props) =>{
    return(
        <>
            <div>
                <h3>{props.type}</h3>
                <p>{props.review}</p>
                <h3>{props.value}</h3>
            </div>
            <WeatherIcon type = {props.type} value = {props.value}/>
        </>
    )
}

const TodayWeather = ({currentWeather, tempDataset}) =>{
    const {today,
        currentHour,
    } = useContext(AppContext)
    
    
    return (
        <>
            <p>hom nay la ngay {today}</p>
            <p> hien tai la {currentHour} gio </p>
            {!currentWeather ? <h1>LOADING...</h1> : <div>
                <WeatherCard_1 location = {'Hanoi'} currentWeather = {currentWeather} dataset = {tempDataset}/>
            </div>}

            <div>
                <h1>current time {currentWeather.time}</h1>
                <WeatherCard_2 type ={'Wind'} review = {'Today wind speed'} value = {currentWeather.wind_kph}/>
                <WeatherCard_2 type ={'Rain Chanse'} review = {'Today rain chanse'} value = {currentWeather.chance_of_rain}/>
                <WeatherCard_2 type ={'Pressure'} review = {'Today Pressure'} value = {currentWeather.pressure_mb}/>
                <WeatherCard_2 type ={'UV Index'} review = {'Today UV index'} value = {currentWeather.uv}/> 
            </div>
        </>
    )
}

export {TodayWeather}