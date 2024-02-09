const FetchWeatherData = async (city) => {
  try {
    const API_KEY = "bb4ef60fc701792933adb0a17926d112";
    const API_BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error("Errore durante la ricerca della città");
    }
    const data = await response.json();
    console.log("Dati ricevuti dalla chiamata API:", data);

    return data;
  } catch (error) {
    console.error("Errore nella chiamata API:", error);
    throw error;
  }
};
export default FetchWeatherData;
