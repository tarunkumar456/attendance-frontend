import React from "react";
import { useNavigate } from "react-router-dom";
import "./teacherDashboard.css";

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const teacherName = "Prof. Jane Smith";
    
    // Static data for demonstration
    const ongoingClasses = [
        { id: 1, course: "Mathematics", time: "09:00 AM", room: "B-204", students: 32 },
        { id: 2, course: "Physics", time: "11:00 AM", room: "Lab-3", students: 28 },
    ];

    const recentAttendance = [
        { date: "2024-03-01", class: "Mathematics", present: 28, absent: 4 },
        { date: "2024-02-28", class: "Physics", present: 25, absent: 3 },
    ];

    return (
        <div className="dashboard-container teacher">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1>Faculty Portal</h1>
                    <p>Welcome, {teacherName}</p>
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
                    <div className="admin-card">
                        <h2>Class Management</h2>
                        <button 
                            className="action-btn primary"
                            onClick={() => navigate("/admin/takeAttendance")}
                        >
                            📋 Take Attendance
                        </button>
                        <button 
                            className="action-btn secondary"
                            onClick={() => navigate("/admin/addRoom")}
                        >
                            ➕ Add New Room
                        </button>
                    </div>
                </div>

                <div className="dashboard-content">
                    <section className="ongoing-classes">
                        <h2>Ongoing Classes</h2>
                        <div className="classes-list">
                            {ongoingClasses.map((cls) => (
                                <div key={cls.id} className="class-card">
                                    <h3>{cls.course}</h3>
                                    <div className="class-info">
                                        <p>⏰ {cls.time}</p>
                                        <p>📍 {cls.room}</p>
                                        <p>👥 {cls.students} students</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="attendance-overview">
                        <h2>Recent Attendance Records</h2>
                        <div className="attendance-list">
                            {recentAttendance.map((record, index) => (
                                <div key={index} className="attendance-record">
                                    <div className="attendance-meta">
                                        <span className="date">{record.date}</span>
                                        <span className="class">{record.class}</span>
                                    </div>
                                    <div className="attendance-stats">
                                        <span className="present">✅ {record.present}</span>
                                        <span className="absent">❌ {record.absent}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default TeacherDashboard;