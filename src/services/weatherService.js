import axios from 'axios';
// const baseUrl = 'http://api.weatherapi.com/v1/forecast.json?key=b5ba65a51e774d01b8721151251107&q=Hanoi&days=7&aqi=yes'
// const baseUrl = 'http://localhost:3001/forecast'
const getAllToday = async(locationStr) =>{
    console.log('dang goi day roi');
    
    try {
        const res = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=b5ba65a51e774d01b8721151251107&q=${locationStr}&days=7&aqi=yes`)
        console.log('from service: data fetch dc la:' , res.data);
        
        return res.data.forecast
    } catch (error) {
        console.log('fail from service', error);
        throw error
    }
    
}

export default {getAllToday}