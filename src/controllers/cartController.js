import express from "express";
import {
    createNewCartService,
    getCartByIdService,
    setProductIntoCartService,
    deleteProductInCartByIdService,
    replaceProductsInCartService,
    updateProductQuantityInCartService,
    deleteAllProductsInCartService
} from '../services/cartService.js';

// Importa el archivo de configuración de Winston
import logger from '../CONFIG/winston-config';

export const createNewCartController = async (req, res) => {
    try {
        const data = await createNewCartService();
        // Registra un mensaje de nivel 'debug' en el log
        logger.debug('Se creó un nuevo carrito.');
        return res.status(201).json(data);
    } catch (error) {
        // Registra un mensaje de nivel 'error' en el log
        logger.error(error);
        return res.json(error);
    }
};

export const getCartByIdController = async (req, res) => {
    try {
        const { cid } = req.params;
        const data = await getCartByIdService(cid);
        // Registra un mensaje de nivel 'debug' en el log
        logger.debug(`Se obtuvo el carrito con ID: ${cid}`);
        return res.status(201).json(data);
    } catch (error) {
        // Registra un mensaje de nivel 'error' en el log
        logger.error(error);
        return res.json(error);
    }
};

export const setProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.query;
        const data = await setProductIntoCartService(cid, pid, quantity);
        // Registra un mensaje de nivel 'debug' en el log
        logger.debug(`Se añadió el producto con ID: ${pid} al carrito con ID: ${cid}`);
        return res.status(201).json(data);
    } catch (error) {
        // Registra un mensaje de nivel 'error' en el log
        logger.error(error);
        return res.json(error);
    }
};

export const deleteProductInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const data = await deleteProductInCartByIdService(cid, pid);
        // Registra un mensaje de nivel 'debug' en el log
        logger.debug(`Se eliminó el producto con ID: ${pid} del carrito con ID: ${cid}`);
        return res.status(200).json({
            "status": "success",
            "detail": `Producto: ${pid} eliminado correctamente de carrito ${cid}`,
            "payload": data
        });
    } catch (error) {
        // Registra un mensaje de nivel 'error' en el log
        logger.error(error);
        return res.json(error);
    }
};

export const replaceProductsInCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const productsList = req.body;
        const data = await replaceProductsInCartService(cid, productsList);
        // Registra un mensaje de nivel 'debug' en el log
        logger.debug(`Se reemplazó la lista de productos en el carrito con ID: ${cid}`);
        return res.status(201).json({
            "status": "success",
            "detail": `Se agregó una nueva lista de productos en carrito: ${cid}`,
            "payload": data
        });
    } catch (error) {
        // Registra un mensaje de nivel 'error' en el log
        logger.error(error);
        return res.json(error);
    }
};

export const updateProductQuantityInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const data = await updateProductQuantityInCartService(cid, pid, quantity);
        // Registra un mensaje de nivel 'debug' en el log
        logger.debug(`Se actualizó la cantidad del producto con ID: ${pid} en el carrito con ID: ${cid}`);
        return res.status(201).json({
            "status": "success",
            "detail": `Se actualizó la cantidad del producto: ${pid} en carrito: ${cid}`,
            "payload": data
        });
    } catch (error) {
        // Registra un mensaje de nivel 'error' en el log
        logger.error(error);
        return res.json(error);
    }
};

export const deleteAllProductsInCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const data = await deleteAllProductsInCartService(cid);
        // Registra un mensaje de nivel 'debug' en el log
        logger.debug(`Se eliminaron todos los productos en el carrito con ID: ${cid}`);
        return res.status(201).json({
            "status": "success",
            "detail": `Se eliminaron los productos en carrito: ${cid}`,
            "payload": data
        });
    } catch (error) {
        // Registra un mensaje de nivel 'error' en el log
        logger.error(error);
        return res.json(error);
    }
};
