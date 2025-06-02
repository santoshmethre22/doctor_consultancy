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
import Booked from './pages/Booked.jsx';
import ChatGemini from './features/chat/ChatGemini.jsx';

function App() {
  return (
    <div className="App">
      <Router> {/* ✅ Router wraps everything */}
        <AuthProvider> {/* ✅ Wraps Routes, NOT inside Routes */}
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
          <Route path='/chat-gemini' element={<ChatGemini />} />
          </Routes>
            </AppointmentProvider>
         </DoctorProvider>

        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
