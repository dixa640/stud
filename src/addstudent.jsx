import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css";

function AddStudent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', dob: '', fatherName: '', motherName: '',
        phone: '', qualification: '', course: '', duration: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://stuserver-6j1t.onrender.com/api/students', formData);
            alert("Student added successfully!");
            navigate("/"); // Redirect to homepage
        } catch (error) {
            console.error(error);
            alert("Error submitting data.");
        }
    };

    return (
        <div className="form-container" style={{
            minHeight: '100vh',
            background: 'linear-gradient(to right, #0f0f0f, #1a1a1a)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: "black",
            padding: '30px',
            width: '100vw',
            boxSizing: 'border-box',
        }}>
            <style>{`
                @media (max-width: 600px) {
                    .form-container > div {
                        padding: 15px !important;
                        max-width: 98vw !important;
                    }
                    .attendance-form {
                        grid-template-columns: 1fr !important;
                    }
                    .attendance-form input {
                        width: 70% !important;
                        font-size: 15px !important;
                    }
                    .attendance-form label {
                        font-size: 14px !important;
                    }
                }
            `}</style>
            <div
                style={{
                    width: '100%',
                    maxWidth: '900px',
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                    padding: '40px',
                    position: 'relative',
                    boxSizing: 'border-box',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '25px',
                        fontSize: '28px',
                        cursor: 'pointer',
                        color: '#e74c3c',
                        fontWeight: 'bold'
                    }}
                    onClick={() => navigate('/')}
                >
                    x
                </div>

                <div
                    style={{ textAlign: 'center', marginBottom: '0px'  }}
                >
                    <h1 style={{ color: '#FF8C00' }}>THE SKILL BOOST</h1>
                    <p style={{ color: 'black' }}>Computer Institute  
                        |   ISO Certified</p>
                    <p style={{ color: 'black', fontSize: '17px' }}>SCO-7,Cabin 1 First Floor, Phase 3B1, Sector 68, Kumbra</p>
                    <p style={{ color: 'black', fontSize: '17px' }}> www.theskillboost.com | 8360686961 | 9653675538</p> <br />
                    <h1 style={{ marginTop: '20px', color: '#FF8C00' ,textAlign:'left'}}>STUDENT FORM</h1>
                </div>

                <form onSubmit={handleSubmit} className="attendance-form">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px',
                        marginBottom: '30px',
                        width: '100%',
                    }}>
                        {Object.keys(formData).map((key) => (
                            <div
                                key={key}
                                style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
                            >
                                <label htmlFor={key} style={{ fontWeight: 'bold', color: '#34495e' }}>
                                    {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                </label>
                                <input
                                    type="text"
                                    id={key}
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    required
                                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
                                    style={{
                                        padding: '12px 15px',
                                        borderRadius: '10px',
                                        border: '1px solid #ccc',
                                        fontSize: '15px',
                                        outline: 'none',
                                        backgroundColor: '#f9f9f9',
                                        width: "80%",
                                        transition: 'border 0.3s ease',
                                        color: 'black',
                                        boxShadow:"none"
                                    }}
                                    onFocus={(e) => e.target.style.border = "2px solid black"}
                                    onBlur={(e) => e.target.style.border = "1px solid #ccc"}
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        style={{
                            padding: '14px 35px',
                            fontSize: '17px',
                            fontWeight: 'bold',
                            borderRadius: '10px',
                            border: 'none',
                            background: '#27ae60',
                            color: 'black',
                            cursor: 'pointer',
                            display: 'block',
                            margin: '0 auto'
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddStudent;
