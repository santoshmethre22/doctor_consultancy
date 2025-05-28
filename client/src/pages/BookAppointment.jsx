import React, { useEffect, useState } from 'react';
import { useAppointment } from '../context/appointment.context.jsx';
import { useDoctor } from '../context/doctor.contex.jsx';
import { useNavigate, useParams } from 'react-router-dom';

function BookAppointment() {

  const navigate=useNavigate();
  const { id } = useParams();
  const { bookAppointment } = useAppointment();
  const { allDoctors } = useDoctor();

  const [doctor, setDoctor] = useState(null);
  const [time, setTime] = useState({
    date: '',
    time: ''
  });

  useEffect(() => {
    const selectDoctor = allDoctors.find((doc) => doc._id === id);
    if (selectDoctor) {
      setDoctor(selectDoctor);
      console.log("The selected doctor is", selectDoctor); // Corrected console log
    }
  }, [allDoctors, id]);

  const handleChange = (e) => {
    setTime({
      ...time,
      [e.target.name]: e.target.value
    });
    // Moved this log after the state update (optional):
    console.log({
      ...time,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!time.date || !time.time) {
        alert("Please select both date and time");
        return;
      }
      if (!doctor || !doctor._id) {
        alert("No doctor selected");
        return;
      }

      const res = await bookAppointment(time.date, time.time, doctor._id);
      console.log(res);
      if (res) {
        alert("Appointment booked successfully");
        setTime({
          date: '',
          time: ''
        });
      }
      navigate('/dashboard')
     
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again later.");
    }
  };

  if (!doctor) {
    return <div>Loading doctor info...</div>; // Optional fallback
  }

  return (
    <div>
      <h1>Book Appointment</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Select Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={time.date}
          onChange={handleChange}
        />

        <label htmlFor="time">Select Time</label>
        <input
          type="time"
          id="time"
          name="time"
          value={time.time}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BookAppointment;
