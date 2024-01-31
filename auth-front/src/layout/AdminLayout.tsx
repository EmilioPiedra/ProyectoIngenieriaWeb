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
                        <Link to="/adminBikes" className="nav-link" style={{ fontSize: '20px', /* Otros estilos según sea necesario */ }}>
                            <Icon icon="grommet-icons:bike" style={{ fontSize: '55px' }} />
                        </Link>
                        <Link to="/adminBranch" className="nav-link" style={{ fontSize: '20px', /* Otros estilos según sea necesario */ }}>
                            <Icon icon="solar:map-point-wave-bold" style={{ fontSize: '55px' }} />
                        </Link>
                        <div className="d-flex align-items-center">
                            <span style={{ color: 'black', marginRight: '10px', fontSize: '20px' }}>{auth.getUser()?.userName}</span>
                            <a href="#" onClick={handleSignout} style={{ fontSize: '24px', /* Otros estilos según sea necesario */ }}>
                                <Icon icon="material-symbols:logout" style={{ fontSize: '50px', color: 'black' }} />
                            </a>
                        </div>

                    </div>
                </nav>
            </header>
            <main>{children}</main>
        </>
    );
}
