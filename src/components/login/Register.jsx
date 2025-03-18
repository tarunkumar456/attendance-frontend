import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { startRegistration } from "@simplewebauthn/browser";
import "./Register.css";

const SERVER_URL = "http://localhost:4000/api/v1";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");

    // 📌 Traditional Registration
    const handleTraditionalRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${SERVER_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role }),
                credentials: "include", 
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            alert("Registered successfully");
            navigate("/");
        } catch (error) {
            alert(error.message || "Something went wrong");
        }
    };

    // 📌 WebAuthn Registration (Passkey)
    const handleWebAuthnRegister = async () => {
        try {
            if (!email) {
                alert("Please enter an email before registering.");
                return;
            }
    
            // console.log("Initiating WebAuthn Registration for:", email);
    
            // Step 1: Get WebAuthn challenge from server
            const initResponse = await fetch(`${SERVER_URL}/init-register?email=${email}`, {
                method: "GET",
                credentials: "include", // ✅ Ensure cookies are included
                
            });
    
            if (!initResponse.ok) {
                const errorData = await initResponse.json();
                alert(errorData.error || "Failed to get registration challenge");
                return;
            }
    
            const options = await initResponse.json();
            // console.log("Received Registration Options:", options);
    
            // Step 2: Start WebAuthn registration
            const registrationJSON = await startRegistration(options);
            // console.log("Generated Registration Payload:", registrationJSON);
    
            // Step 3: Send registration data to verify API
            const verifyResponse = await fetch(`${SERVER_URL}/verify-register?email=${email}&password=${password}&name=${name}&role=${role}`, {
                method: "POST",
                credentials: "include", 
                headers: { "Content-Type": "application/json" },
                // credentials: "include", // ✅ Ensure cookies are included
                body: JSON.stringify(registrationJSON),
            });
    
            const verifyData = await verifyResponse.json();
    
            if (!verifyResponse.ok) {
                alert(verifyData.error || "Failed to verify registration.");
                return;
            }
            // console.log("data",verifyData)
            if (verifyData.success) {
                alert(`Successfully registered ${email}`);
                navigate("/");
            } else {
                alert(`Failed to register`);
            }
        } catch (error) {
            console.error("WebAuthn Registration Error:", error);
            alert("Something went wrong during registration.");
        }
    };
    
    

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Register</h2>
                <form onSubmit={handleTraditionalRegister}>
                    <input
                        type="text"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                    {/* <button type="submit">Register</button> */}
                </form>
                <button className="webauthn-btn" onClick={handleWebAuthnRegister}>
                    Register
                </button>
                <p onClick={() => navigate("/login")} className="toggle-text">
                    Already have an account? Login
                </p>
            </div>
        </div>
    );
};

export default Register;
