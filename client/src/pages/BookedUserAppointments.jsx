import React, { useState, useEffect } from 'react';
import { useAppointment } from '../context/appointment.context.jsx';
import { useAuth } from '../context/user.context.jsx';
import './Booked.css'; // Import CSS

function Booked() {
  const { getAllUserAppointments, cancelAppointment } = useAppointment();
  const [appointments, setAppointments] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      const res = await getAllUserAppointments();
      if (!res || !res.data || res.data.length === 0) {
        setAppointments([]);
      } else {
        setAppointments(res.data);
      }
      setLoading(false);

    
    };
    fetchAppointments();
  }, []);

  useEffect(()=>{
    console.log("the appointments ",appointments);
  },[appointments]);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this appointment?');
    if (!confirmCancel) return;

    try {
      const res = await cancelAppointment(id);
      if (!res?.data?.success) {
        alert('Unable to cancel appointment.');
        return;
      }
      alert('Appointment successfully cancelled.');
      setAppointments((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      console.log('Error canceling appointment:', error);
    }
  };

  return (
    <div className="booked-container">
      <h2 className="booked-title">Your Appointment History</h2>

      {loading ? (
        <p className="booked-loading">Loading appointments...</p>
      ) : appointments.length > 0 ? (
        <div className="appointments-grid">
          {appointments.map((appo) => {
            const isUpcoming = new Date(appo.timing).getTime() > Date.now();
            return (
              <div key={appo._id} className="appointment-card">
                <h3 className="appointment-user">Name: {user?.name}</h3>
                <p><strong>Timing:</strong> {new Date(appo.timing).toLocaleDateString()} at {new Date(appo.timing).toLocaleTimeString()}</p>
                <p><strong>Doctor:</strong> {appo.doctor?.name || 'Not specified'}</p>
                <p><strong>Status:</strong> <span className={`status ${appo.status === 'Confirmed' ? 'confirmed' : 'pending'}`}>{appo.status || 'Pending'}</span></p>

                {isUpcoming ? (
                  <button className="cancel-button" onClick={() => handleCancel(appo._id)}>Cancel Appointment</button>
                ) : (
                  <p className="cannot-cancel">You cannot cancel past appointments.</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="booked-empty">No appointments found.</p>
      )}
    </div>
  );
}

export default Booked;
