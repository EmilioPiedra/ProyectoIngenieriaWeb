import { useAuth } from '../auth/AuthProvider';
import AdminLayout from '../layout/AdminLayout';
import { API_URL } from '../auth/constants';
import { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { AuthResponseError, Bicycle } from '../types/types';
import { Carousel, Col, Row, Form, Button, ListGroup } from 'react-bootstrap';

export default function Bikes() {
    const [bikes, setBikes] = useState<Bicycle[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | string>(0);
    const [image, setImage] = useState("");
    const [status, setStatus] = useState<'disponible' | 'ocupado' | undefined>(undefined);
    const [errorResponse, setErrorResponse] = useState("");
    const [editBikeId, setEditBikeId] = useState<string | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState("");
    const auth = useAuth();

    useEffect(() => {
        fetchBicycles();
    }, []);

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

    const filteredBikes = bikes.filter((bike) =>
        bike.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bike.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <Row className="fondo-negro">
                <Col md={3}>
                    <h1>Bikes</h1>
                    <Form onSubmit={(e) => { e.preventDefault(); handleCreateOrUpdate(); }}>
                        <Form.Group controlId="formName">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Descripción:</Form.Label>
                            <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Precio:</Form.Label>
                            <Form.Control type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>Imagen:</Form.Label>
                            <Form.Control type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status:</Form.Label>
                            <Form.Control as="select" value={status || ''} onChange={(e) => setStatus(e.target.value as 'disponible' | 'ocupado')}>
                                <option value="">Seleccione...</option>
                                <option value="disponible">Disponible</option>
                                <option value="ocupado">Ocupado</option>
                            </Form.Control>
                        </Form.Group>
                        <div>
                            <Button type="submit" style={{ backgroundColor: '#C5A76A', color: '#fff' }}>
                                {editBikeId ? "Actualizar" : "Crear"} Bicicleta
                            </Button>
                            <Button variant="secondary" type="button" onClick={handleCancelEdit}>Cancelar</Button>
                        </div>
                        <Form.Group controlId="formSearch">
                            <Form.Label>Buscar Bicicleta:</Form.Label>
                            <Form.Control type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </Form.Group>
                        <div>
                            <Button type="submit" style={{ backgroundColor: '#C5A76A', color: '#fff' }}>
                                {editBikeId ? "Actualizar" : "Crear"} Bicicleta
                            </Button>

                            <Button variant="secondary" type="button" onClick={handleCancelEdit}>Cancelar</Button>
                        </div>
                    </Form>
                </Col>
                <p></p>
                <Col md={8} style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <ListGroup>
                        {filteredBikes.map((bike) => (
                            <ListGroup.Item key={bike._id} className="list-group-item">
                                <Row className="d-flex justify-content-between">
                                    <Col>
                                        <img
                                            className="d-block w-50"
                                            src={bike.image}
                                            alt={bike.name}
                                        />
                                    </Col>
                                    <Col className="text-black p-4">
                                        <h3>{bike.name}</h3>
                                        <p>{bike.description}</p>
                                        <div>
                                            <Button onClick={() => handleEdit(bike._id)} style={{ backgroundColor: '#C5A76A', color: '#fff' }}>
                                                Editar
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDelete(bike._id)}>Eliminar</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    {!!errorResponse && <p style={{ color: 'red' }}>{errorResponse}</p>}
                </Col>
            </Row>
            <footer id='footerhome'>BikeRental@2023</footer>
        </AdminLayout>
    );
}
