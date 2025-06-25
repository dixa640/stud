import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [students]);

  return (
    <div style={styles.wrapper}>
      <style>{`
        /* Flex items side by side, wrapping only when needed */
        .responsive-list-item {
          display: flex;
          align-items: center;
          flex-wrap: wrap; /* allows wrapping on very narrow screens */
          gap: 8px;
        }

        /* Add margin-bottom only to all but the last item */
        .responsive-list-item:not(:last-child) {
          margin-bottom: 20px;
        }

        @media (max-width: 600px) {
          .responsive-list-item {
            justify-content: space-between; /* keeps them spaced */
          }
        }
      `}</style>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={styles.card}
        className="responsive-card"
      >
        <h1 style={styles.title}>Welcome To The Skill Boost Computer Institute</h1>

        {loading && <p style={styles.loading}>Loading students...</p>}
        {error && <p style={styles.error}>
          Error: {error.includes("Network")
            ? "Cannot connect to server. Please check backend & CORS."
            : error}
        </p>}
        {!loading && !error && students.length === 0 && <p style={styles.empty}>No students found.</p>}

        <div style={styles.buttonRow} className="responsive-button-row">
          <motion.button onClick={() => navigate("/add-student")} style={styles.glowButton} whileHover={{ scale: 1.05 }}>Add Student</motion.button>
          <motion.button onClick={() => navigate("/students")} style={styles.glowButton} whileHover={{ scale: 1.05 }}>View Students</motion.button>
          <motion.button onClick={() => navigate("/attendance")} style={styles.glowButton} whileHover={{ scale: 1.05 }}>Take Attendance</motion.button>
        </div>

        <div style={styles.listContainer}>
          {students.length > 0 && (
            <>
              <h3 style={styles.listTitle}>Student List</h3>
              <div style={styles.scrollArea} ref={scrollRef}>
                <ul style={styles.list}>
                  {students.map((s, idx) => (
                    <li key={s._id} className="responsive-list-item" style={styles.listItem}>
                      <span style={styles.serial}>{idx + 1}.</span>
                      <span style={styles.name}>{s.name}</span>
                      <button onClick={() => navigate(`/student-attendance/${s._id}`)} style={styles.attendanceButton}>
                        View Attendance
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
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
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: "20px",
    padding: "30px",
    width: "100%",
    maxWidth: "750px",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    height: "90vh",
  },
  title: {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "bold",
    color: "white",
    marginBottom: "30px",
  },
  loading: { color: "orange", textAlign: "center", marginBottom: "15px" },
  error: { color: "red", textAlign: "center", marginBottom: "15px" },
  empty: { color: "#aaa", textAlign: "center", marginBottom: "15px" },
  buttonRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "12px",
    marginBottom: "30px",
  },
  glowButton: { background: "orange", color: "#fff", borderRadius: "10px", padding: "10px 8px", fontWeight: "bold", fontSize: "14px", cursor: "pointer", ...glowEffect },
  listContainer: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
  scrollArea: { overflowY: "auto", flex: 1, paddingRight: "5px" },
  listTitle: { fontSize: "18px", color: "#ff6600", marginBottom: "10px" },
  list: { listStyle: "none", padding: 0, margin: 0 },
  listItem: { background: "white", padding: "10px", borderRadius: "8px", display: "flex", alignItems: "center", color: "black", border: "1px solid black" },
  serial: { marginRight: "10px", fontWeight: "bold" },
  name: { flex: 1 },
  attendanceButton: { backgroundColor: "orange", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 12px", fontWeight: "bold", cursor: "pointer" },
};

export default Home;
