import express from "express";
import { getProductByIdService, getProductsService, setNewProductService, updateProductService, deleteProductService } from "../services/productService.js";

import logger from '../CONFIG/winston-config';

export const getProductsController = async (req, res) => {
    try {
        const { limit = 10, category = 'all', sort = 0 } = req.query;
        const data = await getProductsService(Number(limit), category, sort);
        // Registra un mensaje de nivel 'debug' en el log
        logger.debug('Obteniendo productos.');
        return res.status(200).json(data);
    } catch (error) {
        // Registra un mensaje de nivel 'error' en el log
        logger.error(error);
        return res.json({ error });
    }
}

export const getProductByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getProductByIdService(id);
        // Registra un mensaje de nivel 'debug' en el log
        logger.debug(`Obteniendo producto por ID: ${id}`);
        return res.status(200).json(data);
    } catch (error) {
        // Registra un mensaje de nivel 'error' en el log
        logger.error(error);
        return res.json({ error });
    }
}

export const postNewProductController = async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, category } = req.body;
        const owner = req.user; // PI3- Asignar el propietario como el usuario actual
        const data = await setNewProductService(title, description, price, thumbnail, code, stock, category, owner);
    } catch (error) {
        // Registra un mensaje de nivel 'error' en el log
        logger.error(error);
        return res.json({ error });
    }
}

export const updateNewProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const data = await updateProductService(id, newData);
        // Registra un mensaje de nivel 'debug' en el log
        logger.debug(`Actualizando producto por ID: ${id}`);
        return res.status(201).json(data);
    } catch (error) {
        // Registra un mensaje de nivel 'error' en el log
        logger.error(error);
        return res.json({ error });
    }
}

export const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await deleteProductService(id);
        // Registra un mensaje de nivel 'debug' en el log
        logger.debug(`Eliminando producto por ID: ${id}`);
        return res.status(201).json(data);
    } catch (error) {
        // Registra un mensaje de nivel 'error' en el log
        logger.error(error);
        return res.json({ error });
    }
}
