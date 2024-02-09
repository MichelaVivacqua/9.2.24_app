import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, FormControl, Button } from "react-bootstrap";
import FetchWeatherData from "./FetchWeatherData";
import FetchForecastData from "./FetchForecastData";
import { Link } from "react-router-dom";

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
      setError(null);

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
          className="d-flex flex-column justify-content-center align-items-center m-3"
        >
          <h1>SempreAlSole.com</h1>
          <h3>Se la giornata ti vuoi godere, il meteo devi prevedere!</h3>
          <Link to="./MeteConsigliate">
            <i class="bi bi-star-fill"></i>METE CONSIGLIATE
          </Link>
          <img
            src="https://img.freepik.com/premium-vector/hello-summer-with-beach-cute-sun_123553-408.jpg"
            alt="logo"
            className="text-center m-3"
            style={{ width: "150px", height: "auto" }}
          />
        </Col>
        <Col
          xs={12}
          className="d-flex flex-column justify-content-center align-items-center m-3"
        >
          <h5>Dove vuoi andare? </h5>
          <Form onSubmit={handleSubmit} className="m-5 d-flex">
            <FormControl
              type="text"
              placeholder="Cerca città"
              className="mr-sm-2"
              value={city}
              onChange={handleInputChange}
              style={{ backgroundColor: "white", width: "300px" }}
            />
            <Button variant="outline-primary" type="submit">
              Cerca
            </Button>
          </Form>
          <h6 className="text-center">
            Ti mostreremo le condizioni metereologiche fino ai prossimi 5
            giorni,
            <br /> per organizzare il tuo aperitivo in spiaggia nel momento
            adatto e senza brutte sorprese!
          </h6>
        </Col>
        <Col
          xs={12}
          className="d-flex flex-column justify-content-center align-items-center m-3"
        >
          {error && <p style={{ color: "red" }}>{error}</p>}
          {weatherData && (
            <div>
              <h2>Il meteo di oggi a {weatherData.name}</h2>
              <p>Temperatura: {weatherData.main.temp} °C</p>
              <p>Condizioni: {weatherData.weather[0].description}</p>
            </div>
          )}
          {forecastData && (
            <div>
              <h2>I prossimi 5 giorni a {forecastData.city.name}</h2>
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
