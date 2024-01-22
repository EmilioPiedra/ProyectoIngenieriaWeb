const express = require('express');
const { jsonResponse } = require('../lib/jsonResponse');
const branch = require('../schema/branch');
const router = express.Router();
const authenticate = require('../auth/authenticate');

router.get('/', async (req, res) => {
    console.log(req.user);
    res.status(200).json(jsonResponse(200, await branch.find().populate('bicycles')));
});

router.post('/', async (req, res) => {
    try {
        const created = await branch.create(req.body);
        res.status(200).json(jsonResponse(200, created));
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;