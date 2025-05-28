import React, { useState } from 'react'
import { useAppointment } from '../context/appointment.context';
import { useEffect } from 'react';

function Booked() {

    const {getAllUserAppointments}=useAppointment();
    const [appointments,setAppointments]=useState({});


    useEffect(()=>{

        const fetchAppointments=async()=>{
          const res =await getAllUserAppointments(); 
          if(!res){
            console.log("no data is present");
          }
          setAppointments(res.data);
        }
        fetchAppointments();
    },[])

  return (
    <div>
      your history
      {
        appointments.length >0?(
            <div>

              {
                appointments.map((appo)=>{

                  
                })
              }

            </div>
        ):(
          <p> not data is there </p>
        )
      }
    </div>
  )
}

export default Booked
