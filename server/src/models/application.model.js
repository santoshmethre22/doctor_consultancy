import mongoose from "mongoose";
//import Hostpital from "./hospital.model.js";

const applicationSchema=new mongoose.Schema({

    hospitalId:{
       // type:mongoo
       type:mongoose.Schema.Types.ObjectId,
       ref:"Hospital"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    DoctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
    },
    status:{
        //type:enum[], applied ,accepted ,rejected 
    },
    resume:{
        type:String,  
        require:true
    },
    

},{
    timestamps:true,
})

const Application=mongoose.model("Application",applicationSchema);
export default Application;