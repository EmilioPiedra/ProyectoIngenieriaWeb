const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const authenticate = require('../auth-back/auth/authenticate');
const Bicycle = require('./schema/bicycle'); // Ajusta la ruta según tu estructura de carpetas
const bicyclesData = require('./auth/bicyclesData'); // Importa el arreglo
const BranchModel = require('./schema/branch');
const branchesData = require('./auth/branchesData')

require('dotenv').config();


const port = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());

async function main() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("conectado a mongoose")
}

main().catch(console.error);

app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));
app.use('/api/bicycles', require('./routes/bikes'));
app.use('/api/user', authenticate, require('./routes/users'));
app.use('/api/todos', authenticate, require('./routes/todos'));
app.use('/api/refresh-token', require('./routes/refreshToken'));
app.use('/api/signout', require('./routes/signout'));
app.use('/api/branch', authenticate, require('./routes/branch'));
app.use('/api/rental', authenticate, require('./routes/rental'));


app.get('/', (req, res) => {
    res.send('hello word');
}
);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
