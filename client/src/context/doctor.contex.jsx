import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./user.context.jsx";

export const DoctorContext = createContext();

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/doctor",
  withCredentials: true,
});

export const DoctorProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const editDoctorDetails = async ({ qualification, speciality, experience, fee }) => {
    try {
      setLoading(true);

      const response = await api.put("/edit-doctor-details", {
        qualification,
        speciality,
        experience,
        fee,
      });

      const updatedDoctor = response?.data?.data?.newdoctor;

      if (updatedDoctor) {
        setDoctor(updatedDoctor);
        console.log("Doctor profile updated:", updatedDoctor);
      } else {
        console.warn("No updated doctor data received.");
      }

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "An error occurred";
      console.error("Failed to update doctor details:", message);
      return { error: message };
    } finally {
      setLoading(false);
    }
  };

  const getAllDoctors = async () => {
    try {
      setLoading(true);
      const res = await api.get("/get-all-doctor");
      setAllDoctors(res.data.data || []);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error("Failed to fetch all doctors:", message);
    } finally {
      setLoading(false);
    }
  };

  const getDoctorProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/get-doctor-info");

      if (res.data?.user) {
        setDoctor(res.data.user);
        console.log("Doctor profile fetched:", res.data.user);
      } else {
        console.warn("Doctor profile not found.");
        setDoctor(null);
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error("Error fetching doctor profile:", message);
      setDoctor(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  useEffect(() => {
    if (user?.role === "doctor") {
      getDoctorProfile();
    }
  }, [user?.role]);

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
