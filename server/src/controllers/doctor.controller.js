import User from "../models/user.model.js";
import Doctor from "../models/doctor.model.js";
import Hospital from "../models/hospital.model.js";
import Application from "../models/application.model.js";

const editDoctorDetails = async (req, res) => {
  try {
    const role = req.user?.role;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({
        message: "User ID not found",
        success: false,
      });
    }

    if (role !== "doctor") {
      return res.status(403).json({
        message: "You are not authorized to edit doctor details",
        success: false,
      });
    }

    // Find doctor based on logged-in user
    const doctor = await Doctor.findOne({ userId }).populate("userId");

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
        success: false,
      });
    }

    const { qualification, speciality, experience, fee } = req.body;

    // Update Doctor-specific fields
    if (qualification !== undefined) doctor.qualification = qualification;
    if (speciality !== undefined) doctor.speciality = speciality;
    if (experience !== undefined) doctor.experience = experience;
    if (fee !== undefined) doctor.fee = fee;

    // Save updated doctor data
    const newdoctor=await doctor.save();

    res.status(200).json({
      message: "Doctor profile updated successfully",
      success: true,
      data: {
        newdoctor,
      },
    });

  } catch (error) {
    console.error("Error updating doctor profile:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

  


const getAllDoctors =async(req,res)=>{
  try { 
    const doctors=await Doctor.find().populate("userId","-__v -password")
    .populate("hospitalId","-__v")
    .populate("patientId","-__v");
    if (!doctors) {
      return res.status(404).json({
        message: "Doctors not found",
        success: false
      });
    }

    console.log(doctors.data);
    res.status(200).json({
      message:"Doctors fetched successfully",
      success:true,
      data:doctors

    })

    
  } catch (error) {

    console.error("Error fetching doctors:", error);
    res.status(500).json({
      message:"Internal Server Error",
      success:false
    })

  }

}


const getDoctorHistroy=async(req,res)=>{
  try {
    
      const doctorId =req.user?._id;
      const doctor =await Doctor.findById(doctorId)
      if(!doctor) {
        return res.status(404).json({
          message: "Doctor not found",
          success: false
        });
      }

      const patients =await doctor.populate("patientId","-__v")
      if(!patients) {
        return res.status(404).json({
          message: "Patients not found",
          success: false
        });
      } 

      res.status(200).json({
        message:"Patients fetched successfully",
        success:true,
        data:patients
      })



  } catch (error) {
    console.error("Error fetching doctor history:", error);
    res.status(500).json({
      message:"Internal Server Error",
      success:false
    })
  }

}


const getCurrentDoctor = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({
        message: "User ID missing from request",
        success: false,
      });
    }

    const doctor = await Doctor.findOne({ userId })
      .populate("userId", "-__v -password")
      .populate("hospitalId", "-__v")
      .populate("patientId", "-__v");

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Doctor fetched successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};





export { 
  editDoctorDetails, 
  getAllDoctors,
  getDoctorHistroy,
  getCurrentDoctor,

 };