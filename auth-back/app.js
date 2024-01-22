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

    // Insertar datos de bicicletas
    try {
        //await Bicycle.insertMany(bicyclesData);
        console.log("Datos iniciales de bicicletas insertados correctamente");
    } catch (error) {
        //console.error("Error al insertar datos de bicicletas:", error);
    }

    // Insertar datos de sucursales
    try {
        //await BranchModel.insertMany(branchesData);
        console.log("Datos iniciales de sucursales insertados correctamente");
    } catch (error) {
        console.error("Error al insertar datos de sucursales:", error);
    }
}

main().catch(console.error);

const bicyclesRouter = require('./routes/getBikes');
app.use('/api/bicycles', bicyclesRouter);
app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));
app.use('/api/user', authenticate, require('./routes/users'));
app.use('/api/todos', authenticate, require('./routes/todos'));
app.use('/api/refresh-token', require('./routes/refreshToken'));
app.use('/api/signout', require('./routes/signout'));
app.use('/api/branch', require('./routes/branch'));
app.use('/api/rental', require('./routes/rental'));


app.get('/', (req, res) => {
    res.send('hello word');
}
);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
