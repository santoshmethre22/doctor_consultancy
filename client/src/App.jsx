import './App.css';
import { AuthProvider } from './context/user.context.jsx';
import { DoctorProvider } from './context/doctor.contex.jsx';
import { AppointmentProvider } from './context/appointment.context.jsx';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Auth/Signup.jsx';
import Login from './components/Auth/Login.jsx';
import HomePage from './components/Home/Home.jsx';
import Profile from './Profile/Profile.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
//import ChatDashBoard from './features/chatBox/ChatDashBoard.jsx';
import Appointment from './pages/Appointment.jsx';
import BookAppointment from './pages/BookAppointment.jsx';
import Booked from './pages/BookedUserAppointments.jsx';
import ChatGemini from './features/chat/ChatGemini.jsx';

import Socket from "./features/chat/socket.io/Socket.jsx"
import AddHospital from './components/Hospital/addHospital/AddHospital.jsx';
import { HospitalProvider } from './context/hospital.contex.jsx';
import HospitalDashboard from './components/Hospital/HospitalDashboard/HospitalDashboard.jsx';


function App() {
  return (
    
    <div className="App">
      <Router> {/* ✅ Router wraps everything */}
        <AuthProvider> {/* ✅ Wraps Routes, NOT inside Routes */}
          <HospitalProvider >  
          <DoctorProvider>
            <AppointmentProvider>
          <Routes> {/* ✅ Only one Routes wrapper */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/dashboard' element={<Dashboard />} />
       {/* <Route path='/chat-interface/:id' element={<ChatDashBoard />} /> */}
            {/* Add more routes here */}
            {/* add the appointment rout here*/}
            // todo : add the take appointment for id here
            <Route path='/book-appointment/:id' element={<BookAppointment />} />
            <Route path='/appointment' element={<Appointment />} />
          {/* <Route path='/options' element={<Options />} /> */}  
          <Route path='/user-appointment' element={<Booked />} />  
          {/* <Route path='/socket-io' element={<Socket />} /> */}
          <Route path='/chat-gemini' element={<ChatGemini />} />
          
          
          { /* add here the hopital router */}

          <Route path='/add-hospital' element={<AddHospital />} />
          <Route path='/hospital' element={<HospitalDashboard />} />

          <Route path='/socket-chat' element={<Socket />} />
          </Routes>
            </AppointmentProvider>
         </DoctorProvider>
</HospitalProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
