import mongoose from "mongoose";


const hospitalSchema = new mongoose.Schema({
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },


    doctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    patients: [{ // renamed from 'patient'
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application"
    }],

    location: {
        type: String,
        required: true
    },
    about:{
        type:String,
    },


    blog:{
        about:{
            type:String,
        }
        ,
        vido:{
            type:String,
        }
        ,photo:{
            type:String,

        }
    }

      
});

const Hospital = mongoose.model("Hospital", hospitalSchema);
export default Hospital;
