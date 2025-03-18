import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const SERVER_URL = "http://localhost:4000/api/v1";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${SERVER_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            alert("Logged in successfully");
            navigate(data.user.role === "teacher" ? "/teacher-dashboard" : "/student-dashboard");
        } catch (error) {
            alert(error.message || "Something went wrong");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
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
                    <button type="submit">Login</button>
                </form>
                <p onClick={() => navigate("/register")} className="toggle-text">
                    Don't have an account? Register
                </p>
            </div>
        </div>
    );
};

export default Login;
