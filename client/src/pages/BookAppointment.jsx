import React, { useState } from 'react'

import { useAppointment } from '../context/appointment.context.jsx';
import { useDoctor } from '../context/doctor.contex.jsx';


function BookAppointment() {
    
    const {bookAppointment}=useAppointment();

    const {doctor}=useDoctor();

    console.log("Doctor in book appointment from book appointment",doctor);
    
    const [time,setTime]=useState({
        date:'',
        time:''
    });


    const handleChange=(e)=>{

        setTime({
            ...time,
            [e.target.name]:e.target.value
        })
        console.log(time);
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();

        
        try {
            if(!time.date || !time.time){
                alert("Please select both date and time");
                return;
            }
            if(!doctor || !doctor._id){
                alert("No doctor selected");
                return;
            }  


            const res =await bookAppointment(time.date,time.time,doctor._id);
            if(res.success){
                alert("Appointment booked successfully");
                setTime({
                    date:'',
                    time:''
                });

            }


            
        } catch (error) {

            console.error("Error booking appointment:", error);
            alert("Failed to book appointment. Please try again later.");
            
        }



        
    }

    return (
    <div>
      <h1>Book Appointment</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">select date</label>
        <input 
        type="date"
        name='date'
        value={time.date}
        onChange={handleChange}
        />

        <label htmlFor="">select time</label>
        <input 
        type="time"
        name='time'
        value={time.time}
        onChange={handleChange}
        />
        <button type='submit'>Submit</button>
      </form>
    
    
    </div>
  )
}

export default BookAppointment
