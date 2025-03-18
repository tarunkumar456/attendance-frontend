import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar/navbar';
import './Home.css';
import { FaFingerprint, FaClock, FaChartPie, FaShieldAlt, FaRegSmile, FaRegCheckCircle } from 'react-icons/fa';

function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-animation');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
          element.classList.add('animate');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Revolutionize Attendance with
              <span className="gradient-text"> Biometric Tech</span>
            </h1>
            <p className="hero-subtitle">
              Secure, accurate, and effortless attendance tracking powered by fingerprint authentication
            </p>
            <div className="btn-group">
              <Link to="/login" className="btn pulse">
                Get Started
              </Link>
            </div>
          </div>
          <div className="fingerprint-container">
            <div className="fingerprint-animation">
              <FaFingerprint className="fingerprint-icon" />
              <div className="scanning-line"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2 className="section-title scroll-animation">Why Choose Us?</h2>
          <div className="features-grid">
            {[
              { icon: <FaFingerprint />, title: 'Biometric Auth', text: 'Military-grade security with fingerprint recognition' },
              { icon: <FaClock />, title: 'Real-time Tracking', text: 'Instant updates and live attendance monitoring' },
              { icon: <FaChartPie />, title: 'Smart Analytics', text: 'Detailed reports and data visualization tools' },
              { icon: <FaShieldAlt />, title: 'Data Protection', text: 'GDPR-compliant data security measures' },
            ].map((feature, index) => (
              <div className="feature-card scroll-animation" key={index}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats scroll-animation">
          <div className="stat-item">
            <FaRegSmile className="stat-icon" />
            <h3>10,000+</h3>
            <p>Happy Users</p>
          </div>
          <div className="stat-item">
            <FaFingerprint className="stat-icon" />
            <h3>99.9%</h3>
            <p>Accuracy Rate</p>
          </div>
          <div className="stat-item">
            <FaRegCheckCircle className="stat-icon" />
            <h3>24/7</h3>
            <p>Support Available</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section scroll-animation">
          <div className="cta-content">
            <h2>Ready to Transform Your Attendance System?</h2>
            <p>Join thousands of organizations using BioAttend</p>
            <div className="btn-group">
              <Link to="/register" className="btn btn-large">
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>BioAttend</h4>
              <p>Making attendance management simple, secure, and efficient</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 BioAttend. All rights reserved</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;