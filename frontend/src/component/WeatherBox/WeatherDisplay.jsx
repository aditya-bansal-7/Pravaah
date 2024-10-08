import React, { useEffect, useState } from 'react';
import { FiWind } from "react-icons/fi";
import { WiCloudy } from "react-icons/wi";
import { LuSun } from "react-icons/lu";

const WeatherDisplay = ({ city, onCityChange }) => {
  const [weatherData, setWeatherData] = useState(null);
  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const cities = {
    "Rishikesh": { "lat": 30.0869, "lon": 78.2676 },
    "Haridwar": { "lat": 29.9457, "lon": 78.1642 },
    "Kanpur": { "lat": 26.4499, "lon": 80.3319 },
    "Varanasi": { "lat": 25.3176, "lon": 82.9739 },
    "Patna": { "lat": 25.5941, "lon": 85.1376 },
    "Kolkata": { "lat": 22.5726, "lon": 88.3639 },
  };

  const cityNames = Object.keys(cities);
  
  const iconMap = {
    '01d': 'wi-day-sunny',
    '01n': 'wi-night-clear',
    '02d': 'wi-day-cloudy',
    '02n': 'wi-night-alt-cloudy',
    '03d': 'wi-cloud',
    '03n': 'wi-cloud',
    '04d': 'wi-cloudy',
    '04n': 'wi-cloudy',
    '09d': 'wi-rain',
    '09n': 'wi-rain',
    '10d': 'wi-day-rain',
    '10n': 'wi-night-rain',
    '11d': 'wi-thunderstorm',
    '11n': 'wi-thunderstorm',
    '13d': 'wi-snow',
    '13n': 'wi-snow',
    '50d': 'wi-fog',
    '50n': 'wi-fog'
  };


  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`${url}/weather?city=${city}`);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeatherData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [url, city]);

  useEffect(() => {
    let currentIndex = cityNames.indexOf(city);
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % cityNames.length;
      onCityChange(cityNames[currentIndex]); 
    }, 8000);

    return () => clearInterval(interval);
  }, [city, onCityChange, cityNames]);

  return (
    <div className=' h-[52vh] bg-[#2b5893]/70 text-white shadow-xl w-[30%] rounded-2xl '>
      <div className='flex w-full justify-start pl-2'>
        <h3 className='p-3 text-lg opacity-85 '>{city} Weather</h3>
      </div>

      {weatherData && weatherData.weather && weatherData.weather.length > 0 ? (
        <>
          <img 
            src={`weather/${weatherData.weather[0].icon}.svg`} 
            alt={weatherData.weather[0].description}
            className='w-[11.65vh] h-[11.65vh] relative top-10 left-14 ' 
          />
          <div>
            <h1 className='text-4xl relative pl-10 left-10 bottom-8'>
              {Math.round(weatherData.main.temp * 10) / 10}
              <span className='absolute text-base h-full left-62'>&deg;C</span>
            </h1>
          </div>
          <div className='w-full flex justify-end items-end pr-24'>
            {weatherData.weather[0].description}
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}

      <div className='flex flex-row gap-8 p-3 relative -bottom-8'>
        <div className='flex flex-col w-full gap-1 h-full justify-center items-center'>
          <FiWind fontSize={44} opacity={0.75} />
          {weatherData && (
            <div>
              <p className='text-sm'>{weatherData.wind.speed}km/h</p>
            </div>
          )}
        </div>
        <div className='flex flex-col -mt-2 w-full h-full justify-center items-center'>
          <WiCloudy fontSize={50} opacity={0.75} />
          {weatherData && (
            <div>
              <p>{weatherData.clouds.all}</p>
            </div>
          )}
        </div>
        <div className='flex flex-col w-full h-full justify-center items-center'>
          <LuSun fontSize={36} opacity={0.75} />
          {weatherData && (
            <div>
              <p className='mt-2'>{weatherData.main.feels_like}&deg;C</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
