 import mongoose from "mongoose";
import Application from "./application.model";

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
        
        
        applications:[{
            
            type:mongoose.Schema.Types.ObjectId,
            ref:"Application"
            
        }],
        
        location:{
                    type:String,
                    required:true
        },

})






const Hospital=mongoose.model("Hospital",hosipitalScheama)
export default Hospital;