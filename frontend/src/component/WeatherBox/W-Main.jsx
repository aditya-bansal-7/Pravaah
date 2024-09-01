import React from 'react'
import MapBox from './MapBox'
import WeatherDisplay from './WeatherDisplay'
import Citz from './Citz'
import Summary from './Summary'
import Forecast from './Forecast'
const Main = () => {
  return (

    <div  className=" flex h-[100vh] justify-center overflow-hidden p-2 pt-10 w-full bg-[url('/bg-weather.jpg')] object-fit ">
      {/* <img className=' absolute w-[88.5vw] -mt-10' src="/bg-weather.jpg" alt="" /> */}
        <div  className='flex flex-col max-w-6xl items-center w-full '>
            <div className='flex w-full flex-row h-[120vh] gap-8 p-4'>
                <WeatherDisplay />
                <MapBox />
                <Citz />
            </div>
            <div className='flex w-full flex-row h-[120vh] gap-8 p-4'>
                <Forecast/>
                <Summary />
            </div>
            <div className='flex h-full flex-row '>

            </div>
        </div>
    </div>
  )
}

export default Main