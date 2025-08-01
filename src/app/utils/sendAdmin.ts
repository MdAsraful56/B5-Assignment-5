import bcryptjs from 'bcryptjs';
import { envVars } from '../config/env';
import { IAuthProvider, Role } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

export const sendAdmin = async () => {
    try {
        const isSuperAdminExist = await User.findOne({
            email: envVars.ADMIN_EMAIL,
        });

        if (isSuperAdminExist) {
            console.log('Admin Already Exists!!');
            return;
        }

        const hashedPassword = await bcryptjs.hash(
            envVars.ADMIN_PASSWORD as string,
            Number(envVars.BCRYPT_SALT_ROUNDS)
        );

        const authProvider: IAuthProvider = {
            provider: 'credential',
            providerId: envVars.ADMIN_EMAIL,
        };

        const payload = {
            name: 'Admin',
            role: Role.ADMIN,
            email: envVars.ADMIN_EMAIL,
            password: hashedPassword,
            isValid: true,
            auths: [authProvider],
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const Admin = await User.create(payload);
        // console.log(Admin);
    } catch (error) {
        console.log(error);
    }
};
