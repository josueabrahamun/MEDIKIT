import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";


interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

const AdminDashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    // Obtener la lista de usuarios
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("No hay token de autenticación. Por favor, inicia sesión.");
                    navigate("/login");
                    return;
                }

                const response = await axios.get("http://localhost:5000/admin/users", {
                    headers: { Authorization: token },
                });

                // Verifica que la respuesta sea un arreglo
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else {
                    console.error("La respuesta del servidor no es un arreglo:", response.data);
                }
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
                alert("Error al obtener usuarios. Verifica la consola para más detalles.");
            }
        };

        fetchUsers();
    }, [navigate]);

    // Función para eliminar un usuario
    const handleDeleteUser = async (userId: number) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/admin/users/${userId}`, {
                headers: { Authorization: token },
            });
            // Actualizar la lista de usuarios después de eliminar
            setUsers(users.filter((user) => user.id !== userId));
            alert("Usuario eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            alert("No se pudo eliminar el usuario");
        }
    };

    // Función para redirigir a la página de edición
    const handleEditUser = (userId: number) => {
        navigate(`/edit-user/${userId}`);
    };

    return (
        <div className="admin-dashboard">
            <h2>Panel de Administrador</h2>
            <h3>Usuarios Registrados</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEditUser(user.id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>No hay usuarios registrados.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Link to="/side-menu" className="back-link">
                Volver al menú principal
            </Link>
        </div>
    );
};

export default AdminDashboard;