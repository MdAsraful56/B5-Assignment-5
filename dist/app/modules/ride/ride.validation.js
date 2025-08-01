"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRideZodSchema = exports.createRideZodSchema = void 0;
const zod_1 = require("zod");
exports.createRideZodSchema = zod_1.z.object({
    user: zod_1.z.string().nonempty({ message: "User ID can't be empty." }),
    dropLocation: zod_1.z
        .string()
        .min(2, { message: "Drop location can't be empty." })
        .max(100, { message: 'Drop location is too long.' }),
    pickupLocation: zod_1.z
        .string()
        .min(2, { message: "Pickup location can't be empty." })
        .max(100, { message: 'Pickup location is too long.' }),
    payment: zod_1.z
        .number()
        .positive({ message: 'Payment must be a positive number.' })
        .min(1, { message: 'Payment must be at least 1.' })
        .max(100000, {
        message: 'Payment must be less than or equal to 100000.',
    }),
    status: zod_1.z.enum(['PENDING', 'PICKED', 'COMPLETED']).default('PENDING'),
});
exports.updateRideZodSchema = zod_1.z.object({
    // user: z.string().nonempty({ message: "User ID can't be empty." }),
    dropLocation: zod_1.z
        .string()
        .min(2, { message: "Drop location can't be empty." })
        .max(100, { message: 'Drop location is too long.' })
        .optional(),
    pickupLocation: zod_1.z
        .string()
        .min(2, { message: "Pickup location can't be empty." })
        .max(100, { message: 'Pickup location is too long.' })
        .optional(),
    payment: zod_1.z
        .number()
        .positive({ message: 'Payment must be a positive number.' })
        .min(1, { message: 'Payment must be at least 1.' })
        .max(100000, {
        message: 'Payment must be less than or equal to 100000.',
    })
        .optional(),
    status: zod_1.z.enum(['PENDING', 'PICKED', 'COMPLETED']).optional(),
});
