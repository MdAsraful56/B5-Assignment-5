import { Request, Response } from 'express';
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { Ride } from '../ride/ride.model';
// import { IDriver } from './driver.interface';
// import { Driver } from './driver.model';

const getAvailableRides = async () => {
    const result = await Ride.find({ status: 'PENDING' });
    return result;
};

const pickUpRide = async (
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any
) => {
    const rideId = req.params.rideId;

    const ride = await Ride.findById(rideId);

    if (!ride) {
        throw new AppError(httpStatus.NOT_FOUND, 'Ride not found');
    }

    if (ride.status !== 'PENDING') {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Ride is not available for pickup'
        );
    }

    if (ride.driver) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Ride is already assigned to another driver'
        );
    }

    // const driver = await Driver.create(payload);
    // console.log(user);

    const result = await Ride.findByIdAndUpdate(
        rideId,
        { status: 'PICKED', driver: user.userId },
        { new: true }
    );
    return result;
};

const updateRideStatus = async (
    rideId: string,
    status: 'COMPLETED' | 'CANCELLED'
) => {
    if (status === 'COMPLETED' || status === 'CANCELLED') {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `This ride is already ${status.toLowerCase()}`
        );
    }

    const result = await Ride.findByIdAndUpdate(
        rideId,
        { status },
        { new: true }
    );
    return result;
};

const getMyRides = async (driverId: string) => {
    const result = await Ride.find({ driver: driverId });
    return result;
};

export const DriverService = {
    getAvailableRides,
    pickUpRide,
    updateRideStatus,
    getMyRides,
};
