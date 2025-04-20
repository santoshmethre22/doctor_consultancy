import './App.css';
import { AuthProvider } from './context/user.context.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Auth/Signup.jsx';
import Login from './components/Auth/Login.jsx';
import HomePage from './components/Home/Home.jsx';


function App() {
  return (
    <div className="App">
      <Router> {/* ✅ Router wraps everything */}
        <AuthProvider> {/* ✅ Wraps Routes, NOT inside Routes */}
          <Routes> {/* ✅ Only one Routes wrapper */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {/* Add more routes here */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
