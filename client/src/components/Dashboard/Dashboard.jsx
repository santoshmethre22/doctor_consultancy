import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Navbar from '../Home/Navbar/Navbar.jsx';
import Footer from '../Home/Footer/Footer.jsx';
import { useDoctor } from '../../context/doctor.contex.jsx';
import DoctorCard from '../Doctor/DoctorCard.jsx';

function Dashboard() {
  const { allDoctors } = useDoctor();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('doctor'); // 'doctor' or 'hospital'
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    if (!Array.isArray(allDoctors)) return;

    const lowerSearchTerm = searchTerm.toLowerCase();

    const filtered = allDoctors.filter((doctor) => {
      const doctorName = doctor?.userId?.name?.toLowerCase() || '';
      const hospitalName = doctor?.hospitalName?.toLowerCase() || '';

      if (searchType === 'doctor') {
        return doctorName.includes(lowerSearchTerm);
      } else if (searchType === 'hospital') {
        return hospitalName.includes(lowerSearchTerm);
      }
      return false;
    });

    setFilteredDoctors(searchTerm === '' ? allDoctors : filtered);
  }, [allDoctors, searchTerm, searchType]);

  return (
    <div>
      <Navbar />
      <h1 className="text-center text-3xl font-semibold mt-6">Dashboard</h1>

      {/* Search & Filters */}
      <div className="search-container mt-4 mb-6 flex flex-col items-center gap-3">
        <input
          type="text"
          placeholder={`Search by ${searchType === 'doctor' ? 'Doctor' : 'Hospital'} Name`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input px-4 py-2 border rounded w-3/4 sm:w-1/2"
        />

        {/* Radio Buttons */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="doctor"
              checked={searchType === 'doctor'}
              onChange={() => setSearchType('doctor')}
            />
            Doctor
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="hospital"
              checked={searchType === 'hospital'}
              onChange={() => setSearchType('hospital')}
            />
            Hospital
          </label>
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <DoctorCard key={index} {...doctor} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No doctors found for the search term.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
