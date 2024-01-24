import React from "react";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";
import logoImage from "../imagenes/rueda-dentada.png";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    const auth = useAuth();

    async function handleSignout(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/signout`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.getRefreshToken()}`
                },
            });

            if (response.ok) {
                auth.signOut();
            }
        } catch (error) {
            console.error("Error during signout:", error);
        }
    }

    return (
        <>
            <header>
                <nav className="navbar navbar-dark bg-be0f30 custom-navbar">
                    <div className="container-fluid">
                        <div className="navbar-brand d-flex align-items-center">
                            <img
                                src={logoImage}
                                alt="Logo"
                                style={{ width: "40px", height: "40px", marginRight: "15px" }}
                            />
                            <h1 className="name" style={{ display: "inline", color: "black" }}>
                                BikeRental
                            </h1>
                        </div>
                        <Link to="/adminBikes" className="nav-link">
                            <h1 className="name" style={{ display: "inline", color: "black" }}>
                                AdminBikes
                            </h1>
                        </Link>
                        <div className="d-flex align-items-center">
                            {auth.getUser()?.name}
                            <li>
                                <a href="#" onClick={handleSignout} className="exit-button">
                                    Salir
                                </a>
                            </li>
                        </div>
                    </div>
                </nav>
            </header>
            <main>{children}</main>
        </>
    );
}
