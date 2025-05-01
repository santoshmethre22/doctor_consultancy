import { createContext, useState, useContext } from "react";
import axios from "axios";

export const DoctorContext = createContext();

const api = axios.create({
    withCredentials: true
});

export const DoctorProvider = ({ children }) => {
    const [doctor, setDoctor] = useState(null);

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


    const getDoctorProfile=async()=>{
        try {

            const res=await api.get("/api/v1/doctor/get-doctor-info")
            console.log(res.data.user);
            setDoctor(res.data.user);

            
        } catch (error) {
            
        }

    }
    return (
        <DoctorContext.Provider value={{ doctor, editDoctorDetails }}>
            {children}
        </DoctorContext.Provider>
    );
};

//const useDoctor = () => useContext(DoctorContext);
export const useDoctor=()=>useContext(DoctorContext)

