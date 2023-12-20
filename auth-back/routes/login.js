const express = require('express');
const { jsonResponse } = require('../lib/jsonResponse');
const router = express.Router();

router.post('/', (req, res) => {
    const { userName, password } = req.body;
    if (!!!userName || !!!password) {
        return res.status(400).json(jsonResponse(400, { error: "Campos requeridos faltantes" }));
    }

    //autenticar usuario
    const accessToken = "access_token"
    const refreshToken = "refresh_token"
    const user = {
        id: '1',
        name: 'juan',
        userName: 'xxx',
    }

    res.status(200).json(jsonResponse(200, { user, accessToken, refreshToken }));

    res.send('Signup route');
});

module.exports = router;
