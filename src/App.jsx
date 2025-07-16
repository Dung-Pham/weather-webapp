import { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import './App.css'
import { TodayWeather } from './components/todayWeather';
import ForecastHourDay from './components/forecastHoursDay';
import ForecastDay from './components/forecastDay';

function App() {

  const {
    today,
    data, loading, error,
    date, setDate,
    hour, setHour,
    currentHour, setCurrentHour,
    currentWeather, setCurrentWeather
  } = useContext(AppContext)


  const [forecastday, setForecastday] = useState([])
  const [tempDataset, setTempDataset] = useState(null)
  const [forecastdays, setForecastdays] = useState([])
  // lay list forecast 7 ngay
  
    // lay du bao o date duoc chon
    const takeForecastOfDay = () =>{
        // date : YYYY-MM-DD
        // console.log('data hien tai:', data);
        
        const forecastday = data?.forecastday.find(forecast => forecast.date === date) 
        setForecastday(forecastday?.hour)
        console.log('forecastday', forecastday?.hour);
        
        return forecastday
    }
  
    //lay du bao o hour duoc chon
    const takeForecastOfHour = () =>{
        const forecastHours = takeForecastOfDay()?.hour
        console.log('checkkkkkkk', forecastHours);
        
        const currWeather = forecastHours?.find(forecast => forecast.time === hour)
        console.log('du bao hien tai: ', currWeather);
        // la du bao cua date va hour dc chon
        return currWeather
    }

    useEffect(() => {
        const result = takeForecastOfHour()
        setCurrentWeather(result)
        console.log('check resul', result);
        let count = 0
        let sum = 0
        // xu ly lay tempDataset of day
        const dataset = []
        forecastday?.forEach((hour, i) =>{
            
            sum += hour.temp_c
            count +=1
            // console.log(count);
            
            if (count === 6) {
                const average = sum/6
                sum = 0
                count = 0
                dataset.push(average.toFixed(1))
            } 
            // console.log(hour , 'temp: ', hour.temp_c);
            
        })
        dataset.push(dataset.shift()) // dua phan tu dau xuong cuoi mang
        console.log(dataset);
        setTempDataset(dataset)

        
        
    }, [hour, today, currentHour, data, forecastday, date])
    
    useEffect(()=>{
      // xu ly lay forecast tong quan moi ngay
      const getForecastdays = () =>{
        const list = data?.forecastday.map((day) => {
          const weatherOfday = {
            ...day.day,
            date: day.date
          }
          console.log('day la weather 1 ngay: ', weatherOfday);
          
          return weatherOfday
        })
        return list
      }
        setForecastdays(getForecastdays())
    },[data])
  return (

    loading || !currentWeather ? <h1>LOADING...</h1> : 
      <div className='app'>
        <TodayWeather currentWeather={currentWeather} tempDataset={tempDataset}/>
        <div className='forecast-container'>
          <ForecastHourDay forecastday={forecastday}/>
          <ForecastDay forecastdays={forecastdays}/>
        </div>
        
      </div>
       
  )
}

export default App
