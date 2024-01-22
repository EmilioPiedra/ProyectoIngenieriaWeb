import { useAuth } from '../auth/AuthProvider';
import PortalLayout from '../layout/PortalLayout';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';


export default function PayMetod() {
    const auth = useAuth();
    const navigate = useNavigate();

    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardHolder, setCardHolder] = useState(''); // Nuevo estado para el titular de la tarjeta
    const location = useLocation();

    const handleClick1 = () => {
        const currentLocation = "/ItemList";
        auth.saveCurrentLocation(currentLocation);
        navigate('/ItemList');
    };

    const handleSubmit = async () => {
        console.log('Información del pago:', { cardNumber, expirationDate, cvv });
        await auth.toPay({});
        alert('Pago realizado con exito!');
        navigate('/dashboard')
        // También puedes realizar otras acciones, como cambiar el estado para indicar que el pago se ha realizado con éxito.
    };
    const orderDetails = auth.getOrderDetails();
    const selectedBicycle = auth.getSelectedBicycle();
    return (
        <PortalLayout>
            <div className="fondo-negro">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <button type="button" id="regresarButton" className="btn btn-danger btn-block" onClick={handleClick1}>
                                Regresar
                            </button>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                        </div>
                    </div>
                </div>
                <p></p>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 order-md-2 mb-4">
                            <div id='pagar-resumen' className="order-status-container">
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
                                            style={{ objectFit: 'cover', height: '300px' }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <form onSubmit={handleSubmit}>
                                <label>
                                    Titular de la Tarjeta:
                                    <input
                                        type="text"
                                        value={cardHolder}
                                        onChange={(e) => setCardHolder(e.target.value)}
                                    />
                                </label>
                                <label>
                                    Número de Tarjeta:
                                    <input
                                        type="text"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                    />
                                </label>
                                <label>
                                    Fecha de Expiración:
                                    <input
                                        type="text"
                                        value={expirationDate}
                                        onChange={(e) => setExpirationDate(e.target.value)}
                                    />
                                </label>
                                <label>
                                    CVV:
                                    <input
                                        type="text"
                                        value={cvv}
                                        onChange={(e) => setCVV(e.target.value)}
                                    />
                                </label>
                                <button type="button" onClick={handleSubmit} style={{ backgroundColor: '#BE0F30', color: '#fff' }}>
                                    Pagar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <footer className='orderfototer'>BikeRental@2023</footer>
        </PortalLayout>
    );
}
