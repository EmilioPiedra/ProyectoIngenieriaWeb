import React, { useState, useEffect } from 'react';
import { API_URL } from '../auth/constants';
import AdminLayout from '../layout/AdminLayout';
import { useAuth } from '../auth/AuthProvider';
import { Bicycle, Branch } from '../types/types';

export default function Branches() {
    const [bikes, setBikes] = useState<Bicycle[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [name, setName] = useState("");
    const [lat, setLat] = useState<number | string>(0);
    const [lon, setLon] = useState<number | string>(0);
    const [selectedBikes, setSelectedBikes] = useState<string[]>([]);
    const [editBranchId, setEditBranchId] = useState<string | undefined>(undefined);
    const [errorResponse, setErrorResponse] = useState("");
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
                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Latitud</label>
                    <input
                        type="number"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    />
                </div>
                <div>
                    <label>Longitud</label>
                    <input
                        type="number"
                        value={lon}
                        onChange={(e) => setLon(e.target.value)}
                    />
                </div>
                <div>
                    <label>Bicicletas</label>
                    {bikes.map((bike) => (
                        <div key={bike._id}>
                            <input
                                type="checkbox"
                                checked={selectedBikes.includes(bike._id)}
                                onChange={() => handleToggleBike(bike._id)}
                            />
                            <label>{bike.name}</label>
                        </div>
                    ))}
                </div>
                <div>
                    <button onClick={handleCreateOrUpdate}>
                        {editBranchId ? "Actualizar Sucursal" : "Crear Sucursal"}
                    </button>
                    <button onClick={clearFormFields}>Cancelar</button>
                </div>
                {errorResponse && <p>{errorResponse}</p>}
                <div>
                    {branches.map((branch) => (
                        <div key={branch._id}>
                            <p>{branch.name}</p>
                            <button onClick={() => handleEdit(branch)}>
                                Editar
                            </button>
                            <button onClick={() => handleDelete(branch._id)}>
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <footer>BikeRental@2023</footer>
        </AdminLayout>
    );
}
