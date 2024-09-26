// import React from 'react'

const WeatherIcon = ({ icon, background, color}) => {
    return (
      <div style={{ backgroundColor: background, padding:'5px', borderRadius:'10px', color: color }}>
        {icon}
      </div>
    );
  };
  
  export default WeatherIcon;
  