const express = require('express');
const {
    getReservations,
    getReservation,
    createReservation,
    updateReservation,
    cancelReservation
} = require('../controllers/reservations/reservation.controller');

const router = express.Router();

const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.route('/')
    .get(getReservations)
    .post(createReservation);

router.route('/:id')
    .get(getReservation)
    .put(updateReservation);

router.put('/:id/cancel', cancelReservation);

module.exports = router;
