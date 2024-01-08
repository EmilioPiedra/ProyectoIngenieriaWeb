// En tu archivo de rutas, por ejemplo, routes/bicycles.js
const express = require('express');
const router = express.Router();
const Bicycle = require("../schema/bicycle");

router.get('/', async (req, res) => {
    try {
        const bicycles = await Bicycle.find();
        res.status(200).json(bicycles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener bicicletas" });
    }
});

module.exports = router;
