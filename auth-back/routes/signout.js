const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('signout route');
});

module.exports = router;
