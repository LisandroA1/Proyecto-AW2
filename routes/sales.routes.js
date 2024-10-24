import { Router } from "express";
import { deletes } from "../db/actions/sales.actions.js";

const router = Router();

router.delete('/delete/:id', async (req, res) => {
    const sale_id = req.params.id;

    try {
        const result = await deletes(sale_id);  // Llama a la función deletes que elimina la venta
        if (result) {
            res.status(200).json('Venta Eliminada');
        } else {
            res.status(404).json('No se encontró la venta');
        }
    } catch (error) {
        res.status(500).json('Error al eliminar venta');
    }
});

export default router;
