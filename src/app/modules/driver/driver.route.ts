import express from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { DriverController } from './driver.controller';

const router = express.Router();

router.get(
    '/available-rides',
    checkAuth('DRIVER', 'ADMIN'),
    DriverController.getAvailableRides
);

router.patch(
    '/pick-up-ride/:rideId',
    checkAuth('DRIVER'),
    DriverController.pickUpRide
);

router.patch(
    '/update-ride-status/:rideId',
    checkAuth('DRIVER'),
    DriverController.updateRideStatus
);

router.get('/my-rides', checkAuth('DRIVER'), DriverController.getMyRides);

export const DriverRoutes = router;
