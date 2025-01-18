import React, { useState } from 'react';
import axios from 'axios';
import "../styles/inicio.css";


const Register = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', form);
            alert(response.data);
        } catch (error) {
            console.error(error);
            alert('Error al registrar.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" placeholder="Nombre de usuario" onChange={handleChange} />
            <input name="email" type="email" placeholder="Correo electrónico" onChange={handleChange} />
            <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default Register;
