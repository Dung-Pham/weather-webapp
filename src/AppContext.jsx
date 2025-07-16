// AppContext.js
import { createContext, useCallback, useState } from 'react';
// import {query, where, collection, getDocs} from "firebase/firestore";
// import { db } from './firebase-config';
import { useFetch } from './hooks/useFetch';
import weatherService from './services/weatherService'
import dayjs from 'dayjs';
import locations from './locationList';
// Tạo context
export const AppContext = createContext();



// Provider
export const AppProvider = ({ children }) => {
  const [locationList, setLocationList] = useState(locations)
  const initLocationStr = `${locationList[6].location.lat},${locationList[6].location.lng}`
  const [locationStr, setLocationStr] = useState(initLocationStr)
  const [locationName, setLocationName] = useState(locationList[6].name)
  
  const fetchWeather = useCallback(() =>{
    return weatherService.getAllToday(locationStr)
  },[locationStr])
  const now = dayjs()
  const round = now.minute(0).second(0).millisecond(0)
  console.log('day la round, ', round.format('YYYY-MM-DD HH:mm'));
  const [currentDate, setCurrentDate] = useState(now)
  const [date, setDate] = useState(now.format('YYYY-MM-DD'))
  console.log('date da duoc set lai', date);
  
  const {data , loading, error} = useFetch(fetchWeather)
  const [hour, setHour] = useState(round.format('YYYY-MM-DD HH:mm'))
  const [currentHour, setCurrentHour] = useState(round.unix())

  const [currentWeather, setCurrentWeather] = useState(null)
  // const []
  return (
    <AppContext.Provider
      value={{
        date, setDate,
        data , loading, error,
        currentHour, setCurrentHour,
        hour, setHour,
        currentWeather, setCurrentWeather,
        currentDate, setCurrentDate,
        locationName, setLocationName,
        locationList, setLocationList,
        locationStr, setLocationStr
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

