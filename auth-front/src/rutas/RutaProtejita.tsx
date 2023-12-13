import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";

export default function RutaProtejida(){
    const [isAuth, setIsAuth]= useState(false);

    return  isAuth ? <Outlet /> : <Navigate to="/" />;
}