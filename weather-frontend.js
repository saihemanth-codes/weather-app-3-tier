// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/weather/${city}`);
      setWeather(response.data);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-8">Weather App</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="peer w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                      placeholder="Enter city name"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Get Weather'}
                  </button>
                </form>
                
                {error && (
                  <div className="text-red-500 text-center mt-4">{error}</div>
                )}
                
                {weather && (
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h2 className="text-xl font-semibold">{weather.city}</h2>
                    <div className="mt-4">
                      <p>Temperature: {weather.temperature}°C</p>
                      <p>Condition: {weather.condition}</p>
                      <p>Humidity: {weather.humidity}%</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
