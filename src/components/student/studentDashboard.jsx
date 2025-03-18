import React from "react";
import { useNavigate } from "react-router-dom";
import "./studentDashboard.css";

const StudentDashboard = () => {
    const navigate = useNavigate();
    const studentName = "John Doe"; // Static data for demo

    // Static data for demonstration
    const upcomingClasses = [
        { id: 1, course: "Mathematics", time: "09:00 AM", room: "B-204" },
        { id: 2, course: "Physics", time: "11:00 AM", room: "Lab-3" },
        { id: 3, course: "Computer Science", time: "02:00 PM", room: "C-101" },
    ];

    const recentAttendance = [
        { date: "2024-03-01", status: "Present", course: "Mathematics" },
        { date: "2024-02-28", status: "Absent", course: "Physics" },
        { date: "2024-02-25", status: "Present", course: "Computer Science" },
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1>Student Portal</h1>
                    <p>Welcome back, {studentName}</p>
                </div>
                <button 
                    className="logout-btn"
                    onClick={() => navigate("/")}
                >
                    Logout
                </button>
            </header>

            <main className="dashboard-main">
                <div className="quick-actions">
                    <div className="attendance-card">
                        <h2>Attendance</h2>
                        <button 
                            className="mark-attendance-btn"
                            onClick={() => navigate("/markAttendance")}
                        >
                            📅 Mark Attendance
                        </button>
                    </div>
                </div>

                <div className="dashboard-content">
                    <section className="upcoming-classes">
                        <h2>Upcoming Classes</h2>
                        <div className="classes-list">
                            {upcomingClasses.map((cls) => (
                                <div key={cls.id} className="class-card">
                                    <h3>{cls.course}</h3>
                                    <p>⏰ {cls.time}</p>
                                    <p>📍 {cls.room}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="attendance-overview">
                        <h2>Recent Attendance</h2>
                        <div className="attendance-list">
                            {recentAttendance.map((record, index) => (
                                <div key={index} className="attendance-record">
                                    <span className="date">{record.date}</span>
                                    <span className={`status ${record.status.toLowerCase()}`}>
                                        {record.status}
                                    </span>
                                    <span className="course">{record.course}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;