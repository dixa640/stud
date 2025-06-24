import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
          Attendance: <span style={{ color: "white" }}>{student?.name}</span>
        </h2>

        {student?.attendance && student.attendance.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {student.attendance.map((entry, index) => (
                <tr key={index}>
                  <td style={styles.td}>{entry.date}</td>
                  <td style={{ 
                    ...styles.td, 
                    color: entry.status === "Present" ? "lightgreen" : "red",
                    fontWeight: "bold"
                  }}>
                    {entry.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    padding: "20px",
  },
  card: {
    background: "#111",
    padding: "30px",
    borderRadius: "16px",
    border: "1px solid black",
    width: "100%",
    maxWidth: "600px",
    position: "relative",
    color: "white",
    border: "1px solid white",

  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "15px",
    background: "transparent",
    border: "none",
    color: "red",
    fontSize: "28px",
    cursor: "pointer",
  },
  title: {
    color: "orange",
    textAlign: "center",
    marginBottom: "20px",
   
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid white",
    padding: "10px",
    textAlign: "left",
    color: "white",
    textAlign: "center",
  },
  td: {
    padding: "10px",
    border: "1px solid white",
    color: "white",
    textAlign: "center",

  },
};

export default StudentAttendance;
