import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://stuserver-6j1t.onrender.com/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => {
        console.error(err);
        setMessage("Failed to fetch data.");
      });
  }, []);

  const handleStatusChange = (id, status) => {
    const updated = students.map((s) =>
      s._id === id ? { ...s, status } : s
    );
    setStudents(updated);
  };

  const handleSubmit = () => {
    const filteredStudents = students.filter((s) => s.status);
    axios
      .post("https://stuserver-6j1t.onrender.com/submit-attendance", {
        students: filteredStudents,
      })
      .then(() => {
        alert("Attendance successfully submitted!");
        setMessage("Attendance submitted successfully!");
        setTimeout(() => navigate("/"), 1500);
      })
      .catch((err) => {
        console.error(err);
        alert("Error submitting attendance");
      });
  };

  const handleClose = () => {
    setMessage("Redirecting to Home...");
    setTimeout(() => navigate("/"), 1200);
  };

  const getRadioBoxShadow = (currentStatus, radioValue) => {
    if (currentStatus !== radioValue) return {};
    if (radioValue === "Present") return {};
    if (radioValue === "Absent" || radioValue === "leave")
      return { boxShadow: "none" };
    return {};
  };

  return (
    <>
      {/* 👇 Embedded CSS for scrollbar hiding and mobile padding */}
      <style>{`
        ::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        @media (max-width: 480px) {
          th, td {
            padding-left: 2px !important;
            padding-right: 2px !important;
          }
        }
      `}</style>

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
              aria-label="Close"
            >
              ×
            </motion.button>
          </div>

          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={styles.message}
            >
              {message}
            </motion.p>
          )}

          <div
            className="hide-scrollbar"
            style={styles.tableScrollWrapper}
          >
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>Sr No</th>
                  <th style={styles.th}>Student's Name</th>
                  <th style={styles.th}>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <motion.tr
                    key={student._id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={styles.tr}
                  >
                    <td style={styles.td}>{index + 1}</td>
                    <td style={{ ...styles.td, ...styles.studentName }}>
                      {student.name}
                    </td>
                    <td style={{ ...styles.td, ...styles.radioGroup }}>
                      <label style={styles.radioLabel}>
                        <input
                          type="radio"
                          name={`status-${student._id}`}
                          value="Present"
                          checked={student.status === "Present"}
                          onChange={() =>
                            handleStatusChange(student._id, "Present")
                          }
                          style={styles.radioInput}
                        />
                        <span>Present</span>
                      </label>
                      <label style={styles.radioLabel}>
                        <input
                          type="radio"
                          name={`status-${student._id}`}
                          value="Absent"
                          checked={student.status === "Absent"}
                          onChange={() =>
                            handleStatusChange(student._id, "Absent")
                          }
                          style={{
                            ...styles.radioInput,
                            ...getRadioBoxShadow(student.status, "Absent"),
                          }}
                        />
                        <span>Absent</span>
                      </label>
                      <label style={styles.radioLabel}>
                        <input
                          type="radio"
                          name={`status-${student._id}`}
                          value="leave"
                          checked={student.status === "leave"}
                          onChange={() =>
                            handleStatusChange(student._id, "leave")
                          }
                          style={{
                            ...styles.radioInput,
                            ...getRadioBoxShadow(student.status, "leave"),
                          }}
                        />
                        <span>Leave</span>
                      </label>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            <motion.div
              style={{ textAlign: "center", marginTop: "20px" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button style={styles.okBtn} onClick={handleSubmit}>
                Submit Attendance
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

const styles = {
  wrapper: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: "20px",
    boxSizing: "border-box",
  },
  card: {
    background: "#111",
    padding: "25px",
    borderRadius: "18px",
    border: "2px solid black",
    width: "100%",
    maxWidth: "700px",
    position: "relative",
    color: "white",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    paddingRight: "10px",
  },
  heading: {
    fontSize: "28px",
    color: "orange",
    fontWeight: "bold",
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "85%",
  },
  closeBtn: {
    background: "orange",
    color: "white",
    fontSize: "24px",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    fontWeight: "bold",
    lineHeight: 1,
    marginLeft: "10px",
  },
  message: {
    color: "orange",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "16px",
  },
  tableScrollWrapper: {
    maxHeight: "65vh",
    overflowY: "scroll",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "10px",
  },
  thead: {
    position: "sticky",
    top: 0,
    backgroundColor: "#111",
    zIndex: 200,
  },
  th: {
    textAlign: "left",
    padding: "12px 10px",
    backgroundColor: "black",
    color: "orange",
    fontSize: "18px",
    borderBottom: "2px solid orange",
    userSelect: "none",
    verticalAlign: "bottom",
  },
  tr: {
    borderBottom: "1px solid white",
  },
  td: {
    color: "#c0c0c0",
    fontSize: "14px",
    padding: "12px 10px",
    verticalAlign: "middle",
  },
  studentName: {
    color: "#5fd3f3",
    fontWeight: "600",
  },
   radioGroup: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    userSelect: "none",
  },
  radioInput: {
    width: "14px",
    height: "14px",
    margin: 0,
    cursor: "pointer",
    boxShadow: "none",
    borderRadius: "50%",
  },
  okBtn: {
    background: "orange",
    color: "black",
    fontSize: "16px",
    padding: "12px 30px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s, transform 0.2s",
    width: "100%",
    maxWidth: "300px",
    margin: "auto",
  },
};

export default AttendancePage;

