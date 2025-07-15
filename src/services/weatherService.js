import axios from 'axios';
// const baseUrl = 'http://api.weatherapi.com/v1/forecast.json?key=b5ba65a51e774d01b8721151251107&q=Hanoi&days=1&aqi=yes'
const baseUrl = 'http://localhost:3001/forecast'
const getAllToday = async() =>{
    try {
        const res = await axios.get(baseUrl)
        // console.log('from service: data fetch dc la:' , res.data);
        
        return res.data
    } catch (error) {
        console.log('fail from service', error);
        throw error
    }
    
}

export default {getAllToday}