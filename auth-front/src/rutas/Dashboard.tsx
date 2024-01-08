import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import PortalLayout from '../layout/PortalLayout';
import axios from 'axios';
import { API_URL } from '../auth/constants';
import { Carousel } from 'react-bootstrap';

// Definimos un tipo para representar la estructura de una bicicleta
interface Bicycle {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    // Añade otras propiedades según sea necesario
}

export default function Dashboard() {
    const auth = useAuth();
    const [bicycles, setBicycles] = useState<Bicycle[]>([]); // Especificamos el tipo Bicycle[]
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        // Realiza la solicitud al servidor para obtener la lista de bicicletas
        const fetchBicycles = async () => {
            try {
                const response = await axios.get<Bicycle[]>(`${API_URL}/bicycles`); // Especificamos el tipo Bicycle[]
                setBicycles(response.data);
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
            <h1>Dashboard de {auth.getUser()?.name}</h1>

            <div>
                <h2 className='hola'>Listado de Bicicletas</h2>
                <Carousel
                    activeIndex={activeIndex}
                    onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
                >
                    {bicycles.map((bicycle) => (
                        <Carousel.Item key={bicycle.id}>
                            <div className="d-flex justify-content-around">
                                <div className="card" style={{ width: '25rem' }}>
                                    <div className="d-flex">
                                        <img
                                            src={bicycle.image}
                                            className="card-img-top"
                                            alt={bicycle.name}
                                            style={{ objectFit: 'cover', height: '200px', flex: '1' }}
                                        />
                                        <div className="card-body" style={{ flex: '1' }}>
                                            <h5 className="card-title">{bicycle.name}</h5>
                                            <p className="card-text">{bicycle.description}</p>
                                            <p className="card-text">${bicycle.price}</p>
                                            <button className="btn btn-primary">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>

                {/* Botones de navegación manual */}
                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-primary" onClick={prevSlide}>
                        Previous
                    </button>
                    <button className="btn btn-primary ml-2" onClick={nextSlide}>
                        Next
                    </button>
                </div>
            </div>
        </PortalLayout>
    );
}
