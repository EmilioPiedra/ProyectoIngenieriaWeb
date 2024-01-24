import { useState, useEffect } from 'react';
import { API_URL } from '../auth/constants';
import AdminLayout from '../layout/AdminLayout';
import { useAuth } from '../auth/AuthProvider';
import { Bicycle, Branch, AuthResponseError } from '../types/types';
import { Form, Button } from 'react-bootstrap';

export default function Branchs() {

    return (
        <AdminLayout>
            <div className="fondo-negro">
                <h1>Branches</h1>

            </div>
            <footer id='footerhome'>BikeRental@2023</footer>
        </AdminLayout>
    );
}
