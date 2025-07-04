import Hospital from "../models/hospital.model.js";
import User from "../models/user.model.js";
import sendEmail from "../utils/nodemailer.js";

const addHospital = async (req, res) => {
    try {
        const userId = req.user._id; // You might want to use this later for access control or reference
        const { name, email, location } = req.body;
        const user=await User.findById(userId);
        

        if (!name || !email || !location) {
            return res.status(400).json({
                message: "All the details (name, email, location) are required.",
                success: false,
            });
        }

        // Check if hospital with this email already exists
        //-------------------------------------------------------------------------------->
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        const existingHospital = await Hospital.findOne({ email });
        if (existingHospital) {
           existingHospital.otp=otp;
           existingHospital.otpExpiry=otpExpiry
           await existingHospital.save();
        }
        else { 
            const hospital = await Hospital.create({
                name,
                email,
                location,
                otp,
                otpExpiry,
            });
         user.hospital=hospital._id;
         await user.save();
        }
        await sendEmail(email, "OTP Verification", `Your OTP is: ${otp}`);
        return res.status(200).json({
            message: "Hospital created and OTP sent successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error in addHospital:", error.message);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
        });
    }
};



const verifyHospital = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const hospital = await Hospital.findOne({ email });

    if (!hospital) {
      return res.status(400).json({
        message: "Hospital not found",
        success: false,
      });
    }

    // Check if OTP is valid and not expired
    if (hospital.otp !== otp || hospital.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
        success: false,
      });
    }

    // Mark as verified and clear OTP data
    hospital.isVerified = true;
    hospital.otp = null;
    hospital.otpExpiry = null;

    await hospital.save();

    return res.status(200).json({
      message: "Email verified successfully",
      data: hospital,
      success: true,
    });

  } catch (error) {
    console.error("Server error during hospital verification:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


export  {
    
    addHospital,
    verifyHospital

};
