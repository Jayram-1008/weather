// import React from 'react'
import '../App.css'

const TodayTemp = ({temp, temp_max, temp_min, description, icon}) => {

  return (
    <div className="today-temp">
        <div style={{backgroundColor:'#353589', color:'#fff', borderRadius:'10px', padding:'3px 10px', textAlign:'center'}}>
            Today
        </div>
        <div className="today-temp-image" >
          <img src={icon} alt=""/>
          <p>{description}</p>
        </div>
        <h1>{temp}</h1>
        <h3>{temp_min} - {temp_max}</h3>
    </div>
  )
}

export default TodayTemp