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


  const getAllUserAppointments = async () => {
    try {
      // Implement logic
      const res=await api.get("/get-user-appointment")
      if(!res.data.success){
        return false;
      }
      return res.data;
    } catch (error) {
      console.error("Error getting all appointments:", error);
    }
  };

  
  const cancelAppointment = async (id) => {
   
  };


  const acceptAppointment = async (id) => {
    try {
      // Implement logic
      const res=await api.patch(`/accept-appointment/${id}`);
      if(!res.data.success){
        toast.error(res.data.message || "Failed to accept appointment");
        return false;
      }


     return res.data;

    } catch (error) {
      console.error("Error accepting appointment:", error);
    }
  };

  const rejectAppointment = async () => {
    try {
      // Implement logic
      const res=await api.post(`/reject-appointment/${id}`);
      if(!res.data.success){
        toast.error(res.data.message || "Failed to cancel appointment");
        return false;
      }
      return  res.data;
    
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  const getAllDoctorAppointments = async (id) => {
    try {
      const res=await api.get("/get-all-appointments")
    
        console.log(res);
        return res.data;
    //  return res.data.app
    } catch (error) {
      
    }

  }


  return (
    <AppointmentContext.Provider
      value={{
        
        bookAppointment,
        getAllUserAppointments,
        cancelAppointment,
        // todo : all these for these doctor
        acceptAppointment,
        rejectAppointment,

        // todo : ---------------------->
      
        // ----------------------->
        getAllDoctorAppointments

      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => useContext(AppointmentContext);
