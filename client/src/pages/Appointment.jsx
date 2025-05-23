import React, { useState, useEffect } from "react";
import { useDoctor } from "../context/doctor.contex.jsx";
import { useParams } from "react-router-dom";

const AppointmentFormCard = () => {
  const { allDoctors } = useDoctor();
  const [doctor, setDoctor] = useState(null); // null to indicate "not loaded yet"
  const { id } = useParams();

  useEffect(() => {
    if (allDoctors && id) {
      const doctorData = allDoctors.find((doc) => doc.userId._id === id);
      setDoctor(doctorData || null);
    }
  }, [allDoctors, id]);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.time) {
      alert("Please select both date and time.");
      return;
    }
    alert(
      `Appointment booked with ${doctor?.userId?.name} on ${formData.date} at ${formData.time}`
    );
    setFormData({ date: "", time: "" }); // reset form
  };

  if (!doctor) {
    return <p className="text-center mt-10">Loading doctor details...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-6 border p-5 rounded-xl shadow bg-white">
      <h2 className="text-xl font-semibold mb-1">{doctor.userId?.name}</h2>
      <p className="text-sm text-gray-600 mb-4">{doctor.speciality || "N/A"}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Select Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Select Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentFormCard;
