import UserModel from "../models/User.js";
import bcrypt from 'bcryptjs';

export const signupService = async (first_name, last_name, email, age, password) => {
    try {
        if (!first_name || !last_name || !email || !age || !password) throw { name: 'client error', httpcode: 404, description: 'Todas las credenciales son necesarias' }

        const existsUser = await UserModel.findOne({ email: email })
        if (existsUser) throw { name: 'client error', httpcode: 404, description: 'Ya existe ese email registrado' }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = await UserModel.create({
            first_name: first_name,
            last_name: last_name,
            age: age,
            email: email,
            password: hashedPassword
        })

        return user;
    } catch (error) {
        throw error;
    }
}

export const signinService = async (email, password) => {
    try {
        if (!email || !password) throw { name: 'client error', httpcode: 404, description: 'Todas las credenciales son necesarias' }

        const user = await UserModel.findOne({ email: email })
        if (!user) throw { name: 'client error', httpcode: 404, description: 'Usuario no encontrado' }

        const validatePassword = bcrypt.compareSync(password, user.password)

        if (!validatePassword) throw { name: 'client error', httpcode: 404, description: 'Credenciales inválidas' }

        return user;
    } catch (error) {
        throw error;
    }
}

export const logoutService = (req) => {
    try {
        // Cierra la sesión del usuario
        req.logout();
    } catch (error) {
        throw error;
    }
}

//PI3 - Nueva función
export const changeUserRoleService = async (uid, newRole) => {
    try {
        const user = await user.findById(uid);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        user.role = newRole;
        await user.save();

        return {
            status: 'success',
            detail: `Rol de usuario ${uid} actualizado a ${newRole}`,
        };
    } catch (error) {
        throw error;
    }
}