import React, { useState, useEffect } from "react";
import "../styles/HistorialMedico.css";

type AppointmentType = {
  date: string;
  time: string;
  doctor: string;
};

const HistorialMedico: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    setAppointments(storedAppointments);
  }, []);

  const removeAppointment = (index: number) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };

  return (
    <div className="historial-medico">
      <h2>Historial de Citas Médicas</h2>
      {appointments.length === 0 ? (
        <p>No hay citas agendadas.</p>
      ) : (
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index}>
              {appointment.date} - {appointment.time} con {appointment.doctor}
              <button onClick={() => removeAppointment(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistorialMedico;
