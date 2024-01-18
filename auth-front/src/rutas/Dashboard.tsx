import React, { useLayoutEffect, useRef, useState } from 'react';
import L, { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PortalLayout from '../layout/PortalLayout';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface Address {
  name: string;
  lat: number;
  lon: number;
}

const addressList: Address[] = [
  { name: 'Dirección 1', lat: -3.996, lon: -79.206 },
  { name: 'Dirección 2', lat: -3.997, lon: -79.207 },
  { name: 'Dirección 3', lat: -3.998, lon: -79.208 },
  { name: 'Dirección 4', lat: -3.999, lon: -79.209 },
  { name: 'Dirección 5', lat: -4.000, lon: -79.210 },
  { name: 'Dirección 6', lat: -4.001, lon: -79.211 },
  { name: 'Dirección 7', lat: -4.002, lon: -79.212 },
  { name: 'Dirección 8', lat: -4.003, lon: -79.213 },
  { name: 'Dirección 9', lat: -4.004, lon: -79.214 },
  { name: 'Dirección 10', lat: -4.005, lon: -79.215 },
  { name: 'Dirección 11', lat: -4.006, lon: -79.216 },
  { name: 'Dirección 12', lat: -4.007, lon: -79.217 },
  // Agrega más direcciones según sea necesario
];


export default function Dashboard() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const mapRef = useRef<Map | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useLayoutEffect(() => {
    if (!mapRef.current) {
      const mapInstance = L.map('map').setView([-4.0079, -79.2115], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance);

      mapRef.current = mapInstance;
    }
  }, []);

  const handleAddressClick = (address: Address) => {
    setSelectedAddress(address);
    if (mapRef.current) {
      mapRef.current.setView([address.lat, address.lon], 25); // Establece un nivel de zoom personalizado
      L.marker([address.lat, address.lon]).addTo(mapRef.current)
        .bindPopup(address.name)
        .openPopup();
    }
  };
  const handleClick = () => {
    const currentLocation = '/LocationBike'; // Obtén la ruta actual dinámicamente
    auth.saveCurrentLocation(currentLocation);
    navigate('/LocationBike');
  };

  return (
    <PortalLayout>
      
      <div className="container">
        <div className="row">
          <div className="col-6">
            <button type="button" id="regresarButton" className="btn btn-danger btn-block" onClick={handleClick}>
              Continuar
            </button>
          </div>
        </div>
      </div>
      <div className="address-list-container">
        <h2><b>Lugares disponibles Loja</b></h2>
        <ul className="address-list">
          {addressList.map((address, index) => (
            <li key={index} onClick={() => handleAddressClick(address)}>
              {address.name}
            </li>
          ))}
        </ul>
      </div>
      <div id="map" className="map-container"></div>
      <footer className='orderfototer'>BikeRental@2023</footer>
    </PortalLayout>
  );
}
