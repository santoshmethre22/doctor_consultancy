import mongoose from "mongoose";


const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
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
});

const Hospital = mongoose.model("Hospital", hospitalSchema);
export default Hospital;
