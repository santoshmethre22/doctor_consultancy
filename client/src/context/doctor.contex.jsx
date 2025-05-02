import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./user.context.jsx";

export const DoctorContext = createContext();

const api = axios.create({
    withCredentials: true
});

export const DoctorProvider = ({ children }) => {
    const [doctor, setDoctor] = useState(null);
    const [allDoctors,setAllDoctors] = useState(null);



    const { user } = useAuth();

    const editDoctorDetails = async ({ qualification, speciality, experience, fee }) => {
        try {
            // Optionally set loading state here
            // setLoading(true);
    
            const response = await api.put("/api/v1/doctor/edit-doctor-details", {
                qualification,
                speciality,
                experience,
                fee,
            });
    
            const updatedUser = response?.data?.data?.newdoctor;
            if (updatedUser) {
                setDoctor(updatedUser); // Update local state
                console.log("Doctor profile updated:", updatedUser);
                // Optionally show a success toast/message here
            } else {
                console.warn("No updated user data received.");
            }
    
        } catch (error) {
            const message = error.response?.data?.message || error.message || "An error occurred";
            console.error("Failed to update doctor details:", message);
            // Optionally show error toast/message here
        } finally {
            // setLoading(false); // Reset loading state
        }
    };

    const getAllDoctors=async()=>{
        try {
            const res=await api.get("/api/v1/doctor/get-all-doctor");
            console.log(res.data.data);
            setAllDoctors(res.data);

        } catch (error) {
            console.log(error.response?.data || error.message);

            
        }

    }
      
    
    const getDoctorProfile = async () => {
        try {
            const res = await api.get("/api/v1/doctor/get-doctor-info");
            console.log(res.data.user);
            setDoctor(res.data.user);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    useEffect(()=>{
        let isMounted=true;
        const init =async()=>{
            await getAllDoctors();    
        }
        init();
        return ()=>{
            isMounted=false

        }
    },[])

    useEffect(() => {
        let isMounted = true;

        const init = async () => {
            if (user?.role === "doctor") {
                await getDoctorProfile();
            }
        };

        init();

        return () => {
            isMounted = false;
        };
    }, [user]);

    return (
        <DoctorContext.Provider value={{doctor,editDoctorDetails ,getDoctorProfile,allDoctors}}>
            {children}
        </DoctorContext.Provider>
    );
};

export const useDoctor = () => useContext(DoctorContext);
