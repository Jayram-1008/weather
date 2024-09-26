import { useState, useEffect, useContext } from 'react';
import '../App.css';
import TodayTemp from './TodayTemp';
import WeatherIcon from './WeatherIcon';

import { FaWind } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import CityModel from './CityModel';
import { FaCompressAlt } from "react-icons/fa";
import { WiDayCloudyGusts } from "react-icons/wi";
import { BsSunriseFill } from "react-icons/bs";
import { BsSunsetFill } from "react-icons/bs";

import { CityContext } from '../context/CityContext';

import 'bootstrap/dist/css/bootstrap.min.css';

const CurrentDay = ({ temp, temp_max, temp_min, wind, humidity, pressure, gust, sunrise, sunset, description, icon, dayTime }) => {
  const [tempUnit, setTempUnit] = useState('℃');
  const [displayTemp, setDisplayTemp] = useState({ temp, temp_max, temp_min });

  // Convert temperatures based on the selected unit
  const convertToFahrenheit = (tempInCelsius) => (tempInCelsius * 9/5 + 32).toFixed(0);

  
  const toggleTempUnit = () => {
    if (tempUnit === '℃') {
      // Convert to Fahrenheit
      setDisplayTemp({
        temp: convertToFahrenheit(temp - 273.15),
        temp_max: convertToFahrenheit(temp_max - 273.15),
        temp_min: convertToFahrenheit(temp_min - 273.15)
      });
      setTempUnit('℉');
    } else {
      // Convert back to Celsius
      setDisplayTemp({
        temp: (temp - 273.15).toFixed(0),
        temp_max: (temp_max - 273.15).toFixed(0),
        temp_min: (temp_min - 273.15).toFixed(0)
      });
      setTempUnit('℃');
    }
  };

  useEffect(() => {
    // Initialize temperatures in Celsius by default
    setDisplayTemp({
      temp: (temp - 273.15).toFixed(0),
      temp_max: (temp_max - 273.15).toFixed(0),
      temp_min: (temp_min - 273.15).toFixed(0)
    });
  }, [temp, temp_max, temp_min]);
  
  const cityName = useContext(CityContext)

  const date = new Date(dayTime);

  // Get the day of the week
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  


  return (
    <div className="today-background">
      <div className='controller'>
        <CityModel />
        <button className='temp-unit' onClick={toggleTempUnit}>{tempUnit}</button>
      </div>
      <div className='today-content'>
        <div className='content-1'>
          <div className='content-location'>
            <h1>{cityName.city}</h1>
            <p>{formattedDate}</p>
          </div>
          <br />
          <div className='more-content-1'>
            <div className='more-content-1-info'>
              <WeatherIcon icon={<FaWind fontSize='30px' />} background="#7668E5" color="#fff" />
              <p>Wind {wind}km/h</p>
            </div>
            <div className='more-content-1-info'>
              <WeatherIcon icon={<FaDroplet fontSize='30px' />} background="#7668E5" color="#fff" />
              <p>Humidity {humidity}%</p>
            </div>
            <div className='more-content-1-info'>
              <WeatherIcon icon={<FaCompressAlt fontSize='30px' />} background="#7668E5" color="#fff" />
              <p>Pressure {pressure}</p>
            </div>
            <div className='more-content-1-info'>
              <WeatherIcon icon={<WiDayCloudyGusts fontSize='30px' />} background="#7668E5" color="#fff" />
              <p>Gust {gust}</p>
            </div>
            <div className='more-content-1-info'>
              <WeatherIcon icon={<BsSunriseFill fontSize='30px' />} background="#7668E5" color="#fff" />
              <p>Sunrise {sunrise}</p>
            </div>
            <div className='more-content-1-info'>
              <WeatherIcon icon={<BsSunsetFill fontSize='30px' />} background="#7668E5" color="#fff" />
              <p>Sunset {sunset}</p>
            </div>
          </div>
        </div>
        <div className='content-2'>
          <TodayTemp 
            description={description}
            temp={displayTemp.temp+tempUnit} 
            temp_max={displayTemp.temp_max+tempUnit} 
            temp_min={displayTemp.temp_min+tempUnit } 
            unit={tempUnit}
            icon={icon}
          />
        </div>
      </div>
    </div>
  );
}

export default CurrentDay;
