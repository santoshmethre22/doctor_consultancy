import React, { useState } from 'react';
import { useHospital } from '../../../context/hospital.contex.jsx';
import './AddHospital.css'; // Import the CSS file

function AddHospital() {
  const { addhospital, verifyHospital } = useHospital();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [verify, setVerify] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await addhospital({ name, email, location });

    if (!res || !res.data.success) {
      alert("Failed to add hospital");
      return;
    }

    alert(res.data.message);

    setVerify(true);
    setName("");
   
    setLocation("");
  };

  const handleVerify = async (e) => {
    e.preventDefault();
   const res=  await verifyHospital({ email, otp });
   if(!res?.data?.success){
      alert("res?.data?.message");
   }
   console.log("the hospital data",res?.data);
    
   setVerify();
    setOtp("");
  };

  return (
    <div className="add-hospital-container">
      <h2>Add New Hospital</h2>

      <form onSubmit={handleSubmit} className="hospital-form">
        <div className="form-group">
          <label>Hospital Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter hospital name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Add Hospital</button>
      </form>

      {verify && (
        <div className="verify-container">
          <h3>Verify Hospital</h3>
          <form onSubmit={handleVerify} className="verify-form">
            <div className="form-group">
              <label>OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
              />
            </div>
            <button type="submit" className="verify-btn">Verify</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddHospital;
