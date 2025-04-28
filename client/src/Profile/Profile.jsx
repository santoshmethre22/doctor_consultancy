import React, { useState } from "react";
import "./profile.css"; // Assuming you have a CSS file for styling
import Navbar from "../components/Home/Navbar/Navbar.jsx";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "John Doe",
    username: "johndoe123",
    email: "johndoe@example.com",
    phone: "9876543210",
    password: "password123",
    role: "patient",
    profilePicture: "https://via.placeholder.com/150",
    bio: "Passionate doctor with 10 years of experience.",
    qualification: "MBBS, MD",
    speciality: "Cardiology",
    experience: "10",
    fee: "500",
  });


  const handleChange =(e)=>{
    const {name,value}=e.target;
    setUser((prev)=>({...prev,[name]:value}));
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser((prev) => ({ ...prev, [name]: value }));
  // };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Updated User:", user);
  };

  return (

  
    <>

    <Navbar /> 
    <div className="profile-container">


      {isEditing ? (
        <form onSubmit={handleSave} className="profile-form">
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />

          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />

          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />

          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />

          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />

          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          <input
            type="text"
            name="profilePicture"
            value={user.profilePicture}
            onChange={handleChange}
            placeholder="Profile Picture URL"
          />

          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            placeholder="Bio"
            rows="3"
          />

          {user.role === "doctor" && (
            <>
              <input
                type="text"
                name="qualification"
                value={user.qualification}
                onChange={handleChange}
                placeholder="Qualification"
                required
              />

              <input
                type="text"
                name="speciality"
                value={user.speciality}
                onChange={handleChange}
                placeholder="Speciality"
                required
              />

              <input
                type="text"
                name="experience"
                value={user.experience}
                onChange={handleChange}
                placeholder="Experience"
                required
              />

              <input
                type="text"
                name="fee"
                value={user.fee}
                onChange={handleChange}
                placeholder="Consultation Fee"
                required
              />
            </>
          )}
          <div className="button-group">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" onClick={handleEditToggle} className="cancel-btn">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="profile-view">
          <img src={user.profilePicture} alt="Profile" className="profile-pic" />

          <h2>{user.name}</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Bio:</strong> {user.bio}</p>

          {user.role === "doctor" && (
            <>
              <p><strong>Qualification:</strong> {user.qualification}</p>
              <p><strong>Speciality:</strong> {user.speciality}</p>
              <p><strong>Experience:</strong> {user.experience} years</p>
              <p><strong>Consultation Fee:</strong> ₹{user.fee}</p>
            </>
          )}

          <button onClick={handleEditToggle} className="edit-btn">Edit Profile</button>
        </div>
      )}
    </div>
    </>
  );
};

export default UserProfile;
