import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./user.context.jsx";

export const DoctorContext = createContext();

const api = axios.create({
  baseURL: "/api", // Let Vite proxy handle the rest
  withCredentials: true
});


export const DoctorProvider = ({ children }) => {
    const [doctor, setDoctor] = useState(null);
    const [allDoctors, setAllDoctors] = useState([]);
    const [loading, setLoading] = useState(false); // Optional: for loading state

    const { user } = useAuth();

    const editDoctorDetails = async ({ qualification, speciality, experience, fee }) => {
        try {
            setLoading(true);  // Set loading to true when making an API call

            const response = await api.put("/v1/doctor/edit-doctor-details", {
                qualification,
                speciality,
                experience,
                fee,
            });

            const updatedUser = response?.data?.data?.newdoctor;


            if (updatedUser) {
                setDoctor(updatedUser); // Update local state
                console.log("Doctor profile updated:", updatedUser);
            } else {
                console.warn("No updated user data received.");
            }


            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message || "An error occurred";
            console.error("Failed to update doctor details:", message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const getAllDoctors = async () => {
        try {
            setLoading(true);  // Set loading to true when making an API call

            const res = await api.get("/v1/doctor/get-all-doctor");
            setAllDoctors(res.data.data);  // Set correct response data
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoading(false);  // Reset loading state
        }
    };

    const getDoctorProfile = async () => {
        try {
            setLoading(true);  // Set loading to true when making an API call

            const res = await api.get('/v1/doctor/get-doctor-info');
            setDoctor(res.data.user);
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoading(false);  // Reset loading state
        }
    };

    useEffect(() => {
        getAllDoctors();  // Fetch all doctors when component mounts
    }, []);

    useEffect(() => {
        if (user?.role === "doctor") {
            getDoctorProfile();  // Fetch doctor profile if user is a doctor
        }
    }, [user]);

    return (
        <DoctorContext.Provider value={{ doctor, editDoctorDetails, getDoctorProfile, allDoctors, loading }}>
            {children}
        </DoctorContext.Provider>
    );
};

export const useDoctor = () => useContext(DoctorContext);
