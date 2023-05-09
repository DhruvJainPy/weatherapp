import React from "react";
import img from "../Images/logo192.png";

const Header = () => {
  return (
    <div>
      <p className="display-5 text-white text-center d-flex align-items-center justify-content-center">
        <img
          src={img}
          className="img-fluid mx-3"
          height={60}
          width={60}
          alt=""
        />{" "}
        <span>WeatherHub</span>
      </p>
    </div>
  );
};

export default Header;
