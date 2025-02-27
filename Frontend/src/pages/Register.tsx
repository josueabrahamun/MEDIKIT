import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/inicio.css";

// Expresión regular para validar contraseñas seguras
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~]).{8,20}$/;

const forbiddenChars = /[<>\"';/]/g;
const securityQuestions = [
    "¿Cuál es el nombre de tu primera mascota?",
    "¿Cuál es tu comida favorita?",
    "¿En qué ciudad naciste?",
    "¿Cuál es el nombre de tu mejor amigo de la infancia?",
];

const Register = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        security_question: securityQuestions[0], 
        security_answer: "",
    });

    const [passwordError, setPasswordError] = useState(false); // Estado para el mensaje de error

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (!forbiddenChars.test(value)) {
            setForm({ ...form, [name]: value });

            if (name === "password") {
                setPasswordError(false); // Oculta el error mientras escribe
            }
        }
    };

    const handlePasswordBlur = () => {
        if (!passwordRegex.test(form.password)) {
            setPasswordError(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { username, email, password, security_question, security_answer } = form;
    
        if (!username || !email || !password || !security_question || !security_answer) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (passwordError) {
            alert("Corrige la contraseña antes de continuar.");
            return;
        }

        console.log("Datos a enviar:", form); 
    
        try {
            await axios.post("http://localhost:5000/register", form);
            alert("Registro exitoso! Ahora inicia sesión.");
            navigate("/login");
        } catch (error) {
            console.error("Error en el registro:", error);
            alert("Error al registrar.");
        }
    };
    
    return (
        <div className="auth-container">
            <div className="left-panel">
                <h2>BIENVENIDO A</h2>
                <h1 className="logo">MEDIKIT</h1>
                <p>Seguridad. Salud. Bienestar</p>
            </div>
            <div className="right-panel">
                <h2>Registrarse</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        name="username" 
                        placeholder="Nombre de usuario" 
                        value={form.username} 
                        onChange={handleChange} 
                        autoComplete="off" 
                    />
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="Gmail" 
                        value={form.email} 
                        onChange={handleChange} 
                        autoComplete="off" 
                    />
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Contraseña" 
                        value={form.password} 
                        onChange={handleChange} 
                        onBlur={handlePasswordBlur} 
                        autoComplete="new-password" 
                        maxLength={20}
                    />
                    {passwordError && (
                        <p className="password-error">
                            La contraseña debe tener entre 8 y 20 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial.
                        </p>
                    )}

                    <label>Pregunta de Seguridad</label>
                    <select 
                        name="security_question" 
                        value={form.security_question} 
                        onChange={handleChange}
                    >
                        {securityQuestions.map((question, index) => (
                            <option key={index} value={question}>{question}</option>
                        ))}
                    </select>

                    <input 
                        name="security_answer" 
                        placeholder="Respuesta de seguridad" 
                        value={form.security_answer} 
                        onChange={handleChange} 
                        autoComplete="off" 
                    />

                    <button type="submit">Registrarse</button>
                </form>
                <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
            </div>
        </div>
    );
};

export default Register;
