import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./user.context.jsx";

export const DoctorContext = createContext();

const api = axios.create({
    withCredentials: true
});

export const DoctorProvider = ({ children }) => {
    const [doctor, setDoctor] = useState(null);
    const { user } = useAuth();

    const editDoctorDetails = async ({ qualification, speciality, experience, fee }) => {
        try {
            const res = await api.post("/api/v1/doctor/editDoctorDetails", {
                qualification,
                speciality,
                experience,
                fee
            });
            setDoctor(res.data.data.user);
            console.log(res.data.data.user);
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };



    
    const getDoctorProfile = async () => {
        try {
            const res = await api.get("/api/v1/doctor/get-doctor-info");
            console.log(res.data.user);
            setDoctor(res.data.user);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

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
        <DoctorContext.Provider value={{doctor,editDoctorDetails ,getDoctorProfile }}>
            {children}
        </DoctorContext.Provider>
    );
};

export const useDoctor = () => useContext(DoctorContext);
