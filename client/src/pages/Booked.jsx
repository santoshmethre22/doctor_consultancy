import React, { useState, useEffect } from 'react';
import { useAppointment } from '../context/appointment.context.jsx';
import { useAuth } from '../context/user.context.jsx';

function Booked() {
  const { getAllUserAppointments } = useAppointment();
  const [appointments, setAppointments] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await getAllUserAppointments();
      if (!res || !res.data || res.data.length === 0) {
        console.log("No data is present");
        setAppointments([]);
      } else {
        setAppointments(res.data);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Appointment History</h2>

      {appointments.length > 0 ? (
        <div className="space-y-4">
         {appointments.map((appo) => (
  <div key={appo._id} className="border p-4 rounded shadow">
    <h3 className="text-lg font-bold">Name: {user?.name}</h3>
    <p>
      <strong>Timing:</strong>{' '}
      {new Date(appo.timing).toLocaleDateString()} at {new Date(appo.timing).toLocaleTimeString()}
    </p>
    <p>
      <strong>Doctor:</strong> {appo.doctor?.name || 'Not specified'}
    </p>
    <p>
      <strong>Status:</strong> {appo.status || 'Pending'}
    </p>
  </div>
))}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Booked;
