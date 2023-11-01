import React, { useState } from "react";
import "./App.css";
function App() {
  const [data, setData] = useState({
    sensorId: "",
    sensorName: "",
    sensorDes: "",
  });
  const [info, setInfo] = useState();
  const changeEvent = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const sendData = () => {
    fetch("http://localhost:3001/data", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ data }),
    })
      .then((res) => res.text())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  const fetchDetails = () => {
    fetch("http://localhost:3001/details")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setInfo(data.data);
        console.log(info);
      })
      .catch((err) => console.log(err));
  };
  const updateDetails = () => {
    fetch("http://localhost:3001/update", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ data }),
    })
      .then((res) => res.text())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  const deleteDetails = () => {
    fetch("http://localhost:3001/delete", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ data }),
    })
      .then((res) => res.text())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="sensor">
        <p>
          <input
            type="text"
            name="sensorId"
            placeholder="Sensor Id"
            value={data.sensorId}
            onChange={changeEvent}
          />
        </p>
        <p>
          <input
            type="text"
            name="sensorName"
            placeholder="Sensor Name"
            value={data.sensorName}
            onChange={changeEvent}
          />
        </p>
        <textarea
          cols={30}
          rows={10}
          name="sensorDes"
          placeholder="Sensor Description"
          value={data.sensorDes}
          onChange={changeEvent}
        ></textarea>
        <p>
          <button onClick={sendData}>Submit</button>
        </p>
        <p>
          <button onClick={fetchDetails}>Details</button>
        </p>
        <p>
          <button onClick={updateDetails}>Update Details</button>
        </p>
        <p>
          <button onClick={deleteDetails}>Delete Details</button>
        </p>
      </div>

      <div className="flexing">
        {info ? (
          info.map((ele) => {
            return (
              <div className="details" id={ele._id}>
                <p>ID:{ele._id}</p>
                <p>Sensor Name:{ele.sensorName}</p>
                <p>Sensor ID : {ele.sensorId}</p>
                <p>Description : {ele.sensorDes}</p>
              </div>
            );
          })
        ) : (
          <h3>Click Details to get documents from mongoDB</h3>
        )}
      </div>
    </div>
  );
}

export default App;
