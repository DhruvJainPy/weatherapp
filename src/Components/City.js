import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";

const City = () => {
  const key = "639e75737322b216658c190404fea916";
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [success, setSuccess] = useState(true);
  const getCoordinates = async () => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`;
    const data = await axios.get(`${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const info = await data.data[0];

    if (info !== undefined) {
      const lat = info.lat;
      const lon = info.lon;
      return { lat, lon };
    } else {
      setSuccess(false);
      return null;
    }
  };
  const searchCity = async () => {
    const coord = await getCoordinates();
    if (coord !== null) {
      const { lat, lon } = coord;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&cnt=20&units=metric`;
      const data = await axios.get(`${url}`, {
        headers: { "Content-Type": "application/json" },
      });
      setWeather(data.data);
      setSuccess(true);
    } else {
      setSuccess(false);
      setWeather(null);
    }
  };
  return (
    <div className="row px-3">
      <div className="col-10">
        <div className="mb-3">
          <input
            type="text"
            className="form-control input text-dark shadow-lg"
            id="city"
            value={city}
            onChange={(evt) => {
              return setCity(evt.target.value);
            }}
            placeholder="Enter City..."
          />
        </div>
      </div>
      <div className="col-2">
        <div>
          <button
            className="btn btn-success"
            disabled={city === ""}
            onClick={searchCity}
          >
            Search Location
          </button>
        </div>
      </div>
      <div className="row">
        {weather !== null ? <Card key={weather.id} weather={weather} /> : ""}
        {success === false ? (
          <p className="display-6 p-4 text-white text-center font-monospace">
            City Not Found!
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default City;
