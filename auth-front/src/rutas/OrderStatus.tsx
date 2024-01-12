import React from 'react';
import { useAuth } from '../auth/AuthProvider';
import PortalLayout from '../layout/PortalLayout';
import { useNavigate } from 'react-router-dom';

export default function OrderStatus() {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Dashboard');
    };

    const orderDetails = auth.getOrderDetails();
    const selectedBicycle = auth.getSelectedBicycle();

    return (
        <PortalLayout>
            <button type="button" onClick={handleClick}>
                regresar
            </button>
            <h1 className="text-3xl font-bold">Order Status</h1>

            <div>
                {/* Mostrar los detalles del pedido obtenidos con getOrderDetails */}
                <p>Recogida Ubicación: {orderDetails.recogidaUbicacion}</p>
                <p>Recogida Fecha: {orderDetails.recogidaFecha}</p>
                <p>Recogida Hora: {orderDetails.recogidaHora}</p>
                <p>Devolución Ubicación: {orderDetails.devolucionUbicacion}</p>
                <p>Devolución Fecha: {orderDetails.devolucionFecha}</p>
                <p>Devolución Hora: {orderDetails.devolucionHora}</p>

                {/* Mostrar la bicicleta seleccionada si existe */}
                {selectedBicycle && (
                    <div>
                        <p>Bicicleta seleccionada:</p>
                        <p>Descripción: {selectedBicycle.description}</p>
                        <p>Precio: ${selectedBicycle.price}</p>
                        <img
                            src={selectedBicycle.image}
                            className="card-img-top"
                            alt={selectedBicycle.name}
                            style={{ objectFit: 'cover', height: '300px', flex: '1' }}
                        />
                        {/* Agrega más detalles según sea necesario */}
                    </div>
                )}
            </div>
        </PortalLayout>
    );
}
