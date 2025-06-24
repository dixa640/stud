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
    const updated = students.map((s) => (s._id === id ? { ...s, status } : s));
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
                  key={student._id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
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
    backgroundColor: "black",
    padding: "20px",
  },
  card: {
    background: "#111",
    padding: "25px",
    borderRadius: "18px",
    border: "2px solid black",
    width: "100%",
    maxWidth: "700px",
    position: "relative",
    overflowX: "auto",
    color: "white",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  heading: {
    fontSize: "28px",
    color: "orange",
    fontWeight: "bold",
    margin: 0,
  },
  closeBtn: {
    background: "orange",
    color: "black",
    fontSize: "24px",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    fontWeight: "bold",
    lineHeight: 1,
    alignSelf: "flex-start",
  },
  message: {
    color: "orange",
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
    minWidth: "300px",
  },
  th: {
    textAlign: "left",
    padding: "12px 10px",
    backgroundColor: "black",
    color: "orange",
    fontSize: "18px",
    borderBottom: "2px solid orange",
    userSelect: "none",
    minWidth: "140px",
  },
  td: {
    padding: "12px 10px",
    borderBottom: "1px solid white",
    fontSize: "14px",
    color: "white",
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
  },

  // Responsive Styles
  '@media (max-width: 600px)': {
    headerRow: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "10px",
    },
    table: {
      display: "block",
      overflowX: "auto",
      whiteSpace: "nowrap",
    },
    th: {
      fontSize: "16px",
      padding: "10px 8px",
    },
    td: {
      fontSize: "13px",
      padding: "10px 8px",
    },
    radioGroup: {
      gap: "10px",
    },
    okBtn: {
      width: "100%",
      padding: "14px 0",
      fontSize: "18px",
    },
  },
};

// For inline styles we can't directly use media queries,
// so you can add the media queries in CSS or use a style library.
// Otherwise, add this CSS in a file and import it:

/*
@media (max-width: 600px) {
  .headerRow {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 10px !important;
  }
  table {
    display: block !important;
    overflow-x: auto !important;
    white-space: nowrap !important;
  }
  th {
    font-size: 16px !important;
    padding: 10px 8px !important;
  }
  td {
    font-size: 13px !important;
    padding: 10px 8px !important;
  }
  .radioGroup {
    gap: 10px !important;
  }
  button {
    width: 100% !important;
    padding: 14px 0 !important;
    font-size: 18px !important;
  }
}
*/

export default AttendancePage;
