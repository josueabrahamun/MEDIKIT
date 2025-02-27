import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

const EditUser: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:5000/admin/users/${userId}`, {
                    headers: { Authorization: token },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error al obtener el usuario:", error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            if (user) {
                await axios.put(`http://localhost:5000/admin/users/${userId}`, user, {
                    headers: { Authorization: token },
                });
                alert("Usuario actualizado correctamente");
                navigate("/admin-dashboard");
            }
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            alert("No se pudo actualizar el usuario");
        }
    };

    if (!user) return <div>Cargando...</div>;

    return (
        <div>
            <h2>Editar Usuario</h2>
            <input
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <select
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
            </select>
            <button onClick={handleSave}>Guardar</button>
        </div>
    );
};

export default EditUser;
