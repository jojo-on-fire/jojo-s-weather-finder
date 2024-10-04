import React, {useEffect, useRef, useState} from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'

const Weather = () => {

    const [weatherdata, setweatherdata] = useState(false);
    const inpref = useRef();
    const iconlist = {
        "01d" : clear,
        "01n" : clear, 
        "02d" : cloud, 
        "02n" : cloud,
        "03d" : cloud,
        "03n" : cloud,
        "04d" : drizzle,
        "04n" : drizzle,
        "09d" : rain,
        "09n" : rain,
        "10d" : rain,
        "10n" : rain,
        "13d" : snow,
        "13n" : snow,    
    }
    const search = async(city) => {
        if (city === ""){
            alert("Enter a city name you dumbfuck!");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API}`

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }
            const icon = iconlist[data.weather[0].icon] || clear;
            console.log(data);
            setweatherdata({
                humidity : data.main.humidity,
                WindSpeed : data.wind.speed,
                temperature : Math.floor(data.main.temp),
                location : data.name,
                icon : icon,

            })
        } catch (error) {
            setweatherdata(false);
            console.error("Error in fetching data");
        }
    }

    useEffect(()=>{
        search("Bengaluru");
    },[])

  return (
    <div className='whether'>
      <div className="search-bar">
        <input type="text" placeholder='Search' ref={inpref}/>
        <img src={search_icon} alt="" onClick={()=> search(inpref.current.value)}/>
      </div>
      {weatherdata?<>
        <img src={weatherdata.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherdata.temperature}°c</p>
        <p className='location'>{weatherdata.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity} alt="" />
                <div>
                    <p>{weatherdata.humidity}%</p>
                    <span>humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind} alt="" />
                <div>
                    <p>{weatherdata.WindSpeed}kmph</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
      </>:<></>}
    </div>
  )
}

export default Weather
