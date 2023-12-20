const express = require('express');
const { jsonResponse } = require('../lib/jsonResponse');
const router = express.Router();

router.post('/', (req, res) => {
    const { name, apellido, userName, pais, email, cedula, password, confirmPassword, fechaNacimiento } = req.body;
    if (!!!name || !!!apellido || !!!userName || !!!pais || !!!email || !!!cedula || !!!password || !!!confirmPassword || !!!fechaNacimiento) {
        return res.status(400).json(jsonResponse(400, { error: "Campos requeridos faltantes" }));
    }

    //crear usuario en la base de datos
    res.status(200).json(jsonResponse(200, { message: "Usuario creado correctamente" }));

    res.send('Signup route');
});

module.exports = router;
