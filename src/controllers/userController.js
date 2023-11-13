import express from 'express';
import { signupService, signinService, logoutService,changeUserRoleService } from '../services/userService.js';

import logger from '../config/winston-config.js';

export const signupController = async (req, res) => {
    try {
        // No es necesario almacenar el usuario en la sesión aquí

        // Registra un mensaje de nivel 'debug' en el log
        logger.debug('Usuario registrado correctamente');
        
        return res.status(201).json({
            status: "success",
            detail: "Usuario registrado correctamente",
            payload: {} // No es necesario devolver información sensible aquí
        });
    } catch (error) {
        // Registra un mensaje de nivel 'error' en el log
        logger.error(error);
        return res.status(500).json({ error });
    }
}

export const signinController = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).json({ status: 'error', msg: 'Credenciales inválidas' });
        }

        // No es necesario almacenar el usuario en la sesión aquí

        // Registra un mensaje de nivel 'debug' en el log
        logger.debug('Usuario inició sesión correctamente');
        
        return res.status(200).json({
            status: "success",
            detail: "Usuario inició sesión correctamente",
            payload: {} // No es necesario devolver información sensible aquí
        });
    } catch (error) {
        // Registra un mensaje de nivel 'error' en el log
        logger.error(error);
        return res.status(500).json({ error });
    }
}

export const logoutController = async (req, res) => {
    try {
        req.session.destroy(function (err) {
            if (err) {
                logger.error(err);
                return res.status(500).send('Error al cerrar sesión');
            } else {
                // Registra un mensaje de nivel 'debug' en el log
                logger.debug('Logout exitoso');
                return res.status(200).json({
                    status: "success",
                    details: "Logout success"
                });
            }
        });
    } catch (error) {
        // Registra un mensaje de nivel 'error' en el log
        logger.error(error);
        return res.status(500).json({ error });
    }
}

export const getCurrentUser = (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ status: 'error', msg: 'Usuario no autenticado' });
        }

        const currentUser = {
            firstName: req.user.first_name,
            lastName: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
        };

        // Registra un mensaje de nivel 'debug' en el log
        logger.debug('Usuario autenticado');
        
        return res.status(200).json({
            status: "success",
            detail: "Usuario autenticado",
            payload: currentUser,
        });
    } catch (error) {
        // Registra un mensaje de nivel 'error' en el log
        logger.error(error);
        return res.status(500).json({ error });
    }
}

//PI3 - Nueva función
export const changeUserRoleController = async (req, res) => {
    try {
        const { uid } = req.params;
        const newRole = req.body.role;
        const data = await changeUserRoleService(uid, newRole);
        // Registra un mensaje de nivel 'debug' en el log
        logger.debug(`Rol de usuario ${uid} actualizado a ${newRole}`);
        return res.status(200).json(data);
    } catch (error) {
        // Registra un mensaje de nivel 'error' en el log
        logger.error(error);
        return res.status(500).json({ error });
    }
}
