import User from "../models/user.model.js";
import Doctor from "../models/doctor.model.js";

const editProfile = async (req, res) => {
    try {
      const userId = req.user?._id;
  
      if (!userId) {
        return res.status(400).json({
          message: "User ID not found",
          success: false
        });
      }
  
      // Fetch the doctor with populated fields
      const doctor = await Doctor.findOne({ userId })
        .populate("userId", "-password -__v") // Populating the userId field (User details)
        .populate("hospitalId", "-__v") // Populating the hospitalId field
        .populate("patientId", "-__v"); // Populating the patientId field
  
      if (!doctor) {
        return res.status(404).json({
          message: "Doctor not found",
          success: false
        });
      }
  
      const { name, email, phone,  qualification, speciality, experience, fee } = req.body;
  
      // Update User basic fields (userId is already populated in doctor)
      if (name) doctor.userId.name = name; // Update name in user document
      if (email) doctor.userId.email = email; // Update email in user document
      if (phone) doctor.userId.phone = phone; // Update phone in user document
    //   if (password) {
    //     // Hash password if it's being updated
    //     doctor.userId.password = await bcrypt.hash(password, 10); // Assuming you're using bcrypt
    //   }
  
      // Save updated user (through doctor)
      await doctor.userId.save();
  
      // Update Doctor-specific fields
      if (qualification) doctor.qualification = qualification;
      if (speciality) doctor.speciality = speciality;
      if (experience) doctor.experience = experience;
      if (fee) doctor.fee = fee;
  
      // Save updated doctor data
      await doctor.save();
  
      res.status(200).json({
        message: "Doctor profile updated successfully",
        success: true,
        data: { user: doctor.userId, doctor }
      });
  
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({
        message: "Internal Server Error",
        success: false
      });
    }
  };
  

const getDoctorProfile=async(req,res)=>{
    try {
        const userId = req.user?._id;
      //  const doctor = await Doctor.findOne({ userId }).populate("userId", "-password -__v").populate("hospitalId", "-__v").populate("patientId", "-__v");

      const doctor =await Doctor.findOne({userId}).populate("userId", "-password -__v").populate("hospitalId", "-__v").populate("patientId", "-__v")
      if (!doctor) {
        return res.status(404).json({
          message: "Doctor not found",
          success: false
        });
      }

        res.status(200).json({
            message:"Doctor profile fetched successfully",
            success:true,
            data:doctor
        })

    } catch (error) {

        console.error("Error fetching doctor profile:", error);
        res.status(500).json({
            message:"Internal Server Error",
            success:false
        })
        
    }
    
}

export { 
    
    editProfile, 
    getDoctorProfile 

 };