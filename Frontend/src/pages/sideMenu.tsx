import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Appointment from "../components/Appointment"; 
import HistorialMedico from "../components/HistorialMedico"; 
import "../components/Appointment"; 
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard"; // Ajusta la ruta según tu estructura

ChartJS.register(ArcElement, Tooltip, Legend);

// Componente del Dashboard de Enfermedades
const DashboardEnfermedades: React.FC = () => {
  const data = {
    labels: [
      "Propagación",
      "Tasa de letalidad",
      "Éxito de cura",
      "Producción de cura",
    ],
    datasets: [
      {
        data: [60, 15, 25, 70],
        backgroundColor: [
          "#FFA500", // Naranja brillante
          "#FF8C00", // Naranja oscuro
          "#FF7F32", // Naranja cálido
          "#FF4500", // Naranja rojizo
        ],
        borderColor: [
          "#FFA500",
          "#FF8C00",
          "#FF7F32",
          "#FF4500",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { position: "bottom" as const },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) =>
            `${tooltipItem.label}: ${tooltipItem.raw}%`,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa", // Fondo estilo papel
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px", // Reducir el ancho máximo
        margin: "0 auto 40px auto", // Centrar y añadir margen inferior
        border: "1px solid #dcdcdc", // Bordes suaves estilo cuaderno
        transition: "transform 0.3s ease-in-out",
        fontFamily: "'Times New Roman', serif", // Fuente estilo médico
        borderLeft: "5px solid #FFA500", // Bordes con color naranja para representar el patógeno
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#343a40",
          fontSize: "1.5rem",
          fontWeight: "600",
          borderBottom: "2px solid #dcdcdc", // Línea de separación tipo agenda
          paddingBottom: "10px",
        }}
      >
        Patógeno
      </h3>
      <div style={{ height: "250px" }}> {/* Reducir la altura */}
        <Doughnut data={data} options={options} />
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#343a40",
          fontSize: "1rem",
          fontWeight: "400",
        }}
      >
        <p>
          Estos porcentajes se calcularon en base a datos de salud pública, considerando las tasas de propagación, letalidad y éxito en el tratamiento.
        </p>
      </div>
    </div>
  );
};

// Componente del Dashboard del Huésped
const DashboardHuesped: React.FC = () => {
  const data = {
    labels: [
      "Porcentaje de contagios",
      "Tasa de fallecimientos",
      "Tasa de mortalidad",
      "Vacunaciones realizadas",
      "Probabilidad de contraer el patógeno",
    ],
    datasets: [
      {
        data: [50, 10, 15, 60, 25],
        backgroundColor: [
          "#FF7F32", // Naranja cálido
          "#FF8C00", // Naranja oscuro
          "#FFA500", // Naranja brillante
          "#FF6347", // Tomate
          "#FF4500", // Naranja rojizo
        ],
        borderColor: [
          "#FF7F32",
          "#FF8C00",
          "#FFA500",
          "#FF6347",
          "#FF4500",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { position: "bottom" as const },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) =>
            `${tooltipItem.label}: ${tooltipItem.raw}%`,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa", // Fondo estilo papel
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px", // Reducir el ancho máximo
        marginBottom: "40px",
        border: "1px solid #dcdcdc", // Bordes suaves estilo cuaderno
        transition: "transform 0.3s ease-in-out",
        fontFamily: "'Times New Roman', serif", // Fuente estilo médico
        borderLeft: "5px solid #FF7F32", // Bordes con color cálido para representar al huésped
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#343a40",
          fontSize: "1.5rem",
          fontWeight: "600",
          borderBottom: "2px solid #dcdcdc", // Línea de separación tipo agenda
          paddingBottom: "10px",
        }}
      >
        Huésped
      </h3>
      <div style={{ height: "250px" }}> {/* Reducir la altura */}
        <Doughnut data={data} options={options} />
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#343a40",
          fontSize: "1rem",
          fontWeight: "400",
        }}
      >
        <p>
          Los porcentajes presentados provienen de estudios sobre la tasa de contagio, mortalidad y la efectividad de las vacunas en la población.
        </p>
      </div>
    </div>
  );
};

// Componente del Dashboard del Ambiente
const DashboardAmbiente: React.FC = () => {
  const data = {
    labels: [
      "Propagación por aire",
      "Propagación por contacto físico",
      "Propagación por fluidos",
      "Población afectada",
    ],
    datasets: [
      {
        data: [35, 50, 20, 75],
        backgroundColor: [
          "#FF8C00", // Naranja oscuro
          "#FFA500", // Naranja brillante
          "#FF7F32", // Naranja cálido
          "#FF4500", // Naranja rojizo
        ],
        borderColor: [
          "#FF8C00",
          "#FFA500",
          "#FF7F32",
          "#FF4500",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { position: "bottom" as const },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) =>
            `${tooltipItem.label}: ${tooltipItem.raw}%`,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa", // Fondo estilo papel
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px", // Reducir el ancho máximo
        marginBottom: "40px",
        border: "1px solid #dcdcdc", // Bordes suaves estilo cuaderno
        transition: "transform 0.3s ease-in-out",
        fontFamily: "'Times New Roman', serif", // Fuente estilo médico
        borderLeft: "5px solid #FF8C00", // Bordes con color naranja oscuro para representar el ambiente
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#343a40",
          fontSize: "1.5rem",
          fontWeight: "600",
          borderBottom: "2px solid #dcdcdc", // Línea de separación tipo agenda
          paddingBottom: "10px",
        }}
      >
        Ambiente
      </h3>
      <div style={{ height: "250px" }}> {/* Reducir la altura */}
        <Doughnut data={data} options={options} />
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#343a40",
          fontSize: "1rem",
          fontWeight: "400",
        }}
      >
        <p>
          Los porcentajes reflejan los factores de riesgo de propagación en el ambiente, según estudios de contacto físico y aéreo.
        </p>
      </div>
    </div>
  );
};

const SideMenu: React.FC = () => {
    const [showAppointment, setShowAppointment] = useState<boolean>(false);
    const [showHistorial, setShowHistorial] = useState<boolean>(false);
    const [showAdminDashboard, setShowAdminDashboard] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<string>("user");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1])); // Extraer el payload del token
            setUserRole(payload.role); // Establecer el rol del usuario
        }
    }, []);

    return (
        <div>
            {/* Menú lateral */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    width: "250px",
                    background: "linear-gradient(135deg, #e64100, #ff6b35)", // Fondo degradado
                    color: "white",
                    zIndex: 999,
                    boxShadow: "2px 0 10px rgba(0, 0, 0, 0.2)",
                    borderRadius: "0 20px 20px 0", // Bordes redondeados
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        paddingTop: "20px",
                    }}
                >
                    {/* Encabezado */}
                    <div
                        style={{
                            whiteSpace: "nowrap",
                            textAlign: "center",
                            borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
                            color: "white",
                            marginBottom: "20px",
                            paddingBottom: "10px",
                        }}
                    >
                        <h5
                            style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                letterSpacing: "-0.5px",
                                marginTop: "0",
                                marginBottom: "5px",
                            }}
                        >
                            Bienvenido
                        </h5>

                    </div>

                    {/* Opciones del menú */}
                    <ul
                        style={{
                            width: "100%",
                            textAlign: "center",
                            listStyleType: "none",
                            paddingLeft: 0,
                            marginTop: "20px",
                            fontFamily: "'Arial', sans-serif",
                        }}
                    >
                        {/* Sección 1 */}
                        <li className="nav-item mb-3">
                            <a
                                href="#enfermedades"
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                    margin: "10px 0",
                                    fontSize: "18px",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    transition: "background 0.3s ease",
                                    display: "block",
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowAppointment(false);
                                    setShowHistorial(false);
                                    setShowAdminDashboard(false);
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "transparent";
                                }}
                            >
                                Dashboard de Triada Ecológica
                            </a>
                        </li>

                        <hr style={{ border: "1px solid rgba(255, 255, 255, 0.2)", margin: "10px 0" }} />

                        {/* Sección 2 */}
                        <li className="nav-item mb-3">
                            <a
                                href="#agendar-cita-medica"
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                    margin: "10px 0",
                                    fontSize: "18px",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    transition: "background 0.3s ease",
                                    display: "block",
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowAppointment(true);
                                    setShowHistorial(false);
                                    setShowAdminDashboard(false);
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "transparent";
                                }}
                            >
                                Agendar cita médica
                            </a>
                        </li>

                        <hr style={{ border: "1px solid rgba(255, 255, 255, 0.2)", margin: "10px 0" }} />

                        {/* Sección 3 */}
                        <li className="nav-item mb-3">
                            <a
                                href="#consultar-informacion"
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                    margin: "10px 0",
                                    fontSize: "18px",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    transition: "background 0.3s ease",
                                    display: "block",
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowAppointment(false);
                                    setShowHistorial(true);
                                    setShowAdminDashboard(false);
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "transparent";
                                }}
                            >
                                Historial médico
                            </a>
                        </li>

                        {/* Sección 4: Panel de administrador (solo para admins) */}
                        {userRole === "admin" && (
                            <>
                                <hr style={{ border: "1px solid rgba(255, 255, 255, 0.2)", margin: "10px 0" }} />
                                <li className="nav-item mb-3">
                                    <a
                                        href="#admin-dashboard"
                                        style={{
                                            color: "white",
                                            textDecoration: "none",
                                            margin: "10px 0",
                                            fontSize: "18px",
                                            padding: "10px",
                                            borderRadius: "8px",
                                            transition: "background 0.3s ease",
                                            display: "block",
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate("/admin-dashboard");
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "transparent";
                                        }}
                                    >
                                        Panel de Administrador
                                    </a>
                                </li>
                            </>
                        )}

                        <hr style={{ border: "1px solid rgba(255, 255, 255, 0.2)", margin: "10px 0" }} />

                        {/* Sección 5 */}
                        <li className="nav-item mb-3">
                            <button
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    window.location.href = "/login";
                                }}
                                style={{
                                    backgroundColor: "#FF4500",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 20px",
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    width: "100%",
                                }}
                            >
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Contenido principal */}
            <div
                style={{
                    marginLeft: "250px", // Margen izquierdo fijo para el contenido principal
                    padding: "20px",
                }}
            >
                {showAppointment ? (
                    <Appointment />
                ) : showHistorial ? (
                    <HistorialMedico />
                ) : showAdminDashboard ? (
                    <AdminDashboard />
                ) : (
                    <>
                        <DashboardEnfermedades />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                marginTop: "20px",
                            }}
                        >
                            <DashboardHuesped />
                            <DashboardAmbiente />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SideMenu;