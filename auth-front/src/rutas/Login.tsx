import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();

    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
        <>
            <DefaultLayout>
                <p></p>
                <div className="login-container">
                    <h1>Iniciar Sesión</h1>
                    <form className="login-form">
                        <label htmlFor="username">Correo</label>
                        <input type="text" id="username" name="username" value={userName} onChange={(e) => setUserName(e.target.value)} />

                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <button type="submit">Iniciar Sesión</button>
                    </form>
                </div>
            </DefaultLayout>
        </>
    );
}