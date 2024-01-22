import { useAuth } from '../auth/AuthProvider';
import PortalLayout from '../layout/PortalLayout';
import { useNavigate } from 'react-router-dom';

export default function OrderStatus() {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleClick1 = () => {
        const previousLocation = auth.getCurrentLocation();
        auth.saveCurrentLocation('/OrderStatus'); // Guarda la ubicación actual antes de navegar
        navigate(previousLocation || '/Dashboard');
    };
    const orderDetails = auth.getOrderDetails();

    return (
        <PortalLayout>
            <div className="fondo-negro">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <button type="button" id="regresarButton" className="btn btn-danger btn-block" onClick={handleClick1}>
                                Regresar
                            </button>
                        </div>
                    </div>
                </div>
                <h1 id='titulo' className="text-3xl font-bold">Order Status</h1>
                <div className="order-status-container">
                    {/* Mostrar los detalles del pedido obtenidos con getOrderDetails */}
                    <div className="order-details">
                        <div className="order-detail">
                            <p>Recogida Ubicación:</p>
                            <p>{auth.branches.find(x => x._id === orderDetails.recogidaUbicacion)?.name}</p>
                        </div>
                        <div className="order-detail">
                            <p>Recogida Fecha:</p>
                            <p>{orderDetails.recogidaFecha}</p>
                        </div>
                        <div className="order-detail">
                            <p>Recogida Hora:</p>
                            <p>{orderDetails.recogidaHora}</p>
                        </div>

                        <div className="order-detail">
                            <p>Devolución Ubicación:</p>
                            <p>{auth.branches.find(x => x._id === orderDetails.devolucionUbicacion)?.name}</p>
                        </div>
                        <div className="order-detail">
                            <p>Devolución Fecha:</p>
                            <p>{orderDetails.devolucionFecha}</p>
                        </div>
                        <div className="order-detail">
                            <p>Devolución Hora:</p>
                            <p>{orderDetails.devolucionHora}</p>
                        </div>
                    </div>

                    {/* Mostrar la bicicleta seleccionada si existe */}
                    {auth.cart.map((x) =>
                        <div key={x._id} className="bicycle-details">
                            <div className="bicycle-detail">
                                <p><b>Bicicleta seleccionada:</b></p>
                                <p>{x.description}</p>
                            </div>
                            <div className="bicycle-detail">
                                <p><b>Precio:</b></p>
                                <p>${x.price}</p>
                            </div>
                            <img
                                src={x.image}
                                className="bicycle-img"
                                alt={x.name}
                                style={{ objectFit: 'cover', height: '200px' }}
                            />
                        </div>
                    )}
                </div>
            </div>
            <footer className='orderfototer'>BikeRental@2023</footer>
        </PortalLayout>
    );
}