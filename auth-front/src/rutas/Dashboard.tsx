import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import L, { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PortalLayout from '../layout/PortalLayout';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../auth/constants';
import { Branch } from '../types/types';


export default function Dashboard() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const mapRef = useRef<Map | null>(null);
  const { branches, setBranches } = auth

  useEffect(() => {
    auth.getBranches()
    console.log(auth.getUser());

  }, [])

  useLayoutEffect(() => {
    if (!mapRef.current) {
      const mapInstance = L.map('map').setView([-4.0079, -79.2115], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance);

      mapRef.current = mapInstance;
    }
  }, []);

  const handleAddressClick = (address: Branch) => {
    auth.setCurrentBranch(address);
    if (mapRef.current && auth.currentBranch?._id != address._id) {
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
        <div className="d-flex justify-content-end">
            <button type="button" id="regresarButton" className="btn btn-danger btn-block" onClick={handleClick} disabled={!auth.currentBranch}>
              Continuar
            </button>
          </div>
        </div>
      </div>
      <div className="address-list-container">
        <h2><b>Lugares disponibles Loja</b></h2>
        <ul className={'address-list'}>
          {branches.map((address, index) => (
            <li className={auth.currentBranch?._id == address._id ? 'address-list-selected' : ''} key={index} onClick={() => handleAddressClick(address)}>
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
