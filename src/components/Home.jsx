// import React, { useState, useEffect } from 'react'
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'
// import Loader from './Loader/loding';

// function Home() {
//   const Navigate = useNavigate();
//   // const [loading, setloading] = useState(true);
//   // useEffect(() => {
//   //   const check = async () => {
//   //     try {
//   //       await axios.get(
//   //         `http://localhost:4000/api/v1/islogin`
//   //       );
//   //       setloading(false);

//   //     } catch (error) {
//   //       alert(error.response.data.message)
//   //       setloading(false);
//   //       Navigate('/login')
//   //     }
//   //   }
//   //   check();
//   // }, [])
//   return (
//     <>
    
//     <div>hello</div>
//     </>
//   )
// }
import Navbar from './Navbar/navbar';

import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import fingerprintIcon from '../assets/fingerprint.png';
import { Link } from 'react-router-dom';
// import Navbar from './Navbar';
import './Home.css';

function Home() {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="hero-section">
          <h1>Welcome to Smart Attendance</h1>
          <p>Secure attendance with fingerprint authentication</p>
          <div className="btn-group">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signup" className="btn signup">Sign Up</Link>
          </div>
        </div>

        <section className="features">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <img src="https://via.placeholder.com/100" alt="Biometric" />
              <h3>Biometric Security</h3>
              <p>Use fingerprint for secure and fast authentication.</p>
            </div>
            <div className="feature-card">
              <img src="https://via.placeholder.com/100" alt="Real-time" />
              <h3>Real-time Attendance</h3>
              <p>Instantly mark attendance with biometric verification.</p>
            </div>
            <div className="feature-card">
              <img src="https://via.placeholder.com/100" alt="Reports" />
              <h3>Detailed Reports</h3>
              <p>View detailed attendance reports and trends.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
