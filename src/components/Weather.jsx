import React, { useState, useEffect } from 'react';


function Weather() {

    
    const [temperature , setTemperature] = useState([]);
    const [latitude, setLatitude] = useState(null)
    const [longitude ,setLongitude] = useState(null)



    function success(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setLatitude(lat);
        setLongitude(long);
      }
    
      // Error callback for geolocation
      function error() {
        console.log("Unable to retrieve your location");
      }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error);
      }, []);

    
    useEffect(() => {

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=27.66452&lon=85.36846&appid=`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const x = data["main"]["temp"];
            const convertedtemperatue = Math.trunc(x - 273.15) ;
            setTemperature(convertedtemperatue);

        });
    }, [latitude, longitude]);


    return (
        <>
           
            <h1> {temperature} &deg; {latitude}  </h1>
        </>
    );
}

export default Weather;