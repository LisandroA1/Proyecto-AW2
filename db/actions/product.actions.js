import { connectToDatabase } from "../connection.js";
import Product from "../schemas/product.schema.js";

export const createProd = async ({ titulo, categoria, precio, imagen }) => {
    try {
        await connectToDatabase(); // Conecta a la base de datos
        const res = await Product.create({ titulo, categoria, precio, imagen }); // Crear producto correctamente
        console.log(res);
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.log(error);
    }



};

export const todos = async () => {
    try {
        await connectToDatabase(); // Conecta a la base de datos
        const res = await Product.find(); // Crear producto correctamente
        console.log(res);
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.log(error);
    }



};

export const buscarporcategoria = async (categoria) => {
    try {
        await connectToDatabase(); // Conecta a la base de datos
        const res = await Product.find({categoria: categoria}); 
        console.log(res);
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.log(error);
    }



};