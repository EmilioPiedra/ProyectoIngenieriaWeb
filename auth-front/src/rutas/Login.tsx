import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from '../auth/constants';
import { AuthResponse, AuthResponseError } from '../types/types';
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");

    const goTo = useNavigate();
    const auth = useAuth();

    async function handleSubnit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName,
                    password,
                })
            });

            if (response.ok) {
                console.log("Usuario autenticado correctamente");
                setErrorResponse("");
                const json = (await response.json()) as AuthResponse;

                if (json.body.accessToken && json.body.refreshToken) {
                    auth.saveUser(json);
                    goTo(json.body.user.role === "admin" ? "/adminBikes" : "/dashboard");
                }

            } else {
                console.log("Algo salió mal");
                const json = await response.json() as AuthResponseError;
                setErrorResponse(json.body.error);
            }

        } catch (error) {
            console.log(error);
        }
    }

    if (auth.isAuthenticated) {
        // Ya está autenticado, entonces redirigimos según el rol
        const userRole = auth.getUser()?.role;
        console.log("Rol del usuario:", userRole);

        if (userRole === 'admin') {
            return <Navigate to="/adminBikes" />;
        }
        if (userRole !== "admin") {
            return <Navigate to="/dashboard" />;
        }
    }

    return (
        <DefaultLayout>
            <h1 className="login">Iniciar Sesión</h1>
            <div className="login-container" style={{ color: 'black' }}>
                <div className="icono">
                    <Icon icon="bx:user" style={{ color: 'white', fontSize: '70px' }} />
                </div>
                {!!errorResponse && <div className='errorMessage'>{errorResponse}</div>}
                <form className="login-form" onSubmit={handleSubnit}>
                    <input type="text" id="username" name="username" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Usuario" />
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" Contraseña" />
                    <button type="submit">Iniciar Sesión</button>
                </form>

                <p className="registrarse-sesion">¿No tienes cuenta ? <Link to="/signup" className="nav-link" style={{ color: 'white' }}><span className="color-registrarse">Registrate</span></Link></p>

            </div>
            <footer id="footer">
                <div className="nombrefooter">BikeRental@2023</div>
            </footer>
        </DefaultLayout>
    );
}
