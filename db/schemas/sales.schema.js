
import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
    id_usuario: { type: mongoose.Schema.Types.ObjectId, required: true },
    fecha: { type: Date, default: Date.now },
    total: { type: Number, required: true },
    productos: [{
        productId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Mantén productId para los productos
        cantidad: { type: Number, required: true },
        precioUnitario: { type: Number, required: true }, // Si necesitas el precio unitario
        nombreProducto: { type: String, required: true }, // Si necesitas el nombre del producto
    }],
    nombreUsuario: { type: String, required: true },
});



const Sale = mongoose.model('Sale', saleSchema);
export default Sale;



