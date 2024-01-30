import React, { useState, useEffect } from 'react';
import { API_URL } from '../auth/constants';
import AdminLayout from '../layout/AdminLayout';
import { useAuth } from '../auth/AuthProvider';
import { Bicycle, Branch } from '../types/types';
import { Card, Form, Col, Row, Button } from 'react-bootstrap';

export default function Branches() {
    const [bikes, setBikes] = useState<Bicycle[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [name, setName] = useState("");
    const [lat, setLat] = useState<number | string>(0);
    const [lon, setLon] = useState<number | string>(0);
    const [selectedBikes, setSelectedBikes] = useState<string[]>([]);
    const [editBranchId, setEditBranchId] = useState<string | undefined>(undefined);
    const [errorResponse, setErrorResponse] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const auth = useAuth();

    useEffect(() => {
        fetchBicycles();
        fetchBranches();
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

    const fetchBranches = async () => {
        try {
            const response = await fetch(`${API_URL}/branch`);
            if (response.ok) {
                const data = await response.json();
                setBranches(data);
            } else {
                const errorMessage = await response.json();
                setErrorResponse(`Error al obtener direcciones: ${errorMessage.error}`);
            }
        } catch (error) {
            console.error('Error al obtener direcciones:', error);
            setErrorResponse("Error interno al obtener direcciones");
        }
    };

    const filteredBranches = branches.filter((branch) =>
        branch.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleToggleBike = (bikeId: string) => {
        setSelectedBikes((prevSelectedBikes) => {
            if (prevSelectedBikes.includes(bikeId)) {
                return prevSelectedBikes.filter((id) => id !== bikeId);
            } else {
                return [...prevSelectedBikes, bikeId];
            }
        });
    };

    const handleCreateOrUpdate = async () => {
        try {
            const data = {
                name,
                lat,
                lon,
                bicycles: selectedBikes,
            };

            const url = editBranchId
                ? `${API_URL}/branch/${editBranchId}`
                : `${API_URL}/branch`;

            const method = editBranchId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.getAccessToken()}`,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                fetchBranches();
                clearFormFields();
            } else {
                setErrorResponse("Error al crear/actualizar la sucursal");
            }
        } catch (error) {
            console.error(error);
            setErrorResponse(
                "Error interno al crear/actualizar la sucursal"
            );
        }
    };

    const clearFormFields = () => {
        setName("");
        setLat(0);
        setLon(0);
        setSelectedBikes([]);
        setEditBranchId(undefined);
    };

    const handleDelete = async (branchId: string) => {
        try {
            const response = await fetch(`${API_URL}/branch/${branchId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${auth.getAccessToken()}`,
                },
            });

            if (response.ok) {
                fetchBranches();
                clearFormFields();
            } else {
                setErrorResponse("Error al eliminar la sucursal");
            }
        } catch (error) {
            console.error(error);
            setErrorResponse("Error interno al eliminar la sucursal");
        }
    };

    const handleEdit = (branch: Branch) => {
        setName(branch.name);
        setLat(branch.lat);
        setLon(branch.lon);
        setSelectedBikes(branch.bicycles.map((bike) => bike._id));
        setEditBranchId(branch._id);
    };

    return (
        <AdminLayout>
            <div className="branches-container" style={{ color: 'white' }}>
                <h1>Branches</h1>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formLat">
                            <Form.Label>Latitud</Form.Label>
                            <Form.Control type="number" value={lat} onChange={(e) => setLat(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formLon">
                            <Form.Label>Longitud</Form.Label>
                            <Form.Control type="number" value={lon} onChange={(e) => setLon(e.target.value)} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group controlId="formBicycles">
                            <Form.Label>Bicicletas</Form.Label>
                            <div>
                                {bikes.map((bike) => (
                                    <Form.Check
                                        key={bike._id}
                                        type="checkbox"
                                        label={bike.name}
                                        checked={selectedBikes.includes(bike._id)}
                                        onChange={() => handleToggleBike(bike._id)}
                                    />
                                ))}
                            </div>
                        </Form.Group>
                    </Row>
                    {/* Nuevo campo de búsqueda */}
                    <Form.Group className="mb-1 col-md-6">
                        <Form.Label>Buscar Sucursal por Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre de la sucursal"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={handleCreateOrUpdate}>
                        {editBranchId ? "Actualizar Sucursal" : "Crear Sucursal"}
                    </Button>
                    <Button variant="secondary" type="button" onClick={clearFormFields}>
                        Cancelar
                    </Button>
                    {errorResponse && <p>{errorResponse}</p>}
                </Form>
                <div style={{ maxHeight: '500px ', overflowY: 'auto' }}>
                    {filteredBranches.map((branch) => (
                        <Card key={branch._id} className="mt-3">
                            <Card.Body>
                                <Card.Title>{branch.name}</Card.Title>
                                <Card.Text>
                                    <strong>Latitud:</strong> {branch.lat}<br />
                                    <strong>Longitud:</strong> {branch.lon}<br />
                                    <strong>Bicicletas:</strong> {branch.bicycles.map(bike => bike.name).join(', ')}
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleEdit(branch)}>
                                    Editar
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(branch._id)}>
                                    Eliminar
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
            <footer>BikeRental@2023</footer>
        </AdminLayout>
    );
}