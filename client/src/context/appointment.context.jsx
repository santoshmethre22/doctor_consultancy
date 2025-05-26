import axios from "axios";
import { createContext, useContext } from "react";
import { toast } from "react-toastify";

export const AppointmentContext = createContext();



const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/appointment",
  withCredentials: true,
});

// ----------------------------------------------------------------------------------------
export const AppointmentProvider = ({ children }) => {
  
  //const [pending,setPending]=useState(null);


const bookAppointment = async (date, time, id) => {
  try {
    const res = await api.post(`/book-appointment/${id}`, {
      date,
      timing: time, // Make sure your backend expects "timing". Change to "time" if needed.
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.success) {
      toast.success("Appointment booked successfully");
      return true;
    } else {
      toast.error(res.data.message || "Failed to book appointment");
      return false;
    }
  } catch (error) {
    console.error("Error booking appointment:", error);
    toast.error(error.response?.data?.message || "Error booking appointment");
    return false;
  }
};

// toast.success("Success message");
// toast.error("Error message");
// toast.warning("Warning message");
// toast.info("Info message");

  const getAllAppointments = async () => {
    try {
      // Implement logic
    } catch (error) {
      console.error("Error getting all appointments:", error);
    }
  };

  const cancelAppointment = async () => {
    try {
      // Implement logic
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  const acceptAppointment = async () => {
    try {
      // Implement logic
    } catch (error) {
      console.error("Error accepting appointment:", error);
    }
  };

  const rejectAppointment = async () => {
    try {
      // Implement logic
    } catch (error) {
      console.error("Error rejecting appointment:", error);
    }
  };

  const getTodayAppointments = async () => {
    try {
      // Implement logic
    } catch (error) {
      console.error("Error fetching today’s appointments:", error);
    }
  };

  const getCompletedAppointments = async () => {
    try {
      // Implement logic
    } catch (error) {
      console.error("Error fetching completed appointments:", error);
    }
  };


   // todo  :get pending appointments
const getAllPendingAppointments=async(id)=>
  {
    try {
        const res=await api.get(`/pending-appointments/${id}`)

        if(!res.data.success){
         toast.error(res.data.message || "Failed to fetch pending appointments");

        } 
       // setPending(res.data)

       return res.data;

    } catch (error) {


      
    }

  }


  return (
    <AppointmentContext.Provider
      value={{
        getAllAppointments,
        bookAppointment,
        cancelAppointment,
        acceptAppointment,
        rejectAppointment,
        getTodayAppointments,
        getCompletedAppointments,
        getAllPendingAppointments,

      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => useContext(AppointmentContext);
