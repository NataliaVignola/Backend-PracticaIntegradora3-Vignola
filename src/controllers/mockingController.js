import express from "express";
import logger from '../CONFIG/winston-config';

const router = express.Router();

// Ruta para generar productos falsos
router.get('/mockingproducts', (req, res) => {
    // Registra un mensaje de nivel 'debug' en el log
    logger.debug('Solicitando generación de productos falsos.');
    const mockProducts = generateMockProducts();
    res.status(200).json(mockProducts);
});

// Función para generar productos falsos
function generateMockProducts() {
    const mockProducts = [];

    for (let i = 1; i <= 100; i++) {
        const mockProduct = {
            title: `Mock Product ${i}`,
            description: "Bolsa de café 250gr.",
            price: getRandomPrice(),
            thumbnail: "mock-thumbnail.jpg",
            code: i,
            stock: getRandomStock(),
            id: i,
            category: "250gr."
        };

        mockProducts.push(mockProduct);
    }

    // Registra un mensaje de nivel 'info' en el log
    logger.info('Se generaron productos falsos exitosamente.');
    return mockProducts;
}

function getRandomPrice() {
    return Math.floor(Math.random() * 1000) + 1;
}

function getRandomStock() {
    return Math.floor(Math.random() * 50) + 1;
}

export default router;
