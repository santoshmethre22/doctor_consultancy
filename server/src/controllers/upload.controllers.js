import User from "../models/user.model.js";


const uploadProfile=async()=>{
    try {

        const userId=req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
    


    } catch (error) {
        


    }
}