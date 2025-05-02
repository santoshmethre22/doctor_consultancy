import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
     
    },

    patientId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // reference to patients
      }
    ],

    qualification: {
      type: String,
     
    },

    speciality: {
      type: String,
      
    },

    experience: {
      type: String,
     
    },

    fee: {
      type: String,
      
    },

    appointment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      }
    ],
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
