import { useState, useEffect } from "react";
import { useAppointment } from "../context/appointment.context.jsx";
import { toast } from "react-toastify";

const Appointment = () => {

  // todo :here all the context 
  const { getAllDoctorAppointments,acceptAppointment , rejectAppointment} = useAppointment();


  // todo :  all the usestates

  const [allAppointments, setAllAppointments] = useState([]);
  const [pending, setPending] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAllDoctorAppointments();
        setAllAppointments(data.appointments);
        setDoctor(data.doctor);
      } catch (error) {
        setError("Failed to fetch appointments.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Filter Functions
  const handlePendingAppointments = () => {
    const filtered = allAppointments.filter((appo) => appo.status === "pending");
    setPending(filtered);
  };



  const handleTodayAppointments = () => {
    const today = new Date();
    const filtered = allAppointments.filter((appo) => {
      const appDate = new Date(appo.timing);
      return (
        appDate.getDate() === today.getDate() &&
        appDate.getMonth() === today.getMonth() &&
        appDate.getFullYear() === today.getFullYear() &&
        appo.status === "Booked"
      );
    });
    setTodayAppointments(filtered);
  };

  const handlePastAppointments = () => {
    const now = new Date();
    const filtered = allAppointments.filter((appo) => {
      const appDate = new Date(appo.timing);
      return appDate < now && appo.status === "Booked";
    });
    setPastAppointments(filtered);
  };

  // Loader & Error UI
  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>{error}</p>;

  // Component to render a list of appointments
  const AppointmentList = ({ title, appointments }) => (
    <div>
      <h2>{title}</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appo) => (
          <div key={appo._id} style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
            <h3>{`Patient: ${appo.userId.name}`}</h3>
            <p>{`Date: ${new Date(appo.timing).toLocaleDateString()}`}</p>
            <p>{`Time: ${new Date(appo.timing).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</p>
            <p>{`Status: ${appo.status}`}</p>
            <p>{`Doctor: ${doctor.name}`}</p>


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



  // todo : handle accept and reject  here 

  const handleAccept = async (appointmentId) => {
      try {
        const data = await acceptAppointment(appointmentId);
        if(!data) {
          toast.error("Failed to accept appointment");
          return;
        }
        if (data?.success) {
          toast.success("Appointment accepted successfully");
        } else {
          toast.error(data?.message || "Failed to accept appointment");
          return;
        }
      } catch (error) {
        console.error("Error accepting appointment:", error);
        toast.error("Error accepting appointment");
      }
  }

  const handleReject =async(appointmentId)=>{
   try {
      const data =await rejectAppointment(appointmentId);
      if(!data) {
        toast.error("Failed to reject appointment");
        return;
      }
    
   } catch (error) {
     console.error("Error rejecting appointment:", error);
     toast.error("Error rejecting appointment");
   }
  }


  return (
    <div style={{ padding: "20px" }}>
      <h1>Doctor's Appointment Dashboard</h1>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePendingAppointments}>Show Pending Appointments</button>
        
        <button onClick={handleTodayAppointments} style={{ marginLeft: "10px" }}>
          Show Today's Appointments
        </button>
        
        <button onClick={handlePastAppointments} style={{ marginLeft: "10px" }}>
          Show Past Appointments
        </button>
      </div>

      {/* Appointments Display */}
      <div style={{ marginTop: "30px" }}>
        {pending.length > 0 && <AppointmentList title="Pending Appointments" appointments={pending} />}
        {todayAppointments.length > 0 && <AppointmentList title="Today's Appointments" appointments={todayAppointments} />}
        {pastAppointments.length > 0 && <AppointmentList title="Past Appointments" appointments={pastAppointments} />}
      </div>
    </div>
  );
};

export default Appointment;
