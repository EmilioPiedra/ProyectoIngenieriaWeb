import { useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import { useAuth } from "../auth/AuthProvider";
import { ErrorResponse, Navigate, useNavigate } from "react-router-dom";
import { API_URL } from '../auth/constants';
import { AuthResponseError } from '../types/types';


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
    const [errorResponse, setErrorResponse] = useState("");

    const auth = useAuth();
    const goTo = useNavigate();

    async function handleSubnit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    apellido,
                    userName,
                    pais,
                    email,
                    cedula,
                    password,
                    confirmPassword,
                    fechaNacimiento,
                })
            });

            if (response.ok) {
                console.log("usuario creado correctamente");
                setErrorResponse("");

                goTo("/login")
            } else {
                console.log("Someting wrong");
                const json = await response.json() as AuthResponseError;
                setErrorResponse(json.body.error);
                return;
            }

        } catch (error) {
            console.log(error);
        }
    }

    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard" />
    }
    return <>
        <DefaultLayout>
        <div className="fondo-negro">
            <p></p>
            <div className="login-container">
                <h1>Registrarse</h1>
                {!!errorResponse && <div className='errorMessage'>{errorResponse}</div>}
                <form className="login-form" onSubmit={handleSubnit}>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" required name="name" value={name} onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="apellido">Apellido</label>
                    <input type="text" id="apellido" required name="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />

                    <label htmlFor="UserName">UserName</label>
                    <input type="text" id="UserName" required name="UserName" value={userName} onChange={(e) => setUserName(e.target.value)} />

                    <label htmlFor="pais">Pais</label>
                    <input type="text" id="pais" required name="pais" value={pais} onChange={(e) => setPais(e.target.value)} />

                    <label htmlFor="email">Correo Electronico</label>
                    <input type="text" id="email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="cedula">Cédula</label>
                    <input type="text" id="cedula" maxLength={10} required name="cedula" value={cedula} onChange={(e) => setCedula(e.target.value)} />

                    <label htmlFor="password">Contraseña</label>
                    <input type="password" required id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <label htmlFor="confirmPassword">Confirmar contraseña</label>
                    <input type="password" id="confirmPassword" required name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                    <input type="date" required id="fechaNacimiento" name="fechaNacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />

                    <button type="submit">Registrar</button>
                </form>
            </div>
            </div>

            <footer id="footer">
                <div className="nombrefooter">BikeRental@2023</div>
            
             </footer>
        </DefaultLayout>
    </>;
}