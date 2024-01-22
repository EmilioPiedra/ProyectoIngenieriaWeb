import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import PortalLayout from '../layout/PortalLayout';
import axios from 'axios';
import { API_URL } from '../auth/constants';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Bicycle } from '../types/types';



export default function ItemList() {
    const auth = useAuth();
    const [bicycles, setBicycles] = useState<Bicycle[]>([]); // Especificamos el tipo Bicycle[]
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick1 = () => {
        const currentLocation = "/LocationBike";
        auth.saveCurrentLocation(currentLocation);
        navigate('/LocationBike');
    };

    const handleClick2 = () => {
        const currentLocation = "/PayPage";
        auth.saveCurrentLocation(currentLocation);
        navigate('/PayPage');
    };

    useEffect(() => {
        // Realiza la solicitud al servidor para obtener la lista de bicicletas
        const fetchBicycles = async () => {
            try {
                setBicycles(auth.currentBranch!.bicycles);
            } catch (error) {
                console.error('Error al obtener bicicletas:', error);
            }
        };

        fetchBicycles();
    }, []); // Se ejecutará solo una vez al montar el componente

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? bicycles.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex === bicycles.length - 1 ? 0 : prevIndex + 1));
    };

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
                            <button type="button" id="continuarButton" className="btn btn-danger" onClick={handleClick2}>
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
                <h1 className="text-2xl font-bold mb-4 text-center mx-auto">Seleccionar Bicicleta</h1>
                <div className="main-container">
                    <Carousel
                        activeIndex={activeIndex}
                        onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
                        className="carousel-lg"
                    >
                        {bicycles.map((bicycle) => (
                            <Carousel.Item key={bicycle._id}>
                                <div className="d-flex justify-content-around">
                                    <div className="card" style={{ width: '35rem' }}>
                                        <div className="d-flex">
                                            <img
                                                src={bicycle.image}
                                                className="card-img-top"
                                                alt={bicycle.name}
                                                style={{ objectFit: 'cover', height: '300px', flex: '1' }}
                                            />
                                            <div className="card-body" style={{ flex: '1' }}>
                                                <h5 className="card-title text-xl">{bicycle.name}</h5>
                                                <p className="card-text">{bicycle.description}</p>
                                                <p className="card-text text-xl">${bicycle.price}</p>
                                                <button className="btn btn-flat btn-danger mb-2 mx-2" onClick={() => auth.addToCart(bicycle)}>
                                                    Agregar
                                                </button>
                                                <button className="btn btn-flat btn-danger mb-2 mx-2" onClick={() => auth.removeFromCart(bicycle._id)}>
                                                    Quitar
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>

                    {/* Botones de navegación manual */}
                    <div className="d-flex justify-content-center mt-3">
                        <button className="btn btn-danger" onClick={prevSlide} style={{ color: 'white' }}>
                            Previous
                        </button>
                        <div style={{ width: '500px' }}></div> {/* Aumenté el espacio entre botones */}
                        <button className="btn btn-danger" onClick={nextSlide} style={{ color: 'white' }}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <footer className='orderfototer'>BikeRental@2023</footer>
        </PortalLayout>
    );
}
