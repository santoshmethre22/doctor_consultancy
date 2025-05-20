import Hospital from "../models/hospital.model.js";


//todo : here a user can apply for the register to his hospistal 

const registerHospital=async()=>{
    try {
        const {name,email,location}=req.body
        const userId=req.user._id;

        if(!userId){
           return res.status(404).json({
                message:"please login ",
                success:false

            })
        }

        const hospital=await Hospital.create({
            name,
            email,
            location
        })


        if(!hospital){
          return  res.status(403).json({
                message:"somthing went wrong in backend",
                success:false
            })
        }

        return res.status(404).json({
            message:"hopital registered successfully",
            success:true,
            data:hospital
        })
        
    } catch (error) {
        
        return res.status(403).json({
            message:error.message,
            success:false
        })

    }

}



const getAllHospitals=async()=>{

try {
    
            const hospital=await Hospital.find()
            .populate("doctors")
    
    
            if(!hospital){
                return { message: "No hospitals found" };
            }
    
    
            res.status(200).json({
                message:" the deatils of all the hospitals are found "
            })
    
} catch (error) {
    console.error(error);
    return { message: "An error occurred while fetching hospitals", error: error.message };
}

}


const hospitalDoctor=async()=>{
 const hospitalId=req.params
        const {hospital}=await Hospital.findById(hospitalId)
        .populate("docoterId -__v")
        if(!hospital){
            return res.status(404).json({ message: "Hospital not found" });
        }

}


const updateHostpital=async()=>{
    try {


        
    } catch (error) {
        
    }



}

const getMyHospital=async()=>{

       try {
         const hospitalId=req.user._id


         const hospital=await Hospital.findById(hospitalId)
         .populate("applications")
         .populate("doctors")
         .populate("patients")


         if(!hospital){
            
         }
 
         
       } catch (error) {
        
       }

}


const postJobs=async()=>{
    try {
        
    } catch (error) {
        
    }
}

const accept=async()=>{
    try {
        
    } catch (error) {
        
    }

}

const reject =async()=>{
    try {


        
    } catch (error) {
        
    }
}



