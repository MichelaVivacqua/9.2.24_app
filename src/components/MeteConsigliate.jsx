import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import WeatherForCity from "./WeatherForCity";

const MeteConsigliate = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Link to="/">
            <h4>SempreAlSole.com</h4>
          </Link>
          <Link to="/">
            <img
              src="https://img.freepik.com/premium-vector/hello-summer-with-beach-cute-sun_123553-408.jpg"
              alt="logo"
              className="text-center"
              style={{ width: "100px", height: "auto" }}
            />
          </Link>
        </Col>
        <Col xs={12}>
          <h5 className="text-center">
            L'anno scorso, in questa giornata, le mete che hanno registrato le
            temperature più alte sono state: <br />
            Catania, Lipari e Roma
          </h5>
          <h6 className="text-center m-4">
            Ti mostriamo qui il meteo attuale delle nostre mete consigliate:
          </h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <WeatherForCity city="Catania" />
        </Col>
        <Col>
          <WeatherForCity city="Lipari" />
        </Col>
        <Col>
          <WeatherForCity city="Roma" />
        </Col>
      </Row>
    </Container>
  );
};
export default MeteConsigliate;
