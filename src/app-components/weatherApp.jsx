import React, { useState, useEffect } from "react";
import "./weatherApp.css";
import Form from "./form";
import Table from "./table";
import PrevTables from "./prevTables";
import { v1 as uuidv1 } from "uuid";

const WeatherApp = () => {
  const apiKey = "2b1476a8b658708afe73c752e001b841";
  const BaseUrl = "https://api.openweathermap.org/data/2.5/weather";
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [lat, setLat] = useState(() => {
    const localLat = localStorage.getItem("lat");
    return localLat ? JSON.parse(localLat) : "";
  });
  const [lon, setLon] = useState(() => {
    const localLon = localStorage.getItem("lon");
    return localLon ? JSON.parse(localLon) : "";
  });

  const [tables, setTables] = useState([]);

  const fetchWeather = async () => {
    const response = await fetch(
      `${BaseUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    setData(await response.json());
  };

  useEffect(() => {
    localStorage.setItem("lat", JSON.stringify(lat));
    localStorage.setItem("lon", JSON.stringify(lon));
    fetchWeather();
    const interval = setInterval(() => {
      fetchWeather();
    }, 30000);
    return () => clearInterval(interval);
  }, [lat, lon]);

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });

  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // const zone = data.timezone;
  // const rise = data.sys.sunrise;

  // const srTime = new Date((rise + zone) * 1000);
  // console.log(srTime);

  // const twoDigits = (val) => {
  //   return ("0" + val).slice(-2);
  // };

  // const hours = twoDigits(srTime.getUTCHours());
  // const minutes = twoDigits(srTime.getUTCMinutes());
  // const seconds = twoDigits(srTime.getUTCSeconds());

  // console.log(`${hours} ${minutes} ${seconds}`);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLat(input);
    setLon(input);
  };

  const changeLat = (e) => {
    setLat(e.target.value);
  };
  const changeLon = (e) => {
    setLon(e.target.value);
  };

  const addTable = () => {
    setTables([
      ...tables,
      {
        id: uuidv1(),
        title: data.name,
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        feelsLike: Math.round(data.main.feels_like),
        pressure: data.main.pressure,
        lat: data.coord.lat,
        lon: data.coord.lon,
        max_temp: Math.round(data.main.temp_max),
        min_temp: Math.round(data.main.temp_min),
      },
    ]);
  };

  return (
    <div className="container">
      <Form
        handleSubmit={handleSubmit}
        changeLat={changeLat}
        changeLon={changeLon}
        addTable={addTable}
      />

      {typeof data.main === "undefined" ? (
        <></>
      ) : (
        <>
          <Table
            fetchWeather={fetchWeather}
            time={time}
            date={date}
            month={month}
            year={year}
            data={data}
          />
          <PrevTables tables={tables} data={data} />
        </>
      )}
      {data.cod === "400" ? <p className="welcoming">Wrong geocode.</p> : <></>}
    </div>
  );
};

export default WeatherApp;
