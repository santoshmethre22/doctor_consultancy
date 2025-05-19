// import { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { Navigate } from 'react-router-dom';

// export const AuthContext = createContext();

// // Create a custom axios instance
// const api = axios.create({
//   withCredentials: true,
// });

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const register = async (userData) => {
//     setLoading(true);
//     try {
//       await api.post('api/v1/user/register', userData);
//     } catch (error) {
//       throw error.response?.data || error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async ({ email, password, role }) => {
//     setLoading(true);
//     try {
//       const { data } = await api.post('/api/v1/user/login', { email, password, role });
//       setUser(data?.user); 
//       setIsLoggedIn(true);
//       return data;
//     } catch (error) {
//       throw error.response?.data || error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     setLoading(true);
//     try {
//       await api.get('/api/v1/user/logout'); 
//       setUser(null);
//       setIsLoggedIn(false);
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//------------------------------------------------------------------->
// read the concept of mounting and unmounting in react ------------------> that should be taken care
// if your coding

//--------------------------------------------------------------------->
//   useEffect(() => {
//     let isMounted = true; // ✅ add isMounted flag

//     const getUser = async () => {
//       setLoading(true); // optional: you can also set loading true when fetching user
//       try {
//         const { data } = await api.get("/api/v1/user/get-user");
//         if (isMounted) {  // ✅ Only set state if still mounted
//           setUser(data?.user);
//           if (data?.user) {
//             setIsLoggedIn(true);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         if (isMounted) {
//           logout();
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     getUser();

//     return () => {
//       isMounted = false; // ✅ cleanup
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading, register, login, logout, isLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const api = axios.create({
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const register = async (userData) => {
    setLoading(true);
    try {
      await api.post('/api/v1/user/register', userData);
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
      await getUser(); // fetch full user info after login
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
      await api.get('/api/v1/user/logout');
      setUser(null);
      setIsLoggedIn(false);
      navigate('/'); // Redirect after logout
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await api.get('/api/v1/user/get-user');
      setUser(data?.user);
      if (data?.user) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      await logout(); // logout if session invalid
    }
  };

  const photoUpload=async(formdata)=>{
    try {
      
      // todo : here you need to 


    } catch (error) {
      
      console.error('Error uploading photo:', error);
    }

  }

  // Auto-fetch user data on mount
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
     //========================>

      setLoading(true);
      
      try {
        const { data } = await api.get('/api/v1/user/get-user');
      
        if (isMounted && data?.user) {
          setUser(data.user);
          setIsLoggedIn(true);
        }
      } 
      catch (error) {
        console.error('Session error:', error);
      } 
      finally {
        if (isMounted) setLoading(false);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  
  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
