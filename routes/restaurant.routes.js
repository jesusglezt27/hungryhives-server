const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant.model');
const Reservation = require('../models/reservation.model');

// Ruta para obtener todos los restaurantes
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.setHeader('Content-Type', 'application/json');
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para obtener un restaurante por ID
router.get('/:id', async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurante no encontrado' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para crear una reserva en un restaurante
router.post('/:id/reservations', async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const reservationData = req.body;

    // Verificar si el restaurante existe
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurante no encontrado' });
    }

    // Realizar las validaciones necesarias en los datos de la reserva
    if (!reservationData.name || !reservationData.date || !reservationData.time) {
      return res.status(400).json({ error: 'Faltan datos de la reserva' });
    }

    // Crear la reserva y guardarla en la base de datos
    const reservation = new Reservation({
      restaurant: restaurantId,
      name: reservationData.name,
      email: reservationData.email,
      date: reservationData.date,
      time: reservationData.time,
      partySize: reservationData.partySize
    });
    const savedReservation = await reservation.save();

    res.status(201).json({ message: 'Reserva creada exitosamente', reservation: savedReservation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
});

module.exports = router;
