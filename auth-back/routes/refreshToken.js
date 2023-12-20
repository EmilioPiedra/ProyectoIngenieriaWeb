const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('refresh token route');
});

module.exports = router;
