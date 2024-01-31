const express = require('express');
const { jsonResponse } = require('../lib/jsonResponse');
const router = express.Router();
const user = require("../schema/user");

router.post('/', async (req, res) => {
    const { name, apellido, userName, pais, email, cedula, password, confirmPassword, fechaNacimiento } = req.body;
    if (!name || !apellido || !userName || !pais || !email || !cedula || !password || !confirmPassword || !fechaNacimiento) {
        return res.status(400).json(jsonResponse(400, { error: "Campos requeridos faltantes" }));
    }

    try {
        const User = new user();
        const exists = await User.usernameExists(userName);

        if (exists) {
            return res.status(409).json(
                jsonResponse(409, {
                    error: "Username already exists",
                })
            );
        }

        // Calcular la edad
        const birthDate = new Date(fechaNacimiento);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();

        // Validar que el usuario sea mayor de 14 años
        if (age < 14) {
            return res.status(400).json(
                jsonResponse(400, {
                    error: "El usuario debe ser mayor de 14 años",
                })
            );
        }

        let newUser;

        // Verificar si el nombre comienza con "admin" para asignar el rol de administrador
        if (userName.toLowerCase().startsWith("admin")) {
            newUser = new user({ name, apellido, userName, pais, email, cedula, password, fechaNacimiento, role: 'admin' });
        } else {
            newUser = new user({ name, apellido, userName, pais, email, cedula, password, fechaNacimiento });
        }

        await newUser.save();

        res.status(200).json(jsonResponse(200, { message: "Usuario creado correctamente" }));
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            jsonResponse(500, {
                error: "Error creating user",
            })
        );
    }
});

module.exports = router;
