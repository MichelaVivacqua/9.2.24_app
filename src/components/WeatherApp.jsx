import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
    <Container fluid>
      <Row>
        <Col
          xs={12}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <h1>SempreAlSole.com</h1>
          <h3>Se la giornata ti vuoi godere, il meteo devi prevedere!</h3>
          <img
            src="https://img.freepik.com/premium-vector/hello-summer-with-beach-cute-sun_123553-408.jpg"
            alt="logo"
            className="text-center"
            style={{ width: "150px", height: "auto" }}
          />
        </Col>
        <Col
          xs={12}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <h5>Dove vuoi andare? </h5>
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
          <h6 className="text-center">
            Ti mostreremo le condizioni metereologiche di oggi <br />e delle ore
            dei prossimi 5 giorni,
            <br /> per organizzare il tuo aperitivo in spiaggia nel momento
            adatto e senza brutte sorprese!
          </h6>
        </Col>
        <Col
          xs={12}
          className="d-flex flex-column justify-content-center align-items-center"
        >
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
                  <li key={item.dt}>
                    {new Date(item.dt * 1000).toLocaleDateString()}{" "}
                    {new Date(item.dt * 1000).toLocaleTimeString()}:{" "}
                    {item.weather[0].description}, {item.main.temp} °C
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherApp;
