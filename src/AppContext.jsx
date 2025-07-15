// AppContext.js
import { createContext, useState } from 'react';
// import {query, where, collection, getDocs} from "firebase/firestore";
// import { db } from './firebase-config';
import { useFetch } from './hooks/useFetch';
import weatherService from './services/weatherService'
import dayjs from 'dayjs';
// Tạo context
export const AppContext = createContext();



// Provider
export const AppProvider = ({ children }) => {
  const now = dayjs()
  const round = now.minute(0).second(0).millisecond(0)
  console.log('day la round, ', round.format('YYYY-MM-DD HH:mm'));
  
  const [date, setDate] = useState(now.format('YYYY-MM-DD'))
  console.log('date da duoc set lai', date);
  
  const {data , loading, error} = useFetch(weatherService.getAllToday)
  const [hour, setHour] = useState(round.format('YYYY-MM-DD HH:mm'))
  const [currentHour, setCurrentHour] = useState(round.unix())

  const [currentWeather, setCurrentWeather] = useState(null)
  return (
    <AppContext.Provider
      value={{
        date, setDate,
        data , loading, error,
        currentHour, setCurrentHour,
        hour, setHour,
        currentWeather, setCurrentWeather
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

