import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const EditStudentModal = ({ isOpen, onRequestClose, student, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    qualification: '',
    admissionNo: '',
    dateOfJoining: '',
    dob: '',
    course: '',
    duration: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        fatherName: student.fatherName || '',
        motherName: student.motherName || '',
        qualification: student.qualification || '',
        // admissionNo: student.admissionNo || '',
        // dateOfJoining: student.dateOfJoining ? student.dateOfJoining.slice(0, 10) : '',
        dob: student.dob ? student.dob.slice(0, 10) : '',
        course: student.course || '',
        duration: student.duration || '',
        phone: student.phone || '',
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `https://stuserver-6j1t.onrender.com/api/students/${student._id}`,
        formData
      );
      onSave(res.data.student || res.data || formData);
      onRequestClose();
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Failed to update student.';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={modalStyles}>
      <h2 style={styles.heading}>Edit Student</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} style={styles.formGroup}>
            <label style={styles.label}>
              {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
            </label>
            {(key === 'dob' || key === 'dateOfJoining') ? (
              <input
                type="date"
                name={key}
                value={value}
                onChange={handleChange}
                required
                disabled={loading}
                style={styles.input}
              />
            ) : (
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                required
                disabled={loading}
                style={styles.input}
              />
            )}
          </div>
        ))}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </Modal>
  );
};

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 999,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '30px',
    width: '800px',
    height: '500px',
    backgroundColor: '#ffffff',
    color: '#000000',
    border: '2px solid orange',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    overflowY: 'auto',
  },
};

const styles = {
  heading: {
    marginBottom: '20px',
    color: 'orange',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    color: 'black',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid black',
    backgroundColor: 'white',
    color: 'black',
    fontSize: '16px',
  },
  button: {
    backgroundColor: 'orange',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default EditStudentModal;
