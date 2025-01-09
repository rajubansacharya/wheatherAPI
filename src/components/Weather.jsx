import React, { useState, useEffect } from 'react';

function Weather() {
    const [temperature, setTemperature] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [name, setName] = useState(null);
    const [country, setCountry] = useState(null);

    const API_KEY = ""; 

    // Success callback for geolocation
    function success(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setLatitude(lat);
        setLongitude(long);
    }
    function error() {
        console.log("Unable to retrieve your location");
    }
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    // Fetch weather data when latitude and longitude change
    useEffect(() => {
        if (latitude && longitude) {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
            )
                .then((res) => res.json())
                .then((data) => {
                    const tempKelvin = data?.main?.temp; 
                    const country = data?.sys?.country;
                    const name = data?.name;
                    if (tempKelvin && name && country) {
                        const convertedTemperature = Math.trunc(tempKelvin - 273.15);
                        setTemperature(convertedTemperature);
                        setName(name);
                        setCountry(country);
                    }
                })
                .catch((err) => console.error("Error fetching weather data:", err));
        }
    }, [latitude, longitude]);

    return (
        <>
            <h1>
            <h1> {temperature} &deg; {name} {country} </h1>
            </h1>
        </>
    );
}

export default Weather;
