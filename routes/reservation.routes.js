const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation.model');

// Ruta para obtener todas las reservas
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las reservas' });
  }
});

// Ruta para obtener una reserva por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).json({ error: 'Reserva no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la reserva' });
  }
});


module.exports = router;
