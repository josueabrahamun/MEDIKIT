import React, { useState } from "react";
import "../styles/appointment.css"

type AppointmentType = {
  date: string;
  time: string;
  doctor: string;
};

const Appointment: React.FC = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctor, setDoctor] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAppointment: AppointmentType = { date, time, doctor };
    const storedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    storedAppointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(storedAppointments));
    setDate("");
    setTime("");
    setDoctor("");
  };

  return (
    <div className="appointment-page">
      <h2>Agendar Cita Médica</h2>
      <form onSubmit={handleSubmit}>
        <label>Fecha:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Hora:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <label>Médico:</label>
        <select
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          required
        >
          <option value="">Seleccione un médico</option>
          <option value="Dr. Pérez">Dr. Pérez</option>
          <option value="Dra. López">Dra. López</option>
          <option value="Dr. Ramírez">Dr. Ramírez</option>
        </select>

        <button type="submit">Agendar Cita</button>
      </form>
    </div>
  );
};

export default Appointment;
