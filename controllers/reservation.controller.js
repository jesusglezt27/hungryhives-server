const Reservation = require('../models/reservation.model');

// Controlador para obtener todas las reservas de un usuario por su ID
exports.getUserReservations = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Encuentra todas las reservas que correspondan a este usuario
    const reservations = await Reservation.find({ user: userId }).populate('restaurant');
    
    if (!reservations) {
      return res.status(404).json({ error: 'Reservas no encontradas' });
    }

    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener las reservas del usuario' });
  }
};

// Controlador para actualizar una reserva por su ID
exports.updateReservation = async (req, res) => {
  try {
    const reservationId = req.params.reservationId;
    const updatedData = req.body;

    const updatedReservation = await Reservation.findByIdAndUpdate(reservationId, updatedData, { new: true }).populate('restaurant');

    if (!updatedReservation) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    res.json(updatedReservation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar la reserva' });
  }
};

// Controlador para eliminar una reserva por su ID
exports.deleteReservation = async (req, res) => {
  try {
    const reservationId = req.params.reservationId;

    const deletedReservation = await Reservation.findByIdAndDelete(reservationId);

    if (!deletedReservation) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    res.json({ message: 'Reserva eliminada exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar la reserva' });
  }
};


