
import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
    id_usuario: { type: mongoose.Schema.Types.ObjectId, required: true },
    nombreUsuario: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    total: { type: Number, required: true },
    productos: [{
        nombreProducto: { type: String, required: true }, // Si necesitas el nombre del producto
        productId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Mantén productId para los productos
        cantidad: { type: Number, required: true },
        precioUnitario: { type: Number, required: true }, // Si necesitas el precio unitario
        
    }],
    
});



const Sale = mongoose.model('Sale', saleSchema);
export default Sale;



