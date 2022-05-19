import React from "react";

const Form = ({ handleSubmit, changeLat, changeLon, addTable }) => {
  return (
    <div className="container">
      <form className="main-form" onSubmit={handleSubmit}>
        Latitude:
        <input
          type="text"
          className="input form-control"
          placeholder="Lat..."
          onChange={changeLat}
        ></input>
        Longitude:
        <input
          type="text"
          className="input form-control"
          placeholder="Lon..."
          onChange={changeLon}
        ></input>
      </form>
      <button
        type="button"
        className="btn btn-success add-table"
        onClick={addTable}
      >
        Add Table
      </button>
    </div>
  );
};

export default Form;
