import React from "react";
import sunny from "../Images/sunny.jpg";
import rainy from "../Images/rain.jpg";
import csky from "../Images/clear sky.jpg";
import drizzle from "../Images/thunderstorm.jpeg";
import snow from "../Images/snow.jpg";
import cloudy from "../Images/cloudy.jpg";

const Card = (props) => {
  const { weather } = props;
  const dt = new Date((weather.dt + weather.timezone) * 1000);
  const sunrise = new Date((weather.sys.sunrise + weather.timezone) * 1000);
  const sunset = new Date((weather.sys.sunset + weather.timezone) * 1000);
  const images = [
    {
      type: "Thunderstorm",
      img: drizzle,
    },
    { type: "Drizzle", img: drizzle },
    {
      type: "Rain",
      img: rainy,
    },
    {
      type: "Snow",
      img: snow,
    },
    {
      type: "Atmosphere",
      img: sunny,
    },
    {
      type: "Clear",
      img: csky,
    },
    {
      type: "Clouds",
      img: cloudy,
    },
  ];
  let type = images.filter((image) => {
    if (weather.weather[0].main === image.type) {
      return image;
    } else {
      return null;
    }
  });
  if (type.length === 0) {
    type = [{ img: sunny }];
  }
  return (
    <div>
      <div className="header">
        <p className="display-6 text-center p-3 p-md-4 text-white">
          Current Weather
        </p>
      </div>
      <div
        className="card text-white col-md-8 offset-md-2"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="row g-0">
          <div className="col-md-5">
            <img src={type[0].img} className="w-100 h-100" alt="..." />
          </div>
          <div className="col-md-7">
            <div className="card-body p-3 p-md-4 mx-3">
              <h5
                className="card-title display-6"
                style={{ fontSize: "2.25rem" }}
              >
                {dt.toUTCString().substring(0, 16)}
              </h5>

              <div className="card-text my-3">
                <p className="my-2">
                  Min. Temperature :{" "}
                  <span>{weather.main.temp_min}&deg; Celsius</span>
                </p>
                <p className="my-2">
                  Max. Temperature :{" "}
                  <span>{weather.main.temp_max}&deg; Celsius</span>
                </p>
                <p className="my-2">
                  Humidity : <span>{weather.main.humidity}</span>
                </p>
                <p className="my-2">
                  Pressure : <span>{weather.main.pressure}&#13169;</span>
                </p>
                <p className="my-2">
                  Sunrise :{" "}
                  <span>{sunrise.toUTCString().substring(0, 25)} A.M</span>
                </p>
                <p className="my-2">
                  Sunset :{" "}
                  <span>{sunset.toUTCString().substring(0, 25)} P.M</span>
                </p>
                <p className="my-2">
                  <span className="text-white">
                    Weather Type: {weather.weather[0].main}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
