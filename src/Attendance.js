import React, { useState } from "react";
import axios from "axios";

const Application = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Room Data Entry</h2>

        {message.text && (
          <div className={`p-3 mb-4 text-center rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message.text}
          </div>
        )}

        <input
          type="text"
          placeholder="Enter Room Number"
          value={roomNo}
          onChange={(e) => setRoomNo(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleAddCoordinate}
          disabled={coordinates.length >= 4 || loading}
          className={`w-full py-2 text-white font-semibold rounded-md ${coordinates.length >= 4 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} transition-all`}
        >
          {loading ? "Fetching Location..." : "Capture Current Location"}
        </button>

        <h3 className="text-lg font-semibold mt-4 mb-2">Coordinates ({coordinates.length}/4)</h3>
        <ul className="bg-gray-100 p-3 rounded-md mb-4 text-sm text-gray-600">
          {coordinates.map((c, index) => (
            <li key={index} className="mb-1">{`📍 Lat: ${c.lat}, Long: ${c.long}`}</li>
          ))}
        </ul>

        <button
          onClick={handleSubmit}
          disabled={coordinates.length !== 4}
          className={`w-full py-2 font-semibold rounded-md text-white ${coordinates.length === 4 ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"} transition-all`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Application;
