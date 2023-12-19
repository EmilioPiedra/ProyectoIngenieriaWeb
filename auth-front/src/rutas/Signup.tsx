import { useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";


export default function Signup() {
    const [name, setName] = useState("");
    const [apellido, setApellido] = useState("");
    const [userName, setUserName] = useState("");
    const [pais, setPais] = useState("");
    const [email, setEmail] = useState("");
    const [cedula, setCedula] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const auth = useAuth();

    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard" />
    }
    return <>
        <DefaultLayout>
            <p></p>
            <div className="login-container">
                <h1>Registrarse</h1>
                <form className="login-form">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="apellido">Apellido</label>
                    <input type="text" id="apellido" name="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />

                    <label htmlFor="UserName">UserName</label>
                    <input type="text" id="UserName" name="UserName" value={userName} onChange={(e) => setUserName(e.target.value)} />

                    <label htmlFor="pais">Pais</label>
                    <input type="text" id="pais" name="pais" value={pais} onChange={(e) => setPais(e.target.value)} />

                    <label htmlFor="email">Correo Electronico</label>
                    <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="cedula">Cédula</label>
                    <input type="text" id="cedula" name="cedula" value={cedula} onChange={(e) => setCedula(e.target.value)} />

                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <label htmlFor="confirmPassword">Confirmar contraseña</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                    <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />

                    <button type="submit">Registrar</button>
                </form>
            </div>
        </DefaultLayout>
    </>;
}