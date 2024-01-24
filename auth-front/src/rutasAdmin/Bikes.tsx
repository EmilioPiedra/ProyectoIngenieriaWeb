import { useAuth } from '../auth/AuthProvider';
import AdminLayout from '../layout/AdminLayout';
import { API_URL } from '../auth/constants';
import { useState, useEffect } from 'react';
import { ErrorResponse, Outlet, useNavigate } from "react-router-dom";
import { AuthResponseError, Bicycle } from '../types/types';
import { Carousel } from 'react-bootstrap';

export default function Bikes() {
    const [bikes, setBikes] = useState<Bicycle[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | string>(0);
    const [image, setImage] = useState("");
    const [status, setStatus] = useState<'disponible' | 'ocupado' | undefined>(undefined);
    const [errorResponse, setErrorResponse] = useState("");
    const [editBikeId, setEditBikeId] = useState<string | undefined>(undefined);
    const auth = useAuth();

    if (auth.getUser()?.role !== 'admin') {
        return <><p>No tienes permisos para acceder a esta sección</p><Outlet /></>;
    }

    const fetchBicycles = async () => {
        try {
            const response = await fetch(`${API_URL}/bicycles`);
            if (response.ok) {
                const data = await response.json();
                setBikes(data);
            } else {
                const errorMessage = await response.json();
                setErrorResponse(`Error al obtener bicicletas: ${errorMessage.error}`);
            }
        } catch (error) {
            console.error('Error al obtener bicicletas:', error);
            setErrorResponse("Error interno al obtener bicicletas");
        }
    };

    useEffect(() => {
        fetchBicycles();
    }, []);

    const handleEdit = (bikeId: string) => {
        const bikeToEdit = bikes.find((bike) => bike._id === bikeId);
        if (bikeToEdit) {
            setEditBikeId(bikeId);
            setName(bikeToEdit.name);
            setDescription(bikeToEdit.description);
            setPrice(bikeToEdit.price.toString());
            setImage(bikeToEdit.image);
            setStatus(bikeToEdit.status);
        }
    };

    const clearFormFields = () => {
        setName("");
        setDescription("");
        setPrice(0);
        setImage("");
        setStatus(undefined);
        setEditBikeId(undefined);
    };

    const handleCreateOrUpdate = async () => {
        try {
            if (!image) {
                setErrorResponse("El campo 'image' es obligatorio");
                return;
            }

            const url = editBikeId ? `${API_URL}/bicycles/${editBikeId}` : `${API_URL}/bicycles`;
            const method = editBikeId ? "PUT" : "POST";

            const existingBike = editBikeId ? bikes.find((bike) => bike._id === editBikeId) : null;

            const mergedData = {
                name: name || (existingBike ? existingBike.name : ""),
                description: description || (existingBike ? existingBike.description : ""),
                price: price !== "" ? Number(price) : (existingBike ? existingBike.price : 0),
                image,
                status: status || (existingBike ? existingBike.status : undefined),
            };

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mergedData)
            });

            if (response.ok) {
                console.log(`Bike ${editBikeId ? 'actualizada' : 'insertada'}`);
                setErrorResponse("");
                fetchBicycles();
                clearFormFields();
            } else {
                const json = await response.json() as AuthResponseError;
                setErrorResponse(json.error || "Error al procesar la solicitud");
            }
        } catch (error) {
            console.error("Error en handleCreateOrUpdate:", error);
            setErrorResponse("Error interno al procesar la solicitud");
        }
    };

    const handleDelete = async (bikeId: string) => {
        try {
            const response = await fetch(`${API_URL}/bicycles/${bikeId}`, { method: 'DELETE' });
            if (response.ok) {
                fetchBicycles();
                clearFormFields();
            } else {
                setErrorResponse("Error al eliminar la bicicleta");
            }
        } catch (error) {
            console.error(error);
            setErrorResponse("Error interno al eliminar la bicicleta");
        }
    };

    const handleCancelEdit = () => {
        clearFormFields();
    };

    return (
        <AdminLayout>
            <div className="fondo-negro">
                <h1>Bikes</h1>
                <form onSubmit={(e) => { e.preventDefault(); handleCreateOrUpdate(); }}>
                    <label>Nombre:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <label>Descripción:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <label>Precio:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                    <label>Imagen:</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                    <label>Status:</label>
                    <select
                        value={status || ''}
                        onChange={(e) => setStatus(e.target.value as 'disponible' | 'ocupado')}
                    >
                        <option value="">Seleccione...</option>
                        <option value="disponible">Disponible</option>
                        <option value="ocupado">Ocupado</option>
                    </select>
                    <div>
                        <button type="submit">{editBikeId ? "Actualizar" : "Crear"} Bicicleta</button>
                        <button type="button" onClick={handleCancelEdit}>Cancelar</button>
                    </div>
                </form>
                <Carousel>
                    {bikes.map((bike) => (
                        <Carousel.Item key={bike._id}>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <img
                                        className="d-block w-50"
                                        src={bike.image}
                                        alt={bike.name}
                                    />
                                </div>
                                <div className="text-white p-4">
                                    <h3>{bike.name}</h3>
                                    <p>{bike.description}</p>
                                    <div>
                                        <button onClick={() => handleEdit(bike._id)}>Editar</button>
                                        <button onClick={() => handleDelete(bike._id)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
                {!!errorResponse && <p style={{ color: 'red' }}>{errorResponse}</p>}
            </div>
            <footer id='footerhome'>BikeRental@2023</footer>
        </AdminLayout>
    );
}
