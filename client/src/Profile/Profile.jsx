import React, { useState } from "react";
import "./profile.css";
import Navbar from "../components/Home/Navbar/Navbar.jsx";
import { useAuth } from "../context/user.context.jsx";
import { useDoctor } from "../context/doctor.contex.jsx";

const UserProfile = () => {
  const { logout, user } = useAuth();
  const { doctor, editDoctorDetails } = useDoctor();

  // State management
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingDoctor, setEditingDoctor] = useState(false);

  // file upload state
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [doctorDetails, setDoctorDetails] = useState({
    qualification: doctor?.qualification || "",
    speciality: doctor?.speciality || "",
    experience: doctor?.experience || "",
    fee: doctor?.fee || "",
  });

  const [userDetails, setUserDetails] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "patient",
    bio: user?.bio || "",
    profilePicture: user?.profilePicture || ""
  });

  const handleChangeDoctor = (e) => {
    const { name, value } = e.target;
    setDoctorDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setEditingDoctor(false);
  };

  const toggleEditDoctor = () => {
    setEditingDoctor(!isEditingDoctor);
    setIsEditing(false);
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Updated User:", userDetails);
    // Optionally send updated userDetails to backend
  };

  const handleSaveDoctor = async (e) => {
    e.preventDefault();
    try {
      await editDoctorDetails(doctorDetails);
      setEditingDoctor(false);
      console.log("Doctor profile updated");
    } catch (error) {
      console.error("Failed to update doctor details:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    console.log("The user logged out");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // base64 preview
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");

    const formData = new FormData();
    formData.append("profile", file); // key name must match backend

    try {
      // add here the method to uplaod the image 

     // const data = await res.json();

      // if (res.ok) {
      //   setUserDetails(prev => ({
      //     ...prev,
      //     profilePicture: data.imageUrl,
      //   }));
        alert("Upload successful!");
      // } else {
      // //   alert("Upload failed: " + data.message);
      // }
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">

        {/* Edit User Form */}
        {isEditing && (
          <form onSubmit={handleSaveUser} className="profile-form">
            <h2>Edit Profile</h2>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChangeUser}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChangeUser}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={userDetails.phone}
                onChange={handleChangeUser}
                required
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={userDetails.bio}
                onChange={handleChangeUser}
                rows="3"
              />
            </div>
            <div className="button-group">
              <button type="submit" className="btn save-btn">Save</button>
              <button type="button" onClick={toggleEdit} className="btn cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Edit Doctor Form */}
        {isEditingDoctor && (
          <form onSubmit={handleSaveDoctor} className="profile-form">
            <h2>Edit Doctor Details</h2>
            <div className="form-group">
              <label>Qualification</label>
              <input
                type="text"
                name="qualification"
                value={doctorDetails.qualification}
                onChange={handleChangeDoctor}
                required
              />
            </div>
            <div className="form-group">
              <label>Experience</label>
              <input
                type="text"
                name="experience"
                value={doctorDetails.experience}
                onChange={handleChangeDoctor}
                required
              />
            </div>
            <div className="form-group">
              <label>Fee</label>
              <input
                type="text"
                name="fee"
                value={doctorDetails.fee}
                onChange={handleChangeDoctor}
                required
              />
            </div>
            <div className="form-group">
              <label>Speciality</label>
              <input
                type="text"
                name="speciality"
                value={doctorDetails.speciality}
                onChange={handleChangeDoctor}
                required
              />
            </div>
            <div className="button-group">
              <button type="submit" className="btn save-btn">Save</button>
              <button type="button" onClick={toggleEditDoctor} className="btn cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Profile View */}
        {!isEditing && !isEditingDoctor && (
          <div className="profile-view">
            <div className="profile-header">
              {userDetails.profilePicture && (
                <img src={userDetails.profilePicture} alt="Profile" className="profile-pic" />
              )}

              <div style={{ marginTop: "1rem" }}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginTop: "0.5rem",
                    }}
                  />
                )}
                <button onClick={handleUpload} className="btn upload-btn">
                  Upload
                </button>
              </div>

              <h2>{userDetails.name}</h2>
              <p className="role-badge">{userDetails.role}</p>
            </div>

            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">Username:</span>
                <span className="detail-value">{userDetails.username}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{userDetails.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{userDetails.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Bio:</span>
                <span className="detail-value">{userDetails.bio}</span>
              </div>

              {userDetails.role === "doctor" && (
                <div className="doctor-details">
                  <h3>Professional Information</h3>
                  <div className="detail-item">
                    <span className="detail-label">Qualification:</span>
                    <span className="detail-value">{doctorDetails.qualification}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Experience:</span>
                    <span className="detail-value">{doctorDetails.experience}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Fee:</span>
                    <span className="detail-value">{doctorDetails.fee}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Speciality:</span>
                    <span className="detail-value">{doctorDetails.speciality}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="button-group">
              <button onClick={toggleEdit} className="btn edit-btn">
                Edit Profile
              </button>
              {userDetails.role === "doctor" && (
                <button onClick={toggleEditDoctor} className="btn edit-btn">
                  Edit Professional Details
                </button>
              )}
              <button onClick={handleLogout} className="btn logout-btn">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
