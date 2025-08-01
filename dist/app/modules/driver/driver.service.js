"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const ride_model_1 = require("../ride/ride.model");
// import { IDriver } from './driver.interface';
// import { Driver } from './driver.model';
const getAvailableRides = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ride_model_1.Ride.find({ status: 'PENDING' });
    return result;
});
const pickUpRide = (req, res, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
user) => __awaiter(void 0, void 0, void 0, function* () {
    const rideId = req.params.rideId;
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Ride not found');
    }
    if (ride.status !== 'PENDING') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Ride is not available for pickup');
    }
    if (ride.driver) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Ride is already assigned to another driver');
    }
    // const driver = await Driver.create(payload);
    // console.log(user);
    const result = yield ride_model_1.Ride.findByIdAndUpdate(rideId, { status: 'PICKED', driver: user.userId }, { new: true });
    return result;
});
const updateRideStatus = (rideId, status) => __awaiter(void 0, void 0, void 0, function* () {
    if (status === 'COMPLETED' || status === 'CANCELLED') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `This ride is already ${status.toLowerCase()}`);
    }
    const result = yield ride_model_1.Ride.findByIdAndUpdate(rideId, { status }, { new: true });
    return result;
});
const getMyRides = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ride_model_1.Ride.find({ driver: driverId });
    return result;
});
exports.DriverService = {
    getAvailableRides,
    pickUpRide,
    updateRideStatus,
    getMyRides,
};
