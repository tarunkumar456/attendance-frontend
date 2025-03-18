import React, { useState } from "react";
import { startAuthentication } from "@simplewebauthn/browser";
import { FaFingerprint } from "react-icons/fa";
import "./Mark.css";

const SERVER_URL = "http://localhost:4000/api/v1";

const Mark = () => {
    const [uniqueNumber, setUniqueNumber] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,6}$/.test(value)) {
            setUniqueNumber(value);
        }
    };

    const handleMarkAttendance = async () => {
        if (uniqueNumber.length !== 6) {
            setMessage("Please enter a valid 6-digit number.");
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            // 1. Get WebAuthn challenge from server
            const initResponse = await fetch(`${SERVER_URL}/init-auth?email=${email}`, {
                credentials: "include",
            });

            const options = await initResponse.json();
            if (!initResponse.ok) {
                setMessage(options.error || "Failed to get authentication challenge.");
                setIsLoading(false);
                return;
            }

            // 2. Get passkey authentication data
            const authJSON = await startAuthentication(options);

            // 3. Verify passkey with server
            const verifyResponse = await fetch(`${SERVER_URL}/verify-auth`, {
                credentials: "include",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(authJSON),
            });

            const verifyData = await verifyResponse.json();
            setIsLoading(false);

            if (!verifyResponse.ok) {
                setMessage(verifyData.error || "Failed to verify authentication.");
                return;
            }
            console.log(verifyData)
            if (verifyData.success) {
                setMessage(`✅ Attendance marked successfully!`);
            } else {
                setMessage(`❌ Failed to mark attendance.`);
            }
        } catch (error) {
            setMessage("Something went wrong during authentication.");
            console.error("WebAuthn Error:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="global">
            <div className="mark-container">
                <h2>📌 Mark Attendance</h2>
                <div className="input-container">
                    <FaFingerprint className="input-icon" />
                    <input
                        type="text"
                        placeholder="Enter 6-digit unique code"
                        value={uniqueNumber}
                        onChange={handleInputChange}
                        maxLength="6"
                        className="input-box"
                    />
                </div>
                <div className="input-container">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-box"
                    />
                </div>
                <button
                    onClick={handleMarkAttendance}
                    disabled={uniqueNumber.length !== 6 || isLoading}
                    className="mark-btn"
                >
                    {isLoading ? "Authenticating..." : "Mark Attendance"}
                </button>
                {message && <p className={`message ${message.includes("✅") ? "success" : "error"}`}>
                    {message}
                </p>}
            </div>
        </div>
    );
};

export default Mark;
