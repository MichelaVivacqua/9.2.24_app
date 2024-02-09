import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherApp from "./components/WeatherApp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MeteConsigliate from "./components/MeteConsigliate";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <BrowserRouter>
      <>
        <main>
          <Routes>
            <Route element={<WeatherApp />} path="/" />
            <Route element={<MeteConsigliate />} path="/MeteConsigliate" />
            <Route
              element={
                <h1 className="text-center">ERRORE 404 - PAGINA NON TROVATA</h1>
              }
              path="*"
            />
          </Routes>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
