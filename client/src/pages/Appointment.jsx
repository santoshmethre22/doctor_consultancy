import { useState, useEffect } from "react";
import { useDoctor } from "../context/doctor.contex.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useAppointment } from "../context/appointment.context.jsx";

const AppointmentFormCard = () => {
  const { allDoctors } = useDoctor(); 
  const [doctor, setDoctor] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookAppointment } = useAppointment();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.time) {
      alert("Please select both date and time.");
      return;
    }

    setIsSubmitting(true);
    const success = await bookAppointment(formData.date, formData.time, id);
    setIsSubmitting(false);

    if (success) {
      setTimeout(() => navigate("/dashboard"), 1000); // Optional: allow toast to show
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (allDoctors && id) {
      const doctorData = allDoctors.find((doc) => doc.userId._id === id);
      setDoctor(doctorData || null);
    }
  }, [allDoctors, id]);

  if (!doctor) {
    return <p className="text-center mt-10">Loading doctor details...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-6 border p-5 rounded-xl shadow bg-white">
      <h2 className="text-xl font-semibold mb-1">{doctor.userId?.name}</h2>
      <p className="text-sm text-gray-600 mb-4">{doctor.speciality || "N/A"}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Select Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
            min={new Date().toISOString().split("T")[0]} // prevent past dates
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Select Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white py-2 rounded transition ${
            isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentFormCard;
