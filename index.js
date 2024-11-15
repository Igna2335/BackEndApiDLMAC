require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const routes = require('./routes');
const cors = require('cors'); // Importa cors



const app = express();

app.use(express.json());



app.use(cors()); // Permite todas las solicitudes de cualquier origen


// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOSTL,
  user: process.env.DB_USERL,
  password: process.env.DB_PASSWORDL,
  database: process.env.DB_DATABASEL,
  port: process.env.DB_PORTL
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Usar las rutas, pasando la conexión a la base de datos
app.use('/api', routes(db));

// Iniciar el servidor en el puerto especificado
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

module.exports = { app, db };
