import { z } from 'zod';

export const createRideZodSchema = z.object({
    user: z.string().nonempty({ message: "User ID can't be empty." }),
    dropLocation: z
        .string()
        .min(2, { message: "Drop location can't be empty." })
        .max(100, { message: 'Drop location is too long.' }),
    pickupLocation: z
        .string()
        .min(2, { message: "Pickup location can't be empty." })
        .max(100, { message: 'Pickup location is too long.' }),
    payment: z
        .number()
        .positive({ message: 'Payment must be a positive number.' })
        .min(1, { message: 'Payment must be at least 1.' })
        .max(100000, {
            message: 'Payment must be less than or equal to 100000.',
        }),
    status: z.enum(['PENDING', 'PICKED', 'COMPLETED']).default('PENDING'),
});

export const updateRideZodSchema = z.object({
    // user: z.string().nonempty({ message: "User ID can't be empty." }),
    dropLocation: z
        .string()
        .min(2, { message: "Drop location can't be empty." })
        .max(100, { message: 'Drop location is too long.' })
        .optional(),
    pickupLocation: z
        .string()
        .min(2, { message: "Pickup location can't be empty." })
        .max(100, { message: 'Pickup location is too long.' })
        .optional(),
    payment: z
        .number()
        .positive({ message: 'Payment must be a positive number.' })
        .min(1, { message: 'Payment must be at least 1.' })
        .max(100000, {
            message: 'Payment must be less than or equal to 100000.',
        })
        .optional(),
    status: z.enum(['PENDING', 'PICKED', 'COMPLETED']).optional(),
});
