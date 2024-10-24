import { connectToDatabase } from "../connection.js";
import Sale from "../schemas/sales.schema.js";

export const deletes = async (id) => {
    try {
        await connectToDatabase();  // Conectarse a la base de datos
        const res = await Sale.findByIdAndDelete(id);  // Elimina la venta por ID
        if (!res) {
            throw new Error('No se encontró la venta');
        }
        return JSON.parse(JSON.stringify(res));  // Retornar la venta eliminada o null si no existía
    } catch (error) {
        console.log(error);
        throw new Error('Error al eliminar la venta');
    }
};
