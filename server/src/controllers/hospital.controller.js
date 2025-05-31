import Hospital from "../models/hospital.model.js";
import sendEmail from "../utils/nodemailer.js";

const addHospital = async (req, res) => {
    try {
        const userId = req.user._id; // You might want to use this later for access control or reference
        const { name, email, location } = req.body;

        if (!name || !email || !location) {
            return res.status(400).json({
                message: "All the details (name, email, location) are required.",
                success: false,
            });
        }

        // Check if hospital with this email already exists
        const existingHospital = await Hospital.findOne({ email });
        if (existingHospital) {
            return res.status(400).json({
                message: "A hospital with this email already exists.",
                success: false,
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        const hospital = await Hospital.create({
            name,
            email,
            location,
            otp,
            otpExpiry,
        });

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

const verify=async(req,res)=>{
    try {
    const { email, otp } = req.body;
    const hospital = await Hospital.findOne({ email });

  if (!hospital) {
    return res.status(400).json({ message: "Hospital not found" });
  }

  if (hospital.otp !== otp || hospital.otpExpiry < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  hospital.isVerified = true;
  hospital.otp = null;
  hospital.otpExpiry = null;
  await hospital.save();
  res.json({ message: "Email verified successfully" });
        

    } catch (error) {
            return res.status(404)
            .json({
                message:"not verified",
                success:false
            })

    }
}

export  {
    
    addHospital,
    verify

};
