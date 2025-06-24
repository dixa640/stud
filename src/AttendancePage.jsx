import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./AttendancePage.css"; // ⬅️ Import the external CSS

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
            className="wrapper"
        >
            <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="card"
            >
                <div className="headerRow">
                    <h2 className="heading">Attendance Dashboard</h2>
                    <motion.button
                        className="closeBtn"
                        whileHover={{ rotate: 180, scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleClose}
                    >
                        ×
                    </motion.button>
                </div>

                {message && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="message"
                    >
                        {message}
                    </motion.p>
                )}

                <div className="tableWrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="th">Student's Name</th>
                                <th className="th">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <motion.tr key={student._id} className="responsiveRow">
                                    <td className="responsiveName td">{student.name}</td>
                                    <td className="responsiveStatus td">
                                        <label className="radioLabel">
                                            <input
                                                type="radio"
                                                name={`status-${student._id}`}
                                                value="Present"
                                                checked={student.status === "Present"}
                                                onChange={() => handleStatusChange(student._id, "Present")}
                                            />
                                            <span>Present</span>
                                        </label>
                                        <label className="radioLabel">
                                            <input
                                                type="radio"
                                                name={`status-${student._id}`}
                                                value="Absent"
                                                checked={student.status === "Absent"}
                                                onChange={() => handleStatusChange(student._id, "Absent")}
                                            />
                                            <span>Absent</span>
                                        </label>
                                        <label className="radioLabel">
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
                    className="submitBtnContainer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <button className="okBtn" onClick={handleSubmit}>
                        Submit Attendance
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default AttendancePage;
