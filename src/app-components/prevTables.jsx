import React from "react";

const PrevTables = ({ tables }) => {
  return (
    <>
      {tables.map((table) => {
        return (
          <table className="table table-striped table-dark" key={table.id}>
            <thead>
              <tr className="bg-primary">
                <th className="prev-title" colSpan="9" scope="col">
                  Your Previous Added Tables
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>City</th>
                <th>Temp</th>
                <th>Humidity</th>
                <th>Feels Like</th>
                <th>Pressure</th>
                <th>Lat</th>
                <th>Lon</th>
                <th>Max-T</th>
                <th>Min-T</th>
              </tr>
              <tr>
                <th> {table.title}</th>
                <th> {table.temp}°C</th>
                <th> {table.humidity}%</th>
                <th> {table.feelsLike}°C</th>
                <th> {table.pressure}mb</th>
                <th> {table.lat}°N</th>
                <th> {table.lon}°W</th>
                <th> {table.max_temp}°C</th>
                <th> {table.min_temp}°C</th>
              </tr>
            </tbody>
          </table>
        );
      })}
    </>
  );
};

export default PrevTables;
