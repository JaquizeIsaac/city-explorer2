import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Weather from './components/weather.jsx'; // Adjusted path to Weather.jsx

const API_KEY = 'pk.ea8b6f69d996b31315fb464524922457'; // Your provided API key
const BACKEND_API = 'http://localhost:5173'; // Your localhost URL

function App() {
  const [location, setLocation] = useState({ display_name: 'City' });
  const [searchQuery, setSearchQuery] = useState('');
  const [forecast, setForecast] = useState({});
  const [weatherRender, setWeatherRender] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      if (location.lat && location.lon && !weatherRender) {
        try {
          const response = await axios.get(`${BACKEND_API}/weather?lat=${location.lat}&lon=${location.lon}`, {
            headers: {
              Authorization: `Bearer ${API_KEY}`
            }
          });
          setForecast(response.data);
          setWeatherRender(true);
        } catch (error) {
          console.log('Error fetching weather:', error);
        }
      }
    }

    fetchWeather();
  }, [location, weatherRender]);

  async function fetchLocation() {
    const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;
    try {
      const response = await axios.get(API);
      const locationObj = response.data[0];
      setLocation(locationObj);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  }

  function updateQuery(event) {
    setSearchQuery(event.target.value);
  }

  function getTitleMessage() {
    return location.display_name ? `${location.display_name} Information` : 'City Information';
  }

  return (
    <>
      <div className='input'>
        <input onChange={updateQuery} />
        <button onClick={fetchLocation}>Explore!</button>
      </div>
      <h1>{getTitleMessage()}</h1>
      <h2>{location.lat} latitude, {location.lon} longitude</h2>
      <img src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=12&size=900x400&format=jpg&maptype=light/`} alt="Map" />
      {weatherRender && <Weather src={forecast} />}
    </>
  );
}

export default App;
