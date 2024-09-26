// import React from 'react'
import { CiDroplet } from "react-icons/ci";
import { GiWindsock } from "react-icons/gi";
import { MdOutlineRotate90DegreesCw } from "react-icons/md";
import { WiDayCloudyGusts } from "react-icons/wi";

function formatDate(dateString) {
  const dateObj = new Date(dateString); // Convert the date string to a Date object
  const day = dateObj.getDate();        // Get the day
  const month = dateObj.toLocaleString('default', { month: 'short' }); // Get the month name (e.g., "May")

  return `${day} ${month}`;  // Return formatted as "12 May"
}

const NextDay = ({icon, date, temp, temp_max, wind, gust, degree, humidity, description}) => {
  const formatedDate = formatDate(date)
  
  return (
    <div className="next-day-card">
      <h3>{formatedDate}</h3>
      <div className="image-container">
        <img src={icon} alt="" style={{width:'100px', height:'100px', objectPosition:'center'}}/>
        <p>{description}</p>
      </div>
      <div className="next-day-temp ">
        <h1>{(temp - 273.15).toFixed(0)}℃</h1>
        <h2>{(temp_max - 273.15).toFixed(0)}℃</h2>
      </div>
      <div className="next-day-extra-info">
        <div className="common-class">
          <GiWindsock/>
          <p>{wind}km/h</p>
        </div>
        <div className="common-class">
          <CiDroplet/>
          <p>{humidity}%</p>
        </div>
        
        <div className="common-class">
          <WiDayCloudyGusts/>
          <p>{gust}m/s</p>
        </div>
        <div className="common-class">
          <MdOutlineRotate90DegreesCw/>
          <p>{degree}°</p>
        </div>
      </div>
    </div>
  )
}

export default NextDay