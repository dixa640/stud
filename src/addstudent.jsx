import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddStudent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        fatherName: "",
        motherName: "",
        phone: "",
        qualification: "",
        course: "",
        duration: "",
        admissionNo: "",
        dateOfJoining: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData);
        try {
            await axios.post('http://localhost:5000/api/students', formData);
            alert("Student added successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Error submitting data.");
        }
    };

    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            background: "linear-gradient(to right, #0f0f0f, #1a1a1a)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
            boxSizing: "border-box"
        }}>
            <style>{`
                @media (max-width: 600px) {
                    .form-content {
                        padding: 15px !important;
                        max-width: 100% !important;
                    }
                    .form-content h1 {
                        font-size: 22px !important;
                    }
                    .form-content p {
                        font-size: 13px !important;
                        margin: 4px 0 !important;
                    }
                    .attendance-form {
                        grid-template-columns: 1fr !important;
                        justify-items: center;
                    }
                    .attendance-form input {
                        width: 85% !important;
                        font-size: 15px !important;
                        text-align: center;
                    }
                    .attendance-form label {
                        font-size: 14px !important;
                        text-align: left !important;
                    }
                    .button-submit {
                        width: 100% !important;
                    }
                }
                ::-webkit-scrollbar {
                    width: 6px;
                }
                ::-webkit-scrollbar-thumb {
                    background: gray;
                    border-radius: 4px;
                }
            `}</style>

            {/* Scrollable Card */}
            <div style={{
                width: "100%",
                maxWidth: "900px",
                height: "100%",
                maxHeight: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
            }}>

                {/* Close Button */}
                <div
                    style={{
                        position: "absolute",
                        top: "0px",
                        right: "8px",
                        fontSize: "28px",
                        cursor: "pointer",
                        color: "#e74c3c",
                        fontWeight: "bold",
                        zIndex: 10
                    }}
                    onClick={() => navigate("/")}
                >
                    x
                </div>

                {/* Header */}
                <div className="form-content" style={{
                    textAlign: "center",
                    padding: "30px 30px 10px 30px",
                    flexShrink: 0
                }}>
                    <h1 style={{ color: "#FF8C00", margin: 0 }}>THE SKILL BOOST</h1>
                    <p style={{ color: "black", margin: "4px 0" }}>Computer Institute | ISO Certified</p>
                    <p style={{ color: "black", margin: "4px 0", fontSize: "15px" }}>
                        SCO-7, Cabin 1 First Floor, Phase 3B1, Sector 68, Kumbra
                    </p>
                    <p style={{ color: "black", margin: "4px 0", fontSize: "15px" }}>
                        www.theskillboost.com | 8360686961 | 9653675538
                    </p>
                    <h1 style={{
                        marginTop: "20px",
                        color: "#FF8C00",
                        textAlign: "left",
                        fontSize: "24px"
                    }}>STUDENT FORM</h1>
                </div>

                {/* Form */}
                <div style={{
                    padding: "0 30px 30px 30px",
                    flexGrow: 1
                }}>
                    <form onSubmit={handleSubmit} className="attendance-form">
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                            gap: "20px",
                            marginBottom: "30px",
                            width: "100%",
                        }}>
                            {Object.keys(formData).map((key) => (
                                <div key={key} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                    <label htmlFor={key} style={{ fontWeight: "bold", color: "#34495e" }}>
                                        {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                                    </label>
                                    <input
                                        type={key === "dob" || key === "dateOfJoining" ? "date" : "text"}
                                        id={key}
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleChange}
                                        required
                                        placeholder={
                                            key === "dob" || key === "dateOfJoining"
                                                ? undefined
                                                : `Enter ${key.replace(/([A-Z])/g, " $1")}`
                                        }
                                        style={{
                                            padding: "12px 15px",
                                            borderRadius: "10px",
                                            border: "1px solid #ccc",
                                            fontSize: "15px",
                                            outline: "none",
                                            backgroundColor: "#f9f9f9",
                                            width: "80%",
                                            transition: "border 0.3s ease",
                                            color: "black"
                                        }}
                                        onFocus={(e) => e.target.style.border = "2px solid black"}
                                        onBlur={(e) => e.target.style.border = "1px solid #ccc"}
                                    />
                                </div>
                            ))}
                        </div>

                        <button type="submit" style={{
                            padding: "14px 35px",
                            fontSize: "17px",
                            borderRadius: "10px",
                            border: "none",
                            background: "#FFA500",
                            color: "black",
                            cursor: "pointer",
                            display: "block",
                            margin: "0 auto"
                        }}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddStudent;
