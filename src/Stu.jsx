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
        console.log("Fetched Students:", res.data);
        // Ensure you're getting an array
        setStudents(Array.isArray(res.data) ? res.data : []);
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
        // await axios.delete(`http://localhost:5000/api/students/${id}`);

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
    <div style={styles.pageWrapper}>
      {!isModalOpen && (
        <motion.div style={styles.container}>
          <div style={styles.headerRow}>
            <h2 style={styles.title}>Student List</h2>
            <motion.button
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.1 }}
              style={styles.closeBtn}
            >×</motion.button>
          </div>

          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>Sr No</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Father Name</th>
                  <th style={styles.th}>Mother Name</th>
                  <th style={styles.th}>DOB</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Qualification</th>
                  <th style={styles.th}>Admission No</th>
                  <th style={styles.th}>Date of Joining</th>
                  <th style={styles.th}>Course</th>
                  <th style={styles.th}>Duration</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, i) => (
                  <tr key={student._id || i}>
                    <td style={styles.td}>{i + 1}</td>
                    <td style={styles.td}>{student.name}</td>
                    <td style={styles.td}>{student.fatherName}</td>
                    <td style={styles.td}>{student.motherName}</td>
                    <td style={styles.td}>{student.dob}</td>
                    <td style={styles.td}>{student.phone}</td>
                    <td style={styles.td}>{student.qualification}</td>
                    <td style={styles.td}>{student.admissionNo}</td>
                    <td style={styles.td}>{student.dateOfJoining}</td>
                    <td style={styles.td}>{student.course}</td>
                    <td style={styles.td}>{student.duration}</td>
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
        </motion.div>
      )}

      {isModalOpen && selectedStudent && (
        <EditStudentModal
          isOpen={isModalOpen}
          onRequestClose={handleClose}
          student={selectedStudent}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

// 🧩 CSS styles
const styles = {
  pageWrapper: {
    backgroundColor: 'black',
    minHeight: '100vh',
    padding: '20px',
    overflow: 'auto',
  },
  container: {
    maxWidth: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 0 30px rgba(0,0,0,0.6)',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    color: 'orange',
    fontSize: '32px',
    margin: 0,
  },
  closeBtn: {
    backgroundColor: 'orange',
    color: 'white',
    border: 'none',
    fontSize: '28px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  tableWrapper: {
    maxHeight: '70vh',
    overflowY: 'auto',
    overflowX: 'auto',
    borderRadius: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '1100px',
  },
  thead: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#292929',
    zIndex: 1,
  },
  th: {
    color: '#ffa500',
    padding: '12px 10px',
    borderBottom: '2px solid #444',
    fontSize: '14px',
    textAlign: 'center',
  },
  td: {
    backgroundColor: '#1e1e1e',
    padding: '10px 10px',
    borderBottom: '1px solid #444',
    fontSize: '13px',
    color: '#66ffff',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },
  editBtn: {
    backgroundColor: '#00cc66',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
  },
  deleteBtn: {
    backgroundColor: '#cc0033',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default Stu;
