import mongoose from "mongoose";
const { Schema, models, model, ObjectId } = mongoose;

const SalesSchema = new Schema({
    id_usuario: {type: ObjectId, required:true, ref:"user"},
    fecha: {type: Date, required: true},
    total: {type: Number, required: true},
    productos: [{type: ObjectId, required: true, ref:"product"}]
    
})

const Sale = models.Sale || model('Sale', SalesSchema);


export default Sale