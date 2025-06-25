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
        console.log('Fetched students:', res.data);
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
      {/* Table visible only when modal not open */}
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
                  {/* <th style={styles.th}>Admission No</th>
                  <th style={styles.th}>Date of Joining</th> */}
                  <th style={styles.th}>Course</th>
                  <th style={styles.th}>Duration</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody style={styles.scrollableTbody}>
                {students.map((student, i) => (
                  <tr key={student._id || i}>
                    <td style={{ ...styles.td, color: 'white' }}>{i + 1}</td>
                    <td style={{ ...styles.td, color: '#00f7ff' }}>{student.name}</td>
                    <td style={{ ...styles.td, color: '#ff4d4d' }}>{student.fatherName}</td>
                    <td style={{ ...styles.td, color: '#ff9933' }}>{student.motherName}</td>
                    <td style={{ ...styles.td, color: '#ffff66' }}>{student.dob}</td>
                    <td style={{ ...styles.td, color: '#66ccff' }}>{student.phone}</td>
                    <td style={{ ...styles.td, color: '#66ffff' }}>{student.qualification}</td>
                    {/* <td style={{ ...styles.td, color: 'red' }}>{student.admissionNo }</td>
                    <td style={{ ...styles.td, color: 'white' }}>{student.dateOfJoining }</td> */}
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
        </motion.div>
      )}

      {/* Modal displayed alone when open */}
      {isModalOpen && selectedStudent && (
        <EditStudentModal
          isOpen={isModalOpen}
          onRequestClose={handleClose}
          student={selectedStudent}
          onSave={handleSave}
        />
      )}
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
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: '#1a1a1a',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 0 30px rgba(0,0,0,0.6)',
    overflow: 'hidden',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    color: 'orange',
    fontSize: '36px',
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
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '900px',
  },
  thead: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#292929',
    zIndex: 100,
  },
  th: {
    color: '#ffa500',
    padding: '12px 8px',
    borderBottom: '2px solid #444',
    fontSize: '14px',
    textAlign: 'center',
    backgroundColor: '#292929',
  },
  scrollableTbody: {
    overflowY: 'auto',
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
  },
  editBtn: {
    backgroundColor: '#00cc66',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    minWidth: '70px',
  },
  deleteBtn: {
    backgroundColor: '#cc0033',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    minWidth: '70px',
  },
};

export default Stu;
