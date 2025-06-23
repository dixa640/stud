import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AttendancePage = () => {
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://stuserver-6j1t.onrender.com/api/students")
            .then(res => setStudents(res.data))
            .catch(err => {
                console.error(err);
                setMessage("Failed to fetch data.");
            });
    }, []);

    const handleStatusChange = (id, status) => {
        const updated = students.map(s =>
            s._id === id ? { ...s, status } : s
        );
        setStudents(updated);
    };

    const handleSubmit = () => {
        const filteredStudents = students.filter(s => s.status);
        axios.post("https://stuserver-6j1t.onrender.com/submit-attendance", { students: filteredStudents })
            .then(() => {
                alert("Attendance successfully submitted!");
                setMessage("Attendance submitted successfully!");
                setTimeout(() => navigate("/"), 1500);
            })
            .catch(err => {
                console.error(err);
                alert("Error submitting attendance");
            });
    };

    const handleClose = () => {
        setMessage("Redirecting to Home...");
        setTimeout(() => navigate("/"), 1200);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.wrapper}
        >
            <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={styles.card}
            >
                <div style={styles.headerRow}>
                    <h2 style={styles.heading}>Attendance Dashboard</h2>
                    <motion.button
                        style={styles.closeBtn}
                        whileHover={{ rotate: 180, scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleClose}
                    >
                        ×
                    </motion.button>
                </div>

                {message && <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={styles.message}
                >
                    {message}
                </motion.p>}

                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Student's Name</th>
                                <th style={styles.th}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <motion.tr
                                    // key={student._id}
                                    // initial={{ opacity: 0, x: -20 }}
                                    // animate={{ opacity: 1, x: 0 }}
                                    // transition={{ delay: index * 0.05 }}
                                    // style={{
                                    //     backgroundColor:
                                    //         student.status === "Present"
                                    //             ? "#262626" // dark background for present row
                                    //             : student.status === "Absent"
                                    //                 ? "#330000" // dark red for absent
                                    //                 : "transparent",
                                    // }}
                                >
                                    <td style={styles.td}>{student.name}</td>
                                    <td style={{ ...styles.td, ...styles.radioGroup }}>
                                        <label style={styles.radioLabel}>
                                            <input
                                                type="radio"
                                                name={`status-${student._id}`}
                                                value="Present"
                                                checked={student.status === "Present"}
                                                onChange={() => handleStatusChange(student._id, "Present")}
                                            />
                                            <span>Present</span>
                                        </label>
                                        <label style={styles.radioLabel}>
                                            <input
                                                type="radio"
                                                name={`status-${student._id}`}
                                                value="Absent"
                                                checked={student.status === "Absent"}
                                                onChange={() => handleStatusChange(student._id, "Absent")}
                                            />
                                            <span>Absent</span>
                                        </label>
                                         <label style={styles.radioLabel}>
                                            <input
                                                type="radio"
                                                name={`status-${student._id}`}
                                                value="leave"
                                                checked={student.status === "leave"}
                                                onChange={() => handleStatusChange(student._id, "leave")}
                                            />
                                            <span>Leave</span>
                                        </label>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <motion.div
                    style={{ textAlign: "center", marginTop: "20px" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <button style={styles.okBtn} onClick={handleSubmit}>
                        Submit Attendance
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const styles = {
    wrapper: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white", // solid black background for clean look
        padding: "20px",
    },
    card: {
        background: "white", // dark card background
        padding: "25px",
        borderRadius: "18px",
       border: "2px solid black "   , // orange glow
        width: "100%",
        maxWidth: "700px",
        position: "relative",
        overflowX: "auto",
        color: "black",
    },
    headerRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
     
    },
    heading: {
        fontSize: "22px",
        color: "black", // bright orange text
        fontWeight: "bold",
    },
    closeBtn: {
        background: "#ff6600", // orange button background
        // color: "#000", // black cross for contrast
        fontSize: "20px",
        border: "none",
        borderRadius: "50%",
        width: "36px",
        height: "36px",
        cursor: "pointer",
        fontWeight: "bold",
        lineHeight: 1,
    },
    message: {
        color: "#ff9900", // lighter orange for success message
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "16px",
    },
    tableWrapper: {
        overflowX: "auto",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "20px",
    },
    th: {
        textAlign: "left",
        padding: "14px",
        background: "white", // orange header background
        color: "#000", // black text in header
        fontSize: "25px",
        minWidth: "150px",
        userSelect: "none",
        borderBottom: "2px solid #333",
    },
    td: {
        padding: "14px",
        borderBottom: "1px solid #333",
        fontSize: "14px",
        color: "black",
    },
    radioGroup: {
        display: "flex",
        gap: "20px",
        alignItems: "center",
    },
    radioLabel: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: "black",
        cursor: "pointer",
        fontWeight: "600",
        userSelect: "none",
    },
    okBtn: {
        background: "#ff6600", // orange button
        color: "#000", // black text
        fontSize: "15px",
        padding: "10px 25px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        // boxShadow: "0 0 12px #ff6600",
        fontWeight: "bold",
        transition: "background 0.3s, transform 0.2s",
    },
};

export default AttendancePage;
