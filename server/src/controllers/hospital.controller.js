import Hospital from "../models/hospital.model.js";


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