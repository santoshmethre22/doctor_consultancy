import Appointment from "../models/appointment.model.js"; // Update path as needed
import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";


export const BookAppointMent = async (req, res) => {
  try {
    const userId = req.user._id;

    const { timing,date } = req.body;
    const doctorId = req.params.id?.trim();

    if (!date || !timing || !doctorId) {
    return res.status(400).json({ message: "Missing required fields" });
  }


    const doctor=await Doctor.findById(doctorId);

    if(!doctor){
      return res.status(400).json({ success: false, message: "Doctor not found" });
    }

    const combinedDateTime=new Date(`${date}T${timing}`);
    const start =new Date(combinedDateTime);
    const end=new Date(combinedDateTime);
     end.setMinutes(end.getMinutes() + 59);

    // Check if doctor is already booked for that time
    const isAvailable = await Appointment.findOne({
     doctorId: doctorId,
      // todo : think for date and time 
      // date: date,
      // timing: new Date(timing)
        timing: { $gte: start, $lte: end },
        status:"Booked"
    });

    if (isAvailable ) {
      return res.status(409).json({
        success: false,
        message: "Doctor is already booked at this time",
      });
    }



    const newApp = await Appointment.create({
      userId,
      doctorId,
      timing: combinedDateTime,
      status: "pending"
    });

    if (!newApp) {
      return res.status(500).json({
        success: false,
        message: "Failed to create appointment",
      });
    }
    // todo :add this appointment to the doctor and patient

    doctor.appointment.push(newApp._id);
   const patient =await User.findById(userId);

   if (!patient) {
  return res.status(404).json({ success: false, message: "Patient not found" });
}
   patient.appointmentId.push(newApp._id);

   
   await patient.save();
   await doctor.save();

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: newApp,
    });

  } catch (error) {
    console.error("Booking Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};



export const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user._id;
    const { appointmentId } = req.params;

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      userId: userId,
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found or unauthorized",
      });
    }

    appointment.status = "cancelled";
    await appointment.save();

    return res.status(200).json({
      success: true,
      message: "Appointment cancelled",
      appointment,
    });
  } 
  catch (error) {
    console.error("Cancel Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const acceptAppointment=async (req, res) => {
  
  try {

    const userId=req.user._id;
    if(!userId){
      return res.status(400).json({success:false,message:"User not found"})
    }
    const { appointmentId } = req.params;

    const doctor=await Doctor.findOne({userId:userId});
    
    if(!doctor){
      return res.status(400).json({success:false,message:"Doctor not found"})
    }

    if(!doctor.appointment.includes(appointmentId)){
      return res.status(403).json({success:false,message:"this appointment is not for you"})
    }


    const appointment = await Appointment.findOne({
      _id: appointmentId,
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.status = "Booked";
    await appointment.save();

    return res.status(200).json({
      success:true,
      message:"Appointment accepted",
      appointment,
    })
    
  } catch (error) {
    

    console.error("Accept Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }

}
export const rejectAppointment=async (req, res) => {
  try {

    const userId=req.user._id;
    const appointmentId=req.params;

   const doctor=await Doctor.findOne({userId:userId});
    
    if(!doctor){
      return res.status(400).json({success:false,message:"Doctor not found"})
    }

      if(!doctor.appointment.includes(appointmentId)){
      return res.status(403).json({success:false,message:"this appointment is not for you"})
    }


    const appointment = await Appointment.findOne({
      _id: appointmentId,
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.status = "free";
    await appointment.save();

    return res.status(200).json({
      success:true,
      message:"Appiontment is rejected by the doctor",
      appointment,
    })
    


  } catch (error) {
     console.error("Accept Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
// // todo :this method to implement at the last 
// // todo: that should be like auto delete after the time 
// // todo :this will auto 


// export const completeAppointment=async(req,res)=>{
// }



// todo :  get all the appointemnt of today

const getTodayappointment=async(req,res)=>{
    const userId=req.user._id;
    const doctor =await Doctor.findOne({userId:userId}).populate("appointment -__v")


    // method to filter all the appointment here
      const appointmens=doctor.map()


      return  res.status(200).json({

        success:true,
        message:"fetched all the appoinments of today",
        data:appointmens
      })

}

// todo :last all the appointment with user details 

const getCompletedAppointments=async(req,res)=>{



}

// todo : all the Appoint ment of the that where applied and to accepte or reject

const getAllpendingAppointments=async(req,res)=>{


  
}


// ------------------------------------------->


// todo : get all the appointmen with the doctor 