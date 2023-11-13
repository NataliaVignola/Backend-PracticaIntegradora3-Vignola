import express from "express";
import customErrorDictionary from "../middleware/customErrorDictionary.js";  // Importa el diccionario de errores del proyecto
import { getProductByIdService, updateProductService } from "../services/productService.js";

// Importa el archivo de configuración de Winston
import logger from '../CONFIG/winston-config';

const router = express.Router();

router.post('/:id/purchase', async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body; 

        // Obtén el producto por ID
        const product = await getProductByIdService(id);

        if (!product) {
            // Registra un mensaje de nivel 'debug' en el log
            logger.debug('Producto no encontrado.');
            return res.status(404).json({ error: customErrorDictionary.PRODUCT_NOT_FOUND });
        }

        // Verifica si hay suficiente stock
        if (product.stock < quantity) {
            // Registra un mensaje de nivel 'debug' en el log
            logger.debug('Stock insuficiente.');
            return res.status(400).json({ error: customErrorDictionary.INSUFFICIENT_STOCK });
        }

        // Actualiza el stock del producto
        const newStock = product.stock - quantity;
        const updatedProduct = await updateProductService(id, { stock: newStock });

        // Registra un mensaje de nivel 'info' en el log
        logger.info(`Compra realizada para el producto: ${id}`);
        return res.status(200).json(updatedProduct);
    } catch (error) {
        // Registra un mensaje de nivel 'error' en el log
        logger.error(error);
        return res.status(500).json({ error });
    }
});

export default router;
