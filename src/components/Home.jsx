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
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar/navbar';
import fingerprintIcon from '../assets/fingerprint.png';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="hero">
          <h1>Welcome to Smart Attendance</h1>
          <p>Secure your attendance with fingerprint authentication</p>
          <div className="buttons">
            <button className="btn login" onClick={() => navigate('/login')}>Login</button>
            <button className="btn signup" onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        </div>
        <div className="features">
          <h2>Key Features</h2>
          <div className="feature-list">
            <div className="feature">
              <img src={fingerprintIcon} alt="Fingerprint" />
              <h3>Biometric Security</h3>
              <p>Use your fingerprint for secure and fast authentication.</p>
            </div>
            <div className="feature">
              <img src={fingerprintIcon} alt="Live Tracking" />
              <h3>Real-time Attendance</h3>
              <p>Instantly mark attendance with biometric verification.</p>
            </div>
            <div className="feature">
              <img src={fingerprintIcon} alt="Analytics" />
              <h3>Analytics & Reports</h3>
              <p>View detailed attendance reports and trends.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;


// export default Home
