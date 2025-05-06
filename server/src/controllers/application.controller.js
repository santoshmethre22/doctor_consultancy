import mongoose from "mongoose";

import Application from "../models/application.model.js";
import Doctor from "../models/doctor.model.js";
import Hospital from "../models/hospital.model.js";




const applyForpost=async(req,res)=>{

   try {
     const userId=req.user._id;
   
     const hospitalId=req.params;
     
     const doctor=await Doctor.findById(userId);
    // const Hostpital=
 
 
    const hospital=await Hospital.findById(hospitalId)
     
    if(!hospital){
        return res.status(404).json({
            message:"Hospital not found",
            success:false
         })
     }
 
 
     if(!doctor){
   
       return res.status(404).json({
         message:"Doctor not found",
         success:false
       })
   
   
     }
   
       if(doctor.hospitalId===hospitalId){
       // error here 
       return res.status(400).json({
         message:"You are already applied for this hospital",
         success:false
       })
   
       }
   

       
       const application=Application.create({
           
             hospitalId:hospitalId,
             doctorId:doctor._id,
             userId:userId,
             // add the resume here
             status:"applied",
 
       })
 
     const newApplication=  application.save()

        return  res.status(200).json({
            message:"Application submitted successfully",
            success:true,
            data:newApplication
         })
       
   
   } catch (error) {
     console.error("Error applying for post:", error);
   return  res.status(500).json({
       message:"Internal Server Error",
       success:false
     })
    
   }
  
  
  }



const acceptApplication=async(req,res)=>{

   try {
     const hospitalId=req.body.user._id;
 
     const applicationId=req.query.applicationId;
     
 
     const application=Application.findById(applicationId)
 
     application.status="accepted";
     application.save();
 
     return res.status(200).json({
       message:"the application is accepted",
       data:application,
       success:true
     })
   } catch (error) {

    return res.status(500).json({
        message:"Internal Server Error",
        success:false
      })
    
   }

}


const rejectApplication=async(req,res)=>{

    try {
      const hospitalId=req.body.user._id;
  
      const applicationId=req.query.applicationId;
      
  
      const application=Application.findById(applicationId) 
      
      application.status="rejected";
      application.save();

      return res.status(200).json({
        message:"the application is rejected",
        data:application,
        success:true
      })

    } catch (error) {

      return res.status(500).json({
          message:"Internal Server Error",
          success:false
        })

    }

}



export{
    applyForpost,
    acceptApplication,
    rejectApplication
}