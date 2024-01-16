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
                <h1 className="login">Registrarse</h1>
                <div className="Signup-container">
                    {!!errorResponse && <div className='errorMessage'>{errorResponse}</div>}
                    <form className="Signup-form" onSubmit={handleSubnit}>
                        <input type="text" id="name" required name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Nombre' />
                        <input type="text" id="apellido" required name="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder='Apellido' />
                        <input type="text" id="UserName" required name="UserName" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='UserName' />
                        <input type="text" id="pais" required name="pais" value={pais} onChange={(e) => setPais(e.target.value)} placeholder='Pais' />
                        <input type="text" id="cedula" maxLength={10} required name="cedula" value={cedula} onChange={(e) => setCedula(e.target.value)} placeholder='Cédula' />
                        <input type="password" required id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña' />
                        <input type="password" id="confirmPassword" required name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirmar contraseña' />
                        <input type="date" required id="fechaNacimiento" name="fechaNacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} placeholder='Fecha de Nacimiento' />
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