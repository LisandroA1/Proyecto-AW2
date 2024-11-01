import { Router } from "express";
import { deletes, createOrder } from "../db/actions/sales.actions.js";

const router = Router();

router.delete('/delete/:id', async (req, res) => {
    const sale_id = req.params.id;

    try {
        const result = await deletes(sale_id);  
        if (result) {
            res.status(200).json('Venta Eliminada');
        } else {
            res.status(404).json('No se encontró la venta');
        }
    } catch (error) {
        res.status(500).json('Error al eliminar venta');
    }
});

router.post('/ventas', async (req, res) => {
    const { userId, products } = req.body;
    try {
        const newOrder = await createOrder(userId, products);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



export default router;
