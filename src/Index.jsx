import React, { useState, useEffect } from "react";
import { hover, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Fetch student data
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get("https://stuserver-6j1t.onrender.com/api/students");
                setStudents(res.data);
                setError("");
            } catch (err) {
                console.error("Error fetching students:", err);
                setError(err.message || "Failed to fetch students");
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    return (
        
        <div style={styles.wrapper}>
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={styles.card}
            >
                {/* Static welcome message instead of typewriter */}
                <h1 style={styles.title}>
                    Welcome To The Skill Boost Computer Institute
                </h1>

                {loading && <p style={{ color: 'orange', textAlign: 'center' }}>Loading students...</p>}
                {error && (
                    <p style={{ color: 'red', textAlign: 'center' }}>
                        Error: {error.includes('Network') ? 'Cannot connect to server. Please check if backend is running and CORS is enabled.' : error}
                    </p>
                )}
                {!loading && !error && students.length === 0 && (
                    <p style={{ color: '#aaa', textAlign: 'center' }}>No students found.</p>
                )}

                <div style={styles.buttonRow}>
                    <motion.button
                        onClick={() => navigate("/add-student")}
                        style={styles.glowButton1}
                        whileHover={{ scale: 1.05 }}
                    >
                        Add Student
                    </motion.button>

                    <motion.button
                        onClick={() => navigate("/students")}
                        style={styles.glowButton2}
                        whileHover={{ scale: 1.05 }}
                    >
                        View Students
                    </motion.button>

                    <motion.button
                        onClick={() => navigate("/attendance")}
                        style={styles.glowButton3}
                        whileHover={{ scale: 1.05 }}
                    >
                        Take Attendance
                    </motion.button>
                </div>

                {students.length > 0 && (
                    <div style={styles.listWrapper}>
                        <h3 style={styles.listTitle}>Student List</h3>
             

                        <ul style={styles.list}>
                            {students.map((s) => (
                                <li key={s._id} style={styles.listItem}>
                                    {s.name}
                                    <button
                                        onClick={() => navigate(`/student-attendance/${s._id}`)}
                                        style={styles.attendanceButton}
                                    >
                                        View Attendance
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

const glowEffect = {
    border: "1px solid rgba(255, 102, 0, 0.3)",
    boxShadow: "0 0 10px rgba(255, 102, 0, 0.3), 0 0 20px rgba(255, 102, 0, 0.2)",
    transition: "0.3s ease-in-out",
    
};

const styles = {
    wrapper: {
        backgroundColor: "black",
        minHeight: "100vh",
        // background: "#f8f8f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "'Segoe UI', sans-serif",
    },
    card: {
        // border: "1px solid white",
              backgroundColor: "#1a1a1a",

        borderRadius: "20px",
        padding: "30px",
        width: "100%",
        maxWidth: "750px",
        color: "#fff",
        // backgroundColor: isHovered ? "darkorange" : "orange",
    },
    
    title: {
        textAlign: "center",
        fontSize: "26px",
        fontWeight: "bold",
        color: "white",
        marginBottom: "30px",
        minHeight: "34px",
    },
    buttonRow: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "15px",
        marginBottom: "30px",
       
    },
    glowButton1: {
        background: "orange",
        color: "#fff",
        borderRadius: "10px",
        padding: "12px",
        fontWeight: "bold",
        fontSize: "15px",
        cursor: "pointer",
        ...glowEffect,
    },
    glowButton2: {
        background: "orange",
        color: "#fff",
        borderRadius: "10px",
        padding: "12px",
        fontWeight: "bold",
        fontSize: "15px",
        cursor: "pointer",
        ...glowEffect,
    },
    glowButton3: {
        background: "orange",
        color: "#fff",
        borderRadius: "10px",
        padding: "12px",
        fontWeight: "bold",
        fontSize: "15px",
        cursor: "pointer",
        ...glowEffect,
    },
    listWrapper: {
        marginTop: "20px",
       
    },
    listTitle: {
        fontSize: "18px",
        color: "#ff6600",
        marginBottom: "10px",
    },
    list: {
        listStyle: "none",
        padding: 0,
        margin: 0,
   
    },
    listItem: {
        background: "white",
        padding: "10px",
        marginBottom: "8px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "black",
        border: "1px solid black",
        
    },
    attendanceButton: {
      backgroundColor: "orange",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        padding: "6px 12px",
        fontWeight: "bold",
        cursor: "pointer",
        
    },
};

export default Home;
