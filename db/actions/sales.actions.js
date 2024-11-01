
import { connectToDatabase } from "../connection.js";
import Sale from "../schemas/sales.schema.js";
import User from "../schemas/user.schema.js";
import Product from "../schemas/product.schema.js";


export const createOrder = async (userId, products) => {
    try {
        await connectToDatabase(); // Conecta a la base de datos

        // Busca el usuario por su ID
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Obtiene los productos y construye el objeto de productos detallados
        const productosDetallados = await Promise.all(products.map(async (prod) => {
            const productData = await Product.findById(prod.productId);
            if (!productData) {
                throw new Error('Producto no encontrado');
            }
            return {
                productId: prod.productId, // Almacena el ID del producto
                nombreProducto: productData.titulo, // Almacena el nombre del producto
                cantidad: prod.cantidad,
                precioUnitario: productData.precio,
            };
        }));

        const total = productosDetallados.reduce((acc, prod) => acc + prod.precioUnitario * prod.cantidad, 0);

        // Crea la nueva orden con el nombre del usuario
        const newOrder = await Sale.create({
            id_usuario: userId,
            nombreUsuario: user.nombre, // Almacena el nombre del usuario
            fecha: new Date(),
            total,
            productos: productosDetallados,
        });

        return newOrder;
    } catch (error) {
        throw new Error("Error al crear la orden: " + error.message);
    }
};





export const deletes = async (id) => {
    try {
        await connectToDatabase();  // Conectarse a la base de datos
        const res = await Sale.findByIdAndDelete(id);  
        if (!res) {
            throw new Error('No se encontró la venta');
        }
        return JSON.parse(JSON.stringify(res));  
    } catch (error) {
        console.log(error);
        throw new Error('Error al eliminar la venta');
    }
};
