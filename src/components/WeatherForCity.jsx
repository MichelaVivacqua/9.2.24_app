import React, { useState, useEffect } from "react";

const WeatherForCity = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const API_KEY = "bb4ef60fc701792933adb0a17926d112";
        const API_BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`;

        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new Error("Errore durante la ricerca della città");
        }
        const data = await response.json();
        console.log("Dati ricevuti dalla chiamata API per", city, ":", data);
        setWeatherData(data);
      } catch (error) {
        console.error("Errore nella chiamata API per", city, ":", error);
      }
    };

    fetchWeatherData();
  }, [city]);

  return (
    <div>
      {weatherData && (
        <div>
          <h2>Il meteo di oggi a {weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp} °C</p>
          <p>Condizioni: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherForCity;
