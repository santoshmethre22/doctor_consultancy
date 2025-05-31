import Hospital from "../models/hospital.model.js";
import sendEmail from "../utils/nodemailer.js";


const addHospital=async(req,res)=>{
    try {
        const userId =req.user._id;
        const {name,email,location}=req.body();
        if(!name||!email||!location){
            return res.status(404)
            .json({
                message:"all the details required",
                success:false
            })

            const otp=Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiry=new Date(Date.now()+10 * 60 * 1000)
            

            

            const hospital= await Hospital.create({
                name,
                email,
                location,
                otp,
                otpExpiry
                    })

            if(!hospital){
                return res.status(404).json({
                    message:"hospital not created ",
                    success:false
                })            
            
            }

            await hospital.save();
            await sendEmail(email, "OTP Verification", `Your OTP is: ${otp}`)

            return res.status(200)
            .json({
                message:"registration completed ",
                success:true,
            })
        }


    } catch (error) {
        
    }

}