const express = require('express');
const { jsonResponse } = require('../lib/jsonResponse');
const router = express.Router();
const user = require("../schema/user")

router.post('/', async (req, res) => {
    const { name, apellido, userName, pais, email, cedula, password, confirmPassword, fechaNacimiento } = req.body;
    if (!!!name || !!!apellido || !!!userName || !!!pais || !!!email || !!!cedula || !!!password || !!!confirmPassword || !!!fechaNacimiento) {
        return res.status(400).json(jsonResponse(400, { error: "Campos requeridos faltantes" }));
    }

    //crear usuario en la base de datos
    //const User = new user({ name, apellido, userName, pais, email, cedula, password, fechaNacimiento });
    try {
        const User = new user();
        const exists = await User.usernameExists(userName);

        if (exists) {
            return res.status(409).json(
                jsonResponse(409, {
                    error: "username already exists",
                })
            );
        }
        const newUser = new user({ name, apellido, userName, pais, email, cedula, password, fechaNacimiento });

        newUser.save();


        res.status(200).json(jsonResponse(200, { message: "Usuario creado correctamente" }));
    } catch (error) {
        return res.status(500).json(
            jsonResponse(500, {
                error: "Error creating user",
            })
        );
        //return next(new Error(err.message));

    }



});

module.exports = router;
