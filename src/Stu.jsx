import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import EditStudentModal from './EditStudentModal';

const Stu = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("https://stuserver-6j1t.onrender.com/api/students");
        setStudents(res.data);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`https://stuserver-6j1t.onrender.com/api/students/${id}`);
        setStudents(students.filter(s => s._id !== id));
      } catch (err) {
        console.error("Error deleting student:", err);
      }
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleSave = (updatedStudent) => {
    setStudents(students.map(s => s._id === updatedStudent._id ? updatedStudent : s));
  };

  return (
    <motion.div style={styles.body}>
      <motion.div style={styles.container}>
        <div style={styles.headerRow}>
          <h2 style={styles.title}> Student List</h2>
          <motion.button onClick={() => navigate("/")} whileHover={{ scale: 1.1 }} style={styles.closeBtn}>×</motion.button>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Name", "Father", "Mother", "DOB", "Phone", "Qualification", "Course", "Duration", "Actions"].map((head, i) => (
                  <th key={i} style={styles.th}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => (
                <tr key={student._id || i}>
                  <td style={{ ...styles.td, color: '#00f7ff' }}>{student.name}</td>
                  <td style={{ ...styles.td, color: '#ff4d4d' }}>{student.fatherName}</td>
                  <td style={{ ...styles.td, color: '#ff9933' }}>{student.motherName}</td>
                  <td style={{ ...styles.td, color: '#ffff66' }}>{student.dob}</td>
                  <td style={{ ...styles.td, color: '#66ccff' }}>{student.phone}</td>
                  <td style={{ ...styles.td, color: '#66ffff' }}>{student.qualification}</td>
                  <td style={{ ...styles.td, color: '#80ff80' }}>{student.course}</td>
                  <td style={{ ...styles.td, color: '#ff66cc' }}>{student.duration}</td>
                  <td style={styles.td}>
                    <div style={styles.buttonGroup}>
                      <button style={styles.editBtn} onClick={() => handleEdit(student)}>Edit</button>
                      <button style={styles.deleteBtn} onClick={() => handleDelete(student._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && selectedStudent && (
          <EditStudentModal
            isOpen={isModalOpen}
            onRequestClose={handleClose}
            student={selectedStudent}
            onSave={handleSave}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

const styles = {
  body: {
    backgroundColor: 'black',
    minHeight: '100vh',
    padding: '20px',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    backgroundColor: '#1a1a1a',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 0 30px rgba(0,0,0,0.6)',
    overflowX: 'auto',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  title: {
    color: 'orange',
    fontSize: '36px',
    margin: 0,
  },
  closeBtn: {
    backgroundColor: '#ff3333',
    color: 'white',
    border: 'none',
    fontSize: '28px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '800px',
  },
  th: {
    backgroundColor: '#292929',
    color: '#ffcc00',
    padding: '12px 8px',
    borderBottom: '2px solid #444',
    fontSize: '14px',
  },
  td: {
    backgroundColor: '#1e1e1e',
    padding: '10px 8px',
    borderBottom: '1px solid white',
    fontSize: '13px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'nowrap',   // <-- prevent buttons from wrapping
    whiteSpace: 'nowrap', // <-- keep buttons inline horizontally
  },
  editBtn: {
    backgroundColor: '#00cc66',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    minWidth: '70px',     // keep consistent width
  },
  deleteBtn: {
    backgroundColor: '#cc0033',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    minWidth: '70px',     // keep consistent width
  },
};

export default Stu;
