import React from "react";

const DoctorCard = ({ name, specialization, experience, image, rating }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-sm">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-full mx-auto object-cover shadow-md"
      />
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{specialization}</p>
        <p className="text-sm text-gray-500 mt-1">{experience} years experience</p>
        <div className="mt-2 flex justify-center items-center gap-1">
          <span className="text-yellow-400">⭐</span>
          <span className="text-sm text-gray-600">{rating} / 5</span>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
