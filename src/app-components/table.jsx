import React from "react";

const Table = ({ data, fetchWeather, date, month, year, time }) => {
  const zone = data.dt;
  const rise = data.timezone;

  const srTime = new Date((rise + zone) * 1000);
  console.log(srTime);

  const twoDigits = (val) => {
    return ("0" + val).slice(-2);
  };

  const dayOfMonth = twoDigits(srTime.getUTCDate());
  const hours = twoDigits(srTime.getUTCHours());
  const minutes = twoDigits(srTime.getUTCMinutes());
  const seconds = twoDigits(srTime.getUTCSeconds());

  console.log(`${hours} ${minutes}`);

  return (
    <>
      <table className="table table-striped table-dark">
        <thead>
          <tr className="bg-primary">
            <th className="header-title" colSpan="2" scope="col">
              <i className="fas fa-city"> </i>
              {data.sys.country} , {data.name}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="title">Date</td>
            <td>
              {dayOfMonth}, {month}, {year}
              <br />
              {hours}:{minutes}
            </td>
          </tr>
          <tr>
            <td className="title">Temprature</td>
            <td>{Math.round(data.main.temp)}°C</td>
          </tr>
          <tr>
            <td className="title">Weather</td>
            <td>
              {data.weather[0].main}
              <img
                src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt={data.weather[0].description}
              />
            </td>
          </tr>
          <tr>
            <td className="title">Humidity</td>
            <td>{data.main.humidity}%</td>
          </tr>
          <tr>
            <td className="title">Feels Like</td>
            <td>{Math.round(data.main.feels_like)}°C</td>
          </tr>
          <tr>
            <td className="title">Pressure</td>
            <td>{data.main.pressure}mb</td>
          </tr>
          <tr>
            <td className="title">Latitude</td>
            <td>{data.coord.lat}°N</td>
          </tr>
          <tr>
            <td className="title">Longitude</td>
            <td>{data.coord.lon}°W</td>
          </tr>
          <tr>
            <td className="title">Minimum Temprature</td>
            <td>{Math.round(data.main.temp_min)}°C</td>
          </tr>
          <tr>
            <td className="title">Maximum Temprature</td>
            <td>{Math.round(data.main.temp_max)}°C</td>
          </tr>
        </tbody>
      </table>
      <h3>Last update: {time}</h3>
    </>
  );
};

export default Table;
