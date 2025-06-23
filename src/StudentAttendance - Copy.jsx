import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { color } from "framer-motion";

const StudentAttendance = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const res = await axios.get(`https://stuserver-6j1t.onrender.com/api/attendance/${id}`);
                setStudent(res.data);
            } catch (err) {
                console.error("Error fetching attendance:", err);
            }
        };
        fetchAttendance();
    }, [id]);

    const handleClose = () => {
        navigate("/");
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <button style={styles.closeBtn} onClick={handleClose}>×</button>
                <h2 style={styles.title}>
                    Attendance: <span style={{ color: "black" }}>{student?.name}</span>
                </h2>

                {student?.attendance && student.attendance.length > 0 ? (
                    <ul style={styles.list}>
                        {student.attendance.map((entry, index) => (
                            <li key={index} style={styles.item}>
                                <strong>{entry.date}</strong> -{" "}
                                <span
                                    style={{
                                        color: entry.status === "Present" ? "lightgreen" : "red",
                                    }}
                                >
                                    {entry.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: "#ccc", textAlign: "center" }}>No attendance data found.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "black",
    },
    card: {
        background: "white",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 0 20px orange",
        minWidth: "400px",
        position: "relative",
        color: "white",
    },
    closeBtn: {
        position: "absolute",
        top: "10px",
        right: "15px",
        background: "transparent",
        border: "none",
        color: "orange",
        fontSize: "28px",
        cursor: "pointer",
    },
    title: {
        color: "orange  ",
        textAlign: "center",
        marginBottom: "20px",
    },
    list: {
        listStyleType: "none",
        padding: 0,
    },
    item: {
        marginBottom: "10px",
        fontSize: "18px",
        color: "black",
        marginLeft: "130px",
    },
};

export default StudentAttendance;
