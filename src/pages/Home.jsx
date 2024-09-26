import { useContext, useEffect, useState } from 'react';
import '../App.css'; // Assuming you have a separate CSS for Home
import CurrentDay from '../components/CurrentDay';
import NextDay from '../components/NextDay';
import { CityContext } from '../context/CityContext';
import Loading from '../components/Loading';
import getUniqueDateData from '../components/UniquefiveDays';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState('');
  const [fiveDaysWeather, setFiveDaysWeather] = useState([]);

  const apiKey = "ab6e85b2af0c461aabf9123a809bbcfa" // Move API key to environment variable
  const cityContext = useContext(CityContext);
  const cityName = cityContext.city;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);

        // For next five days
        const fiveDaysRecord = getUniqueDateData(data.list); // Use data.list directly
        setFiveDaysWeather(fiveDaysRecord);

        const iconCode = data.list[0].weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        setWeatherIcon(iconUrl);
      } else {
        console.error('Error fetching weather data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (cityName) {
      fetchWeatherData();
    }
  }, [cityName]); // Use cityName as a dependency instead of apiUrl

  if (weatherData === null) {
    return <Loading />;
  }

  if (weatherData.list.length === 0) {
    return <p>Error loading weather data</p>;
  }

  // Convert UNIX timestamp to human-readable time
  const convertToTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const sunriseTime = convertToTime(weatherData.city.sunrise, weatherData.city.timezone);
  const sunsetTime = convertToTime(weatherData.city.sunset, weatherData.city.timezone);

  return (
    <>
      <div className='weather-container'>
        <br />
        <CurrentDay
          description={weatherData.list[0].weather[0].description}
          temp={weatherData.list[0].main.temp}
          temp_max={weatherData.list[0].main.temp_max}
          temp_min={weatherData.list[0].main.temp_min}
          wind={weatherData.list[0].wind.speed}
          humidity={weatherData.list[0].main.humidity}
          sunrise={sunriseTime}
          sunset={sunsetTime}
          pressure={weatherData.list[0].main.pressure + 'hPa'}
          gust={weatherData.list[0].wind.gust + 'm/s'}
          icon={weatherIcon}
          dayTime={weatherData.list[0].dt_txt}
        />
        <br />
        <br />
        <h2>5-Day Forecast</h2>
        <div className='next-five-day-container'>
          {fiveDaysWeather.map((data, index) => (
            <NextDay
              key={index}
              temp={data.main.temp}
              temp_max={data.main.temp_max}
              humidity={data.main.humidity}
              wind={data.wind.speed}
              gust={data.wind.gust}
              degree={data.wind.deg}
              icon={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              date={data.dt_txt}
              description={data.weather[0].description}
            />
          ))}
        </div>
        <br />
        <br />
      </div>
    </>
  );
};

export default Home;
