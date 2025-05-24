import React,{useState} from 'react'
import { Link } from 'react-router-dom';

function Options() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleMenu}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        Menu
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div >
          <div >
            <Link to="/dashboard" >
              pending appointments
            </Link>
            <Link to="/profile" >
              today’s appointments
            </Link>
            <Link to="/settings" >
                completed appointments
            </Link>
            <Link to="/logout" >
              all appointments
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Options




