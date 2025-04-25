import React, { useState } from 'react'
import "./Dashboard.css"
import Navbar from '../Home/Navbar/Navbar.jsx'
import Footer from '../Home/Footer/Footer.jsx'
function Dashboard() {
  

  // const [doctor,setDoctor]=useState();
  // const [hostpital,setHospital]=useState();
  // cont [location,setLocation]=useState();


  return (
    <div>
      <Navbar/>
      <h1>Dashboard</h1>
      hello i m dashboard
      <Footer/>
    </div>
  )
}

export default Dashboard



/*import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Dashboard.css";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/hospitals");
        setHospitals(res.data);
        setFilteredHospitals(res.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = hospitals.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHospitals(filtered);
  }, [searchTerm, hospitals]);

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Find Hospitals & Doctors</h1>
        <input
          type="text"
          placeholder="Search by name, speciality or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <div className="cards-container">
          {filteredHospitals.map((hospital) => (
            <div className="card" key={hospital._id}>
              <h3>{hospital.name}</h3>
              <p><strong>Speciality:</strong> {hospital.speciality}</p>
              <p><strong>Location:</strong> {hospital.location}</p>
              <p><strong>Contact:</strong> {hospital.contact}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
 */

