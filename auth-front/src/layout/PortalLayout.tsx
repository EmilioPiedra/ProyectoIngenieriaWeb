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
                            <Link to="/dashboard" className="nav-link">
                                <h1 className="name" style={{ display: "inline", color: "black" }}>
                                    BikeRental
                                </h1>
                            </Link>
                        </div>
                        <div className="d-flex align-items-center">
                            <div style={{ position: 'relative' }}>
                                <Link to="/OrderStatus">
                                    <Icon icon="ep:shopping-cart" className="shopping-cart" style={{ color: 'white', fontSize: '40px' }} /></Link>
                                {auth.cart.length > 0 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '%',
                                        transform: 'translate(-50%, -50%)',
                                        background: 'red',
                                        borderRadius: '50%',
                                        padding: '2px 6px',
                                        color: 'white',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                    }}>
                                        {auth.cart.reduce((acc, item) => acc + item.quantity, 0)}
                                    </div>
                                )}
                            </div>
                            <Icon icon="bx:user" className="icono-usuario" style={{ color: 'white', fontSize: '40px' }}>
                                {auth.getUser()?.name}
                            </Icon>
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
