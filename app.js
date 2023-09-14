const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();
require("./db");

const app = express();
require("./config")(app);

app.use(express.json());

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


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});


require("./error-handling")(app);

module.exports = app;
