import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

const City = () => {
  const key = "639e75737322b216658c190404fea916";
  const [city, setCity] = useState("");
  const [place, setPlaces] = useState([]);
  const [weather, setWeather] = useState(null);
  const [success, setSuccess] = useState(true);
  const [search, setSearch] = useState(true);
  // const getCoordinates = async () => {
  //   await setPlaces([]);

  //   const info = await data.data[0];
  //   setPlaces(data.data);
  //   if (info === undefined) {
  //     setSuccess(false);
  //     setPlaces([]);
  //     return null;
  //   }
  // };
  useEffect(() => {
    setPlaces([]);
    const getLocation = async () => {
      if (city !== "") {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`;
        const data = await axios.get(`${url}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        await setPlaces(data.data);
      }
    };
    if (search) {
      getLocation();
    }
    //eslint-disable-next-line
  }, [city]);

  const searchCity = async () => {
    if (city !== "") {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`;
      await axios
        .get(`${url}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(async (data) => {
          const { lat, lon } = data.data.length > 0 ? data.data[0] : "";
          if (data.data.length !== 0) {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&cnt=20&units=metric`;
            const data = await axios.get(`${url}`, {
              headers: { "Content-Type": "application/json" },
            });
            setWeather(data.data);
            setSuccess(true);
          } else {
            setWeather(null);
            setSuccess(false);
          }
        });
    }
  };
  return (
    <div className="row px-3">
      <div className="col-10">
        <div className="">
          <input
            type="text"
            className={`form-control text-dark shadow-lg ${
              place.length > 0 ? "rounded-0" : "rounded-3"
            } rounded-top`}
            id="city"
            value={city}
            // onKeyDown={(evt) => {
            //   var res = document.getElementsByName("place");
            //   if (evt.code === "ArrowDown") {
            //     if (res.length !== 0) {
            //       res[result].classList.add("active");
            //       for (let index = 0; index < res.length; index++) {
            //         if (index !== result) {
            //           res[index].classList.remove("active");
            //         }
            //         continue;
            //       }
            //     }
            //     setResults((result) => {
            //       if (result === res.length - 1) {
            //         return setResults(0);
            //       }
            //       return result + 1;
            //     });
            //   }
            //   //  else if (evt.code === "ArrowUp") {
            //   //   let res = document.getElementsByName("place");
            //   //   setResults((result) => {
            //   //     if (result === 0) {
            //   //       return setResults(0);
            //   //     }
            //   //     return result - 1;
            //   //   });
            //   //   res[result].classList.add("active");
            //   //   for (let index = 0; index < res.length; index++) {
            //   //     if (index !== result) {
            //   //       res[index].classList.remove("active");
            //   //     }
            //   //     continue;
            //   //   }
            //   // }
            // }}
            onChange={(evt) => {
              setSearch(true);
              return setCity(evt.target.value);
            }}
            placeholder="Enter City..."
          />
        </div>
        {place.length > 0 &&
          place.map((p) => {
            return (
              <div
                className="col-12 input p-2 border-bottom border-1 fw-bold"
                key={p.lat}
                name="place"
                onClick={() => {
                  setCity(p.name + "," + p.state + "," + p.country);
                  setSearch(false);
                }}
              >
                {p.name + "," + p.state + "," + p.country}
              </div>
            );
          })}
      </div>
      <div className="col-2">
        <button
          className="btn btn-primary"
          disabled={city === ""}
          onClick={searchCity}
        >
          Search
        </button>
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
