import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import passport from 'passport';
import { envVars } from '../../config/env';
import AppError from '../../error/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { setAuthCookies } from '../../utils/setCookies';
import { createUserTokens } from '../../utils/userTokens';
import { IUser } from '../user/user.interface';
import { AuthServices } from './auth.service';

// using passport local way
const credentialsLogin = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate(
            'local',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async (error: any, user: any, info: any) => {
                if (error) {
                    return next(new AppError(401, error));
                }

                if (!user) {
                    return next(new AppError(401, info.message));
                }

                const userToken = await createUserTokens(user);

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password, ...rest } = user.toObject();

                setAuthCookies(res, userToken);

                sendResponse(res, {
                    success: true,
                    statusCode: httpStatus.OK,
                    message: 'User login  Successfully',
                    data: {
                        accessToken: userToken.accessToken,
                        refreshToken: userToken.refreshToken,
                        user: rest,
                    },
                });
            }
        )(req, res, next);
    }
);

const getNewAccessToken = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'No refresh Token is resived cookies.'
            );
        }

        const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);

        setAuthCookies(res, tokenInfo);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'New Access token Retrived Successfully',
            data: tokenInfo,
        });
    }
);

const logout = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'User logout  Successfully',
            data: null,
        });
    }
);

const resetPassword = catchAsync(
    async (
        req: Request & { user?: JwtPayload },
        res: Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: NextFunction
    ) => {
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const decodedToken = req.user;

        if (!decodedToken) {
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'User token is missing or invalid.'
            );
        }

        await AuthServices.resetPassword(
            oldPassword,
            newPassword,
            decodedToken
        );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'User Password Change  Successfully',
            data: null,
        });
    }
);

const googleCallbackController = catchAsync(
    async (
        req: Request & { user?: JwtPayload },
        res: Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: NextFunction
    ) => {
        let redirectTo = req.query.state ? (req.query.state as string) : '';
        if (redirectTo.startsWith('/')) {
            redirectTo = redirectTo.slice(1);
        }

        const user = req.user;

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found');
        }

        const tokenInfo = createUserTokens(user as Partial<IUser>);

        setAuthCookies(res, tokenInfo);

        res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);
    }
);

export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallbackController,
};
