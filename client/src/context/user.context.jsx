import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext();

// Create a custom axios instance
const api = axios.create({
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const register = async (userData) => {
    setLoading(true);
    try {
      await api.post('api/v1/user/register', userData);
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password, role }) => {
    setLoading(true);
    try {
      const { data } = await api.post('/api/v1/user/login', { email, password, role });
    // console.log(data);
      setUser(data?.user); 
      setIsLoggedIn(true);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.get('/api/v1/user/logout'); // Assuming you have a logout API
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const getUser=async()=>{
      try {
          const {data}=await api.get("/api/v1/user/get-user");
          setUser(data?.user);
          if(data?.user.role==="doctor"){
            // setIsLoggedIn(true);
       //   setIsLoggedIn(true);
          

              // the call for the doctor details 

          }


      } catch (error) {

          console.error("Error fetching user data:", error);
        logout();

      }


  }
   useEffect(() => {

    getUser();

   },[])
  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, isLoggedIn,getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
