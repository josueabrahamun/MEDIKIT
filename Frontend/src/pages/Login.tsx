import React, { useState } from 'react';
import axios from 'axios';
import "../styles/inicio.css";

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', form);
            alert(`Token: ${response.data.token}`);
        } catch (error) {
            console.error(error);
            alert('Error al iniciar sesión.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Correo electrónico" onChange={handleChange} />
            <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};

export default Login;
