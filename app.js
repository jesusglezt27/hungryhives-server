const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();
require("./db");

const app = express();
require("./config")(app);

app.use(express.json());

// Configuración de CORS para permitir solicitudes desde un dominio específico
const corsOptions = {
  origin: 'http://localhost:3000', // Reemplaza con la URL de tu aplicación frontend
};

app.use(cors(corsOptions));

const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");
const restaurantRoutes = require("./routes/restaurant.routes");
const reservationRoutes = require("./routes/reservation.routes");
const { getUserById } = require('./controllers/user.controller');
const { getUsers } = require('./controllers/user.controller');

app.use("/api", indexRoutes);
app.use("/auth", authRoutes);
app.get('/api/users', getUsers);
app.get('/api/user/:id', getUserById);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/reservations", reservationRoutes);


// Ruta para servir archivos estáticos desde la carpeta 'build' de la aplicación React
app.use(express.static(path.join(__dirname, 'client/build')));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Ruta para servir la aplicación React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

require("./error-handling")(app);

module.exports = app;
