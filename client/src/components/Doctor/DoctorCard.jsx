// DoctorCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Correct import
import './DoctorCard.css';

function DoctorCard({ userId, qualification, speciality, experience, fee }) {
  const navigate = useNavigate(); // ✅ Correct usage

  return (
    <div className="doctor-card">
      <h2 className="doctor-name">{userId?.name}</h2>
      <p><strong>Email:</strong> {userId?.email}</p>                                                 
      <p><strong>Phone:</strong> {userId?.phone}</p>
      <p><strong>Qualification:</strong> {qualification || "N/A"}</p>
      <p><strong>Speciality:</strong> {speciality || "N/A"}</p>
      <p><strong>Experience:</strong> {experience || "N/A"} years</p>
      <p><strong>Fee:</strong> ₹{fee || "N/A"}</p>

      <button onClick={() => navigate(`/checkout-doctor/${userId?._id}`)}>
        consult doctor
      </button>
    </div>
  );
}

export default DoctorCard;
