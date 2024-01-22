import { useAuth } from '../auth/AuthProvider';
import AdminLayout from '../layout/AdminLayout';
import PortalLayout from '../layout/PortalLayout';
import { Outlet } from 'react-router-dom';

export default function AdminDashboard() {
    const auth = useAuth();

    // Verificar el rol del usuario
    if (auth.getUser()?.role !== 'admin') {
        // Redirigir o mostrar mensaje de error según el caso
        return <><p>No tienes permisos para acceder a esta sección</p><Outlet /></>;
    }

    // Renderizar contenido del dashboard si el rol es 'admin'
    return (
        <AdminLayout>
            <h1>admin</h1>
            <footer id='footerhome'>BikeRental@2023</footer>
        </AdminLayout>
    );
}
