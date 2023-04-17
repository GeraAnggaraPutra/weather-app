import axios from 'axios';
import './App.css';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

  // const api = `https://api.openweathermap.org/data/2.5/weather?q=jakarta&appid=3a934303f1cf2b6ae5a8100bbce9cb26`;
function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=3a934303f1cf2b6ae5a8100bbce9cb26`;

  console.log(url)

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <Container className="justify-content-center mt-4 itmes-align-center text-center">
      <div className="app">
        <div className="row mb-3">
          <input
            className='text-center'
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter Location..."
            type="text"
          />
        </div>
        {Object.keys(data).length !== 0  ? (
          <div className="body mt-3">
            <div className="top">
              <div className="location">
                {data ? (
                  <h1 className='fw-bold'>
                    {data.name} || {data.sys.country} 
                  </h1>
                ) : null}
              </div>
              <div className="temp">
                {data.main ? <h1>{(((data.main.temp - 32) * 5) / 9).toFixed()}°C</h1> : null}
              </div>
              <div className="description">
                {data.weather ? <p>{data.weather[0].main}</p> : null}
              </div>
            </div>

            {data.name !== undefined && (
              <div className="row mt-5">
                <div className="col">
                  {data.main ? (
                    <p className="fw-bold h4">
                      {data.main.feels_like.toFixed()}°F
                    </p>
                  ) : null}
                  <p>Feels Like</p>
                </div>
                <div className="col">
                  {data.main ? (
                    <p className="fw-bold h4">{data.main.humidity}%</p>
                  ) : null}
                  <p>Humidity</p>
                </div>
                <div className="col">
                  {data.wind ? (
                    <p className="fw-bold h4">{data.wind.speed.toFixed()} MPH</p>
                  ) : null}
                  <p>Wind Speed</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className='fw-bolder'>Insert Valid City</p>
        )}
      </div>
    </Container>
  );
}

export default App;