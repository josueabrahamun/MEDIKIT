import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider"; 
import "../styles/inicio.css";
import logoImage from "../img/OIP.jpg";

const forbiddenChars = /[<>\"';/]/g;

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "", security_answer: "" });
    const [securityQuestion, setSecurityQuestion] = useState(""); 
    const [showSecurityInput, setShowSecurityInput] = useState(false); 
    const navigate = useNavigate();
    const authContext = useContext(AuthContext); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (!forbiddenChars.test(value)) {
            setForm({ ...form, [name]: value });
        }
    };
    
    const handleGetSecurityQuestion = async () => {
        try {
            const response = await axios.post("http://localhost:5000/get-security-question", { email: form.email });
            setSecurityQuestion(response.data.security_question);
            setShowSecurityInput(true);
        } catch (error) {
            console.error(error);
            alert("No se encontró la pregunta de seguridad para este usuario.");
        }
    };

    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (forbiddenChars.test(form.email) || forbiddenChars.test(form.password) || forbiddenChars.test(form.security_answer)) {
            alert("Los datos ingresados contienen caracteres no permitidos.");
            return;
        }
        
        try {
            const response = await axios.post("http://localhost:5000/login", {
                email: form.email,
                password: form.password,
                security_answer: form.security_answer,
            });
            const { token, role } = response.data;
            if (token) {
                localStorage.setItem("token", token); 
                authContext.setAuth({ token, role }); 
                alert("Bienvenido!");
                navigate(role === "admin" ? "/admin-dashboard" : "/side-menu", { replace: true });
            }
        } catch (error) {
            console.error(error);
            alert("Error al iniciar sesión. Verifica tus credenciales.");
        }
    };
    

    return (
        <div className="auth-container">
            <div className="left-panel">
                <img src={logoImage} alt="Logo" className="logo-image" />
                <h2>BIENVENIDO A</h2>
                <h1 className="logo">MEDIKIT</h1>
                <p>Seguridad. Salud. Bienestar</p>
            </div>
            <div className="right-panel">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="Gmail" 
                        value={form.email} 
                        onChange={handleChange} 
                        autoComplete="off" 
                    />
                    <button type="button" onClick={handleGetSecurityQuestion}>
                        Obtener pregunta de seguridad
                    </button>

                    {showSecurityInput && (
                        <>
                            <p><strong>{securityQuestion}</strong></p>
                            <input 
                                name="security_answer" 
                                placeholder="Respuesta de seguridad" 
                                value={form.security_answer} 
                                onChange={handleChange} 
                                autoComplete="off" 
                            />
                        </>
                    )}

                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Contraseña" 
                        value={form.password} 
                        onChange={handleChange} 
                        autoComplete="new-password" 
                    />
                    <button type="submit">Iniciar sesión</button>
                </form>
                <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
            </div>
        </div>
    );
};

export default Login;
