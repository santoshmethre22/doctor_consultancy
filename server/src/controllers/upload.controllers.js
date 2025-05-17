import User from "../models/user.model.js";


const uploadProfile=async()=>{
    try {

        const userId=req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

         const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

         const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    
   // const user = await User.create({
    //     fullName,
    //     avatar: avatar.url,
    //     coverImage: coverImage?.url || "",
    //     email, 
    //     password,
    //     username: username.toLowerCase()
    // })

    } catch (error) {
        


    }
}


// file upload for the patient aswell as the doctor--------------


const uploadFile=async(req,res)=>{



}