import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

const ProductSchema = new Schema({
    titulo: {type: String, required:true, unique: true},
    categoria: {type: String, required: true},
    precio: {type: Number, required: true},
    imagen: {type: String, required: true}
    
})

const Product = models.Product || model('Product', ProductSchema);


export default Product