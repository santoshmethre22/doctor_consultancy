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
    const { id } = req.params;

    const doctor=await Doctor.findOne({userId:userId});
    
    if(!doctor){
      return res.status(400).json({success:false,message:"Doctor not found"})
    }

    if(!doctor.appointment.includes(id)){
      return res.status(403).json({success:false,message:"this appointment is not for you"})
    }


    const appointment = await Appointment.findOne({
      _id: id,
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
    const id=req.params;
   const doctor=await Doctor.findOne({userId:userId});
    if(!doctor){
      return res.status(400).json({success:false,message:"Doctor not found"})
    }

      if(!doctor.appointment.includes(id)){
      return res.status(403).json({success:false,message:"this appointment is not for you"})
    }


    const appointment = await Appointment.findOne({
      _id: id,
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

// todo : get all the appointment with the doctor 

export const getAllDoctorappointments=async(req,res)=>{
  try {
      const userId = req.user._id;
      //const user =req.user;
      
      const doctor = await Doctor.findOne({ userId: userId })
      //.populate("appointment","-__v");
      
      if (!doctor) {
        return res.status(400).json({
          success: false,
          message: "Doctor not found"
        });
      }
      const appointments=await Appointment.find({doctorId:doctor._id}).populate("userId", "-__v -password");
      
      if (!appointments || appointments.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No appointments found"
        });
      }
      return res.status(200).json({
        success: true,
        message: "Fetched all appointments",
        appointments: appointments,
        doctor:doctor
      })
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// todo : get all the appointment of user 

export const getUserAppointment=async(req,res)=>{
  try {

    const userId=req.user._id;  
    const appointment=await Appointment.findOne({userId});
    if(!appication){
      return res.status(200)
      .json({
        message:"No appointments found",
        statu:false,
      })
    }

      return res.status(400)
      .json({
        message:"appointment fetched successfully",
        success:true,
        data:appointment
      })
    
  } catch (error) {

    return res.status(500)
    .json({
      message:" server error",
      success:false,

    })
    
  }
}