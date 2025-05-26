import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./user.context.jsx";

export const DoctorContext = createContext();

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/doctor",
  withCredentials: true,
});

// todo : the project idea the capsule that that crates a capsule to take notes or comments 


export const DoctorProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  // 🔄 Update doctor profile details
  const editDoctorDetails = async ({ qualification, speciality, experience, fee }) => {
    setLoading(true);
    try {
      const response = await api.put("/edit-doctor-details", {
        qualification,
        speciality,
        experience,
        fee,
      });

      const updatedDoctor = response?.data?.data?.newdoctor;

      if (updatedDoctor) {
        setDoctor(updatedDoctor);
        console.log("✅ Doctor profile updated:", updatedDoctor);
      } else {
        console.warn("⚠️ No updated doctor data received.");
      }

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "An error occurred";
      console.error("❌ Failed to update doctor details:", message);
      return { error: message };
    } finally {
      setLoading(false);
    }
  };

  // 👨‍⚕️ Fetch all doctors
  const getAllDoctors = async () => {
    setLoading(true);
    try {
      const res = await api.get("/get-all-doctor");
      setAllDoctors(res.data?.data || []);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error("❌ Failed to fetch all doctors:", message);
    } finally {
      setLoading(false);
    }
  };

  // 👤 Fetch profile of logged-in doctor
  const getDoctorProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get("/get-doctor-info");
      const doctorData = res.data
      if (doctorData) {
        setDoctor(doctorData);
        console.log("✅ Doctor profile fetched:", doctorData);
       // console.log("this is doctor data ", doctor);// this 
       // The console.log runs before React updates the doctor state. 
       // So it still shows the previous value (in your case, null).
       {
        /*
        React state updates are asynchronous and batched.
        When you call setState (like setDoctor), React schedules the update.
        The actual update happens after the current
        function finishes running and React processes all pending updates.
        This means the state variable immediately after calling 
        setState still holds the old value until React re-renders your component.
        */
       }
      } else {
        console.warn("⚠️ Doctor profile not found.");
        setDoctor(null);
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error("❌ Error fetching doctor profile:", message);
      setDoctor(null);
    } finally {
      setLoading(false);
    }
  };

//   "data": {
//         "_id": "6830b82ba3c8e73aad3f47c5",
//         "userId": {
//             "_id": "6830b82ba3c8e73aad3f47c3",
//             "name": "sa13",
//             "username": "sa13",
//             "email": "sa13@gmail.com",
//             "phone": "1234567891",
//             "appointmentId": [],
//             "role": "doctor",
//             "bio": "No bio provided",
//             "createdAt": "2025-05-23T18:02:19.891Z",
//             "updatedAt": "2025-05-23T18:02:49.734Z",
//             "profilePicture": "https://res.cloudinary.com/ddbxsxjha/image/upload/v1748023369/rtwpvyiyehhclzz0fteh.jpg"
//         },
//         "patientId": [],
//         "qualification": "",
//         "speciality": "",
//         "experience": "",
//         "fee": "",
//         "appointment": [
//             "6830b890a3c8e73aad3f47e4",
//             "683168681fdf5665d542eeae"
//         ],
//         "createdAt": "2025-05-23T18:02:19.983Z",
//         "updatedAt": "2025-05-24T06:34:16.683Z",
//         "__v": 2
//     }
// }

  // 🔁 Fetch all doctors on component mount
  useEffect(() => {
    getAllDoctors();
  }, []);

  // ⏳ Fetch doctor profile only when user is a doctor
  useEffect(() => {
    if (user?.role === "doctor") {
      getDoctorProfile();
    }
  }, [user]); // <-- include user as dependency

  return (
    <DoctorContext.Provider
      value={{
        doctor,
        editDoctorDetails,
        getDoctorProfile,
        allDoctors,
        refreshAllDoctors: getAllDoctors,
        loading,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => useContext(DoctorContext);
