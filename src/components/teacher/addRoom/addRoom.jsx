import React, { useState } from "react";
import axios from "axios";
import "./addRoom.css";

const AddRoom = () => {
    const [roomNo, setRoomNo] = useState("");
    const [coordinates, setCoordinates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
  
    const handleAddCoordinate = () => {
      if (coordinates.length >= 4) {
        setMessage({ type: "error", text: "You can only add 4 coordinates." });
        return;
      }
  
      if (!navigator.geolocation) {
        setMessage({ type: "error", text: "Geolocation is not supported by your browser." });
        return;
      }
  
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = Number(position.coords.latitude.toFixed(12)); // Convert to number
          const long = Number(position.coords.longitude.toFixed(12)); // Convert to number
  
          setCoordinates([...coordinates, { lat, long }]);
          setLoading(false);
          setMessage({ type: "success", text: "Coordinate captured successfully!" });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
          setMessage({ type: "error", text: "Failed to retrieve location." });
        }
      );
    };
  
    const handleSubmit = async () => {
      if (!roomNo || coordinates.length !== 4) {
        setMessage({ type: "error", text: "Please enter a room number and ensure 4 coordinates are added." });
        return;
      }
  
      try {
        await axios.post("http://localhost:4000/api/v1/admin/addRoom", { roomNo, coordinates });
        setMessage({ type: "success", text: "Room data added successfully!" });
        setRoomNo("");
        setCoordinates([]);
      } catch (error) {
        console.error("Error adding room data:", error);
        setMessage({ type: "error", text: "Failed to add room data." });
      }
    };

  return (
    <div className="app-container">
      <div className="form-container">
        <h2 className="form-title">Room Data Entry</h2>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <input
          type="text"
          placeholder="Enter Room Number"
          value={roomNo}
          onChange={(e) => setRoomNo(e.target.value)}
          className="input-field"
        />

        <button
          onClick={handleAddCoordinate}
          disabled={coordinates.length >= 4 || loading}
          className={`btn-primary ${coordinates.length >= 4 || loading ? 'disabled' : ''}`}
        >
          {loading ? "Fetching Location..." : "Capture Current Location"}
        </button>

        <h3 className="coordinates-title">Coordinates ({coordinates.length}/4)</h3>
        <ul className="coordinates-list">
          {coordinates.map((c, index) => (
            <li key={index} className="coordinate-item">
              <span className="marker">📍</span>
              Lat: {c.lat}, Long: {c.long}
            </li>
          ))}
        </ul>

        <button
          onClick={handleSubmit}
          disabled={coordinates.length !== 4}
          className={`btn-submit ${coordinates.length === 4 ? 'active' : 'disabled'}`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddRoom;