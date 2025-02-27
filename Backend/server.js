import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 5000;  

app.use(cors());
app.use(bodyParser.json());

// Configuración de la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log("Conectado a la base de datos.");
});

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send("Acceso denegado. No hay token.");

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send("Token no válido.");
        req.user = user;
        next();
    });
};

// Registro de usuarios con preguntas de seguridad
app.post('/register', async (req, res) => {
    const { username, email, password, security_question, security_answer } = req.body;

    if (!username || !email || !password || !security_question || !security_answer) {
        return res.status(400).send("Todos los campos son obligatorios.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedAnswer = await bcrypt.hash(security_answer, 10);
    
    const query = 'INSERT INTO users (username, email, password, security_question, security_answer) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [username, email, hashedPassword, security_question, hashedAnswer], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send("Usuario registrado.");
    });
});



// Obtener pregunta de seguridad
app.post('/get-security-question', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email requerido." });
    }

    const query = "SELECT security_question FROM users WHERE email = ?";

    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("Error al obtener la pregunta de seguridad:", err);
            return res.status(500).json({ message: "Error del servidor." });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        res.json({ security_question: results[0].security_question });
    });
});

// Inicio de sesión con preguntas de seguridad
app.post('/login', (req, res) => {
    const { email, password, security_answer } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send("Usuario no encontrado.");

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        const isAnswerValid = await bcrypt.compare(security_answer, user.security_answer);

        if (!isPasswordValid || !isAnswerValid) {
            return res.status(401).send("Credenciales inválidas o respuesta de seguridad incorrecta.");
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, role: user.role });
    });
});



app.get('/admin/users', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send("Acceso denegado. Solo para administradores.");
    }

    const query = 'SELECT id, username, email, role FROM users';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
});


// Ruta protegida 
app.get('/protected', authenticateToken, (req, res) => {
    res.send("Accediste a una ruta protegida.");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});