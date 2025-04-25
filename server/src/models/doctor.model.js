import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        hospitalId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Hospital"
        },

        patientId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        qualification:{
            type:String,
            required:true
        },
        speciality:{
            type:String,
            required:true
        },
        experience:{
            type:String,
            required:true
        },
        fee:{
            type:String,
            required:true
        },
        appointment:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Appointment"
        }]
},{
    timestamps:true
})

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;