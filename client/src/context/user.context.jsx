import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create Context
export const AuthContext = createContext();

// Create Axios Instance
const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [online,setOnline]=useState({})
  const [socket,setSocket]=useState(null);

  // Register
  const register = async (userData) => {
    setLoading(true);
    try {
      const { data } = await api.post('/api/v1/user/register', userData);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async ({ email, password, role }) => {
    setLoading(true);
    try {
      const { data } = await api.post('/api/v1/user/login', { email, password, role });

      if (data?.error || !data?.user) {
        throw new Error(data?.error || 'Login failed. Please check your credentials.');
      }

      setUser(data.user);
      setIsLoggedIn(true);

      connectSocket();
      console.log("✅ Login successful:", data.user);

      console.log(" the user is ",user);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await api.post('/api/v1/user/logout');
      setUser(null);
      setIsLoggedIn(false);
      disconnectSocket();
      return { success: true };
    } catch (error) {
      console.error('❌ Logout error:', error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // todo : this functipn is not running if the login in 

  const getUser = async () => {
    try {
      const { data } = await api.get('/api/v1/user/get-user');
      if (data?.user) {
        setUser(data.user);
        setIsLoggedIn(true);

        console.log(" i am get user ")
      }
      return data;
    } catch (error) {
      console.error('❌ Error fetching user:', error);
      await logout(); // Clean up session if invalid
      return null;
    }
  };

  // Upload Photo
  const photoUpload = async ({ id, formData }) => {
    try {
      const response = await api.post(`/api/v1/user/upload/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('✅ Photo uploaded:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error uploading photo:', error);
      throw error.response?.data || error;
    }
  };

  // Update User Details (Sample)
  const updateDetails = async (updatedData) => {
    try {
      const { data } = await api.put(`/api/v1/user/update`, updatedData);
      setUser(data.user);
      return data;
    } catch (error) {
      console.error("❌ Error updating details:", error);
      throw error.response?.data || error;
    }
  };

  // Auto-fetch user data on mount
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      setLoading(true);
      try {
        const data = await getUser();
        if (isMounted && data?.user) {
          setUser(data.user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('❌ Session error:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);



  const connectSocket=()=>{
    try {
      if(!user|| socket.connecte()) return;
      const socket=io(BASE_URL,{
        query:{
          userId:user._id
        }
      })
      socket.connect();
      setSocket({socket:socket});
      //todo: here the method for the online users 


      // todo : method to disconnect
        socket.on("disconnect",()=>{
          
        })
      
    } catch (error) {

      console.log("error while connection ",error?.message)
      
    }

  }
 

  const  disconnectSocket=() => {

    if(socket.connected()){
      socket.disconnect();
    }
    // if (get().socket?.connected) get().socket.disconnect();
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isLoggedIn,
      register,
      login,
      logout,
      photoUpload,
      updateDetails,

      socket,
      connectSocket,
      disconnectSocket
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
