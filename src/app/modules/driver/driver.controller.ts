import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DriverService } from './driver.service';

const getAvailableRides = catchAsync(async (req: Request, res: Response) => {
    const result = await DriverService.getAvailableRides();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Available rides retrieved successfully',
        data: result,
    });
});

const pickUpRide = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new Error('User token is missing or invalid.');
    }

    const { rideId } = req.params;

    if (!rideId) {
        throw new Error('Ride ID is required.');
    }

    if (!rideId) {
        throw new Error('Ride ID is required.');
    }

    const result = await DriverService.pickUpRide(req, res, req.user);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Ride picked up successfully',
        data: result,
    });
});

const updateRideStatus = catchAsync(async (req: Request, res: Response) => {
    const { rideId } = req.params;
    const { status } = req.body;
    const result = await DriverService.updateRideStatus(rideId, status);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Ride status updated successfully',
        data: result,
    });
});

const getMyRides = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new Error('User token is missing or invalid.');
    }

    // console.log(req.user);

    // Type assertion to extend req.user with userId property
    const user = req.user as { userId: string };

    if (!user.userId) {
        throw new Error('User ID is missing.');
    }

    const result = await DriverService.getMyRides(user.userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'My rides retrieved successfully',
        data: result,
    });
});

export const DriverController = {
    getAvailableRides,
    pickUpRide,
    updateRideStatus,
    getMyRides,
};
