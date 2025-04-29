import { createContext, use } from "react";
import axios from "axios";

export const DoctorContext = createContext();

const api=axios.create({

    withCredentials:true
})

export const DoctorProvider = ({ children }) => {

    const getDoctor=async()=>{
        try {
           



        } catch (error) {
            
        }


    }


    return (
        <DoctorContext.Provider value={{ getDoctor }}>
            {children}
        </DoctorContext.Provider>
    )

}


export default useDoctor=()=>useContext(DoctorContext)