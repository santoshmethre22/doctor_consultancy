 import mongoose from "mongoose";

const hosipitalScheama=new mongoose.Schema({
        name:{
            type:String,
            required:true
        } ,

        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },

        doctors:[{
            
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
            
        }],


        patient:[
        {         
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
                
        }]
        , 
        
        location:{
                    type:String,
                    required:true
        }


})


const Hostpital=mongoose.model("Hospital",hosipitalScheama)
export default Hostpital;