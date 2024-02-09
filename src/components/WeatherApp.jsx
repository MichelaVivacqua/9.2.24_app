import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Form, FormControl, Button } from "react-bootstrap";
import FetchWeatherData from "./FetchWeatherData";
import FetchForecastData from "./FetchForecastData";

const WeatherApp = (props) => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!city) {
      setError("Inserisci una città valida.");
      return;
    }
    try {
      const weatherResponse = await FetchWeatherData(city);
      setWeatherData(weatherResponse);
      setError(null); // Reset error state on successful API call

      const forecastResponse = await FetchForecastData(city);
      setForecastData(forecastResponse);
    } catch (error) {
      console.error("Errore durante la ricerca della città:", error);
      setError("Errore durante la ricerca della città. Riprova più tardi.");
    }
    setCity("");
  };

  return (
    <Navbar
      expand="lg"
      data-bs-theme="dark"
      style={{ backgroundColor: "lightblue" }}
    >
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src="https://img.freepik.com/premium-vector/hello-summer-with-beach-cute-sun_123553-408.jpg"
            alt="logo"
            style={{ width: "150px", height: "auto" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Form onSubmit={handleSubmit} className="mx-auto">
            <FormControl
              type="text"
              placeholder="Cerca città"
              className="mr-sm-2"
              value={city}
              onChange={handleInputChange}
              style={{ backgroundColor: "white", width: "300px" }}
            />
            <Button variant="outline-primary" type="submit" className="search">
              Cerca
            </Button>
          </Form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {weatherData && (
            <div>
              <h2>Meteo attuale per {weatherData.name}</h2>
              <p>Temperatura: {weatherData.main.temp} °C</p>
              <p>Condizioni: {weatherData.weather[0].description}</p>
            </div>
          )}
          {forecastData && (
            <div>
              <h2>Previsioni a 5 giorni per {forecastData.city.name}</h2>
              <ul>
                {forecastData.list.map((item) => (
                  // <li key={item.dt}>
                  //   {new Date(item.dt * 1000).toLocaleDateString()}:{" "}
                  //   {item.weather[0].description}, {item.main.temp} °C
                  // </li>
                  <li key={item.dt}>
                    {new Date(item.dt * 1000).toLocaleDateString()}{" "}
                    {new Date(item.dt * 1000).toLocaleTimeString()}:{" "}
                    {item.weather[0].description}, {item.main.temp} °C
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default WeatherApp;
