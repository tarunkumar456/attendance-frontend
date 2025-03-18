import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './takeAttendance.css';

const TakeAttendance = () => {
  const [formData, setFormData] = useState({
    batch: '',
    year: '',
    course: '',
    room: ''
  });
  const [generatedCode, setGeneratedCode] = useState('');
  const [expiration, setExpiration] = useState(null);
  const [remainingTime, setRemainingTime] = useState(600);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let interval;
    if (expiration) {
      interval = setInterval(() => {
        const timeLeft = Math.round((expiration - Date.now()) / 1000);
        setRemainingTime(timeLeft > 0 ? timeLeft : 0);
        
        if (timeLeft <= 0) {
          setGeneratedCode('');
          clearInterval(interval);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [expiration]);

  const generateCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString().substring(0, 6);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Generate new code
      const newCode = generateCode();
      const expirationTime = Date.now() + 600000; // 10 minutes
      
      // Send to backend (mock API call)
    //   await axios.post('/api/v1/admin/generate-code', {
    //     ...formData,
    //     code: newCode,
    //     expiresAt: expirationTime
    //   });

      setGeneratedCode(newCode);
      setExpiration(expirationTime);
      setRemainingTime(600);
    } catch (err) {
      setError('Failed to generate attendance code');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="attendance-container">
      <div className="attendance-card">
        <h2>Generate Attendance Code</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Batch</label>
            <input
              type="text"
              value={formData.batch}
              onChange={(e) => setFormData({...formData, batch: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Branch</label>
            <select
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: e.target.value})}
              required
            >
              <option value="">Select Year</option>
              <option value="1">CSE</option>
              <option value="2">EE</option>
              <option value="3">ECE</option>
              <option value="4">CE</option>
            </select>
          </div>

          <div className="form-group">
            <label>Course Code</label>
            <input
              type="text"
              value={formData.course}
              onChange={(e) => setFormData({...formData, course: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Room</label>
            <input
              type="text"
              value={formData.room}
              onChange={(e) => setFormData({...formData, room: e.target.value})}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="generate-btn"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Code'}
          </button>
        </form>

        {generatedCode && (
          <div className="code-display">
            <h3>Attendance Code</h3>
            <div className="code-box">{generatedCode}</div>
            <div className="timer">
              Expires in: {formatTime(remainingTime)}
            </div>
            <p className="instruction">
              Share this code with students. Valid for 10 minutes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeAttendance;