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
    <motion.div className="student-list" style={styles.container}>
      <motion.div style={styles.headerRow}>
        <h2 style={styles.title}>Student List</h2>
        <motion.button onClick={() => navigate("/")} style={styles.closeBtn}>×</motion.button>
      </motion.div>
      <table style={{...styles.table, border: '1px solid black'}}>
        <thead>
          <tr>
            <th style={{border: '1px solid black'}}> Name</th>
            <th style={{border: '1px solid black'}}>Father Name</th>
            <th style={{border: '1px solid black'}}>Mother Name</th>
            <th style={{border: '1px solid black'}}>DOB</th>
            <th style={{border: '1px solid black'}}>Phone</th>
            <th style={{border: '1px solid black'}}>Qualification</th>
            <th style={{border: '1px solid black'}}>Course</th>
            <th style={{border: '1px solid black'}}>Duration</th>
            <th style={{border: '1px solid black'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <motion.tr key={student._id || index}>
              <td style={{border: '1px solid black'}}>{student.name}</td>
              <td style={{border: '1px solid black'}}>{student.fatherName}</td>
              <td style={{border: '1px solid black'}}>{student.motherName}</td>
              <td style={{border: '1px solid black'}}>{student.dob}</td>
              <td style={{border: '1px solid black'}}>{student.phone}</td>
              <td style={{border: '1px solid black'}}>{student.qualification}</td>
              <td style={{border: '1px solid black'}}>{student.course}</td>
                <td style={{border: '1px solid black'}}>{student.duration}</td>
              <td style={{border: '1px solid black'}}>
                <button onClick={() => handleEdit(student)} style={buttonStyles.edit}>Edit</button>
                <button onClick={() => handleDelete(student._id)} style={buttonStyles.delete}>Delete</button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

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
  container: {
    border: "1px solid black",
    marginTop: "10%",
    padding: "30px",
    maxWidth: "1100px",
    margin: "40px auto",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
  },
  title: {
    color: "#ff6600",
    fontSize: "28px",
    fontWeight: "bold",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    justifyContent: "center",
  },
};

const buttonStyles = {
  edit: {
    background: "green",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    marginLeft: "20px",
    marginRight: "10px",

  },
  delete: {
    background: "#cc0000",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    marginLeft: "30px",

  },
};

export default Stu;
