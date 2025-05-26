import { useState, useEffect } from "react";
import { useDoctor } from "../context/doctor.contex.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useAppointment } from "../context/appointment.context.jsx";
import { useAuth } from "../context/user.context.jsx";

const Appointment = () => {
  const {user}=useAuth();
 // const { allDoctors } = useDoctor(); 
 // const [doctor, setDoctor] = useState(null);
  
  const {doctor}=useDoctor();
  const navigate = useNavigate();
  const { bookAppointment } = useAppointment();
  const [pending,setPending]=useState([]);
  const [completed,setCompleted]=useState([]);
  const [today,setToday]=useState([]);
  const [allAppointments,setAllAppointments]=useState([]);

  
const handlePendingAppointments=async()=>{
  try {


    
  } 
  catch (error) {
    

  }
}

const handleCompletedAppointments=async()=>{
  try {


    
  } catch (error) {


    
  }


}

const handleTodayAppointments=async()=>{

  try {



  } catch (error) {




  }

}

     


  return (

    <div>
      <h1>Hello world</h1>

      {
        pending.length > 0 ? (
          <h1>Pending appointments</h1>
        ) : (
          <h1>No pending appointments</h1>
        )

      }

    <button onClick={handlePendingAppointments}>getpending appointment</button>
    <button> all appointment completed </button>
    <button>today appointment</button>
    <button></button>
    </div>
  )
};

export default Appointment;
