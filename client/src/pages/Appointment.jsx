import { useState, useEffect } from "react";
import { useAppointment } from "../context/appointment.context.jsx";
import { toast } from "react-toastify";
import { useAuth } from "../context/user.context.jsx";

const Appointment = () => {
  const { getAllDoctorAppointments, acceptAppointment, rejectAppointment } = useAppointment();
  const { user } = useAuth();

  const [allAppointments, setAllAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAllDoctorAppointments();
        setAllAppointments(data.appointments || []);
      } catch (error) {
        setError("Failed to fetch appointments.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // Handle Accept
  const handleAccept = async (appointmentId) => {
    try {
      const data = await acceptAppointment(appointmentId);
      if (data?.success) {
        toast.success("Appointment accepted");
        updateAppointmentStatus(appointmentId, "Booked");
      } else {
        toast.error(data?.message || "Failed to accept");
      }
    } catch (error) {
      toast.error("Error accepting appointment");
      console.error(error);
    }
  };

  // Handle Reject
  const handleReject = async (appointmentId) => {
    try {
      const data = await rejectAppointment(appointmentId);
      if (data?.success) {
        toast.success("Appointment rejected");
        updateAppointmentStatus(appointmentId, "rejected");
      } else {
        toast.error(data?.message || "Failed to reject");
      }
    } catch (error) {
      toast.error("Error rejecting appointment");
      console.error(error);
    }
  };

  // Update appointment status in the main list
  const updateAppointmentStatus = (id, newStatus) => {
    setAllAppointments((prev) =>
      prev.map((appo) =>
        appo._id === id ? { ...appo, status: newStatus } : appo
      )
    );
  };

  // Filtered Appointments
  const pendingAppointments = allAppointments.filter((a) => a.status === "pending");

  const todayAppointments = allAppointments.filter((a) => {
    const today = new Date();
    const appDate = new Date(a.timing);
    return (
      a.status === "Booked" &&
      appDate.getDate() === today.getDate() &&
      appDate.getMonth() === today.getMonth() &&
      appDate.getFullYear() === today.getFullYear()
    );
  });

  const pastAppointments = allAppointments.filter((a) => {
    const appDate = new Date(a.timing);
    return a.status === "Booked" && appDate < new Date();
  });

  // Loader & Error UI
  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>{error}</p>;

  // Component to render appointments
  const AppointmentList = ({ title, appointments }) => (
    <div>
      <h2>{title}</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appo) => (
          <div key={appo._id} style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
            <h3>Patient: {appo.userId.name}</h3>
            <p>Date: {new Date(appo.timing).toLocaleDateString()}</p>
            <p>Time: {new Date(appo.timing).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
            <p>Status: {appo.status}</p>
            <p>Doctor: {user?.name}</p>
            {appo.status === "pending" && (
              <>
                <button onClick={() => handleAccept(appo._id)}>Accept</button>
                <button style={{ marginLeft: "10px" }} onClick={() => handleReject(appo._id)}>Reject</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Doctor's Appointment Dashboard</h1>

      <div style={{ marginTop: "30px" }}>
        <AppointmentList title="Pending Appointments" appointments={pendingAppointments} />
        <AppointmentList title="Today's Appointments" appointments={todayAppointments} />
        <AppointmentList title="Past Appointments" appointments={pastAppointments} />
      </div>
    </div>
  );
};

export default Appointment;
