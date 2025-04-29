import { createContext, use } from "react";
import axios from "axios";
import { useAuth } from "./user.context.jsx";


export const DoctorContext = createContext();

const api=axios.create({
    withCredentials:true
})

export const DoctorProvider = ({ children }) => {
    const [doctor,setDoctor]=useState(null)
    const editDoctorDetails = async({ qualification, speciality, experience, fee})=>{
    
        await api.post("/api/v1/doctor/editDoctorDetails", {
            qualification,
            speciality,
            experience,
            fee
        }).then((res) => {
           setDoctor(res.data.data.user)
            console.log(res.data.data.user);
            
        }).catch((err) => {
            console.log(err.response.data);
        })


    
    }



    return (
        <DoctorContext.Provider value={{editDoctorDetails }}>
            {children}
        </DoctorContext.Provider>
    )

}


export default useDoctor=()=>useContext(DoctorContext)