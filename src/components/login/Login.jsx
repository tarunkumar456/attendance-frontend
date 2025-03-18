import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [name, setName] = useState("");
    const [isRegister, setIsRegister] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isRegister
                ? "http://localhost:4000/api/v1/register"
                : "http://localhost:4000/api/v1/login";
            
            const data = isRegister
                ? { name, email: loginEmail, password: loginPassword }
                : { email: loginEmail, password: loginPassword };
            
            await axios.post(url, data);
            alert(isRegister ? "Registered successfully" : "Logged in successfully");
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>{isRegister ? "Register" : "Login"}</h2>
                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button type="submit">{isRegister ? "Register" : "Login"}</button>
                </form>
                <p onClick={() => setIsRegister(!isRegister)} className="toggle-text">
                    {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
                </p>
            </div>
        </div>
    );
};

export default Login;
