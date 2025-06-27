import { useState, useEffect } from "react";
import "./index.css";

const KEY = "d1d542ef821e44edb2383113252406";

function App() {
  const [city, setCity] = useState("Paris");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}`
        );
        // if (!res.ok) {
        //   throw new Error(`${res.status} ${res.statusText}`);
        // }
        const data = await res.json();

        if (data.error) {
          setError(data.error.message);
        }

        setWeatherData(data);
        setError(null);
      } catch {
        setError("Failed to fetch weather data");
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [city]);
  console.log(weatherData);

  function renderError() {
    return <p>{error}</p>;
  }

  function renderLoading() {
    return <p>Loading...</p>;
  }

  function renderWeather() {
    return (
      <div className="weather-card">
        <h2>{`${weatherData?.location?.name}, ${weatherData?.location?.country}`}</h2>
        <img
          src={`https:${weatherData?.current?.condition?.icon}`}
          alt="icon"
          className="weather-icon"
        />
        <p className="temperature">
          {Math.round(weatherData?.current?.temp_c)}°C
        </p>
        <p className="condition">{weatherData?.current?.condition?.text}</p>
        <div className="weather-details">
          <p>Humidity: {weatherData?.current?.humidity}%</p>
          <p>Wind: {weatherData?.current?.wind_kph} km/h</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="widget-container">
        <div className="weather-card-container">
          <h1 className="app-title">Weather Widget</h1>
          <div className="search-container">
            <input
              type="text"
              value={city}
              placeholder="Enter city name"
              className="search-input"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        {error && renderError()}
        {loading && renderLoading()}
        {!loading && !error && weatherData && renderWeather()}
      </div>
    </div>
  );
}

export default App;
