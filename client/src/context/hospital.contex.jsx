import { createContext, useContext, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/hospital",
  withCredentials: true,
});

export const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
  const [hospital, setHospital] = useState({});

  const addhospital = async ({ name, email, location }) => {
    try {
      const res = await api.post("/add-hospital", {
        name,
        email,
        location,
      });

      if (!res.data.success) {
        console.warn("Hospital could not be added:", res.data.message);
        return;
      }

      
      console.log("Hospital added successfully:", res.data);
      return res;
    } catch (error) {
      console.error("Error adding hospital:", error.message || error);
    }
  };

  const verifyHospital = async ({ email, otp }) => {
    try {
      const res = await api.post("/verify", {
        email,
        otp,
      });

      if(!res.data.success){
        alert("response not came ");
      }

      return res;
    } catch (error) {
      console.error("Error verifying hospital:", error.message || error);
      return null;
    }
  };

  return (
    <HospitalContext.Provider value={{ addhospital, verifyHospital }}>
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => useContext(HospitalContext);
