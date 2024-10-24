import { connectToDatabase } from "../connection.js";
import User from "../schemas/user.schema.js";

export const userLogin = async(nombre)=>{
    try {
        await connectToDatabase()
        const res = await User.findOne({ nombre })
        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
    }
}

export const newUser = async ({ nombre, apellido, email, contraseña }) => {
    try {
        await connectToDatabase();
        console.log("Conectado a la base de datos");
        
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log("El correo electrónico ya está registrado");
            throw new Error('El correo electrónico ya está registrado');
        }

        console.log("Creando usuario con los datos:", { nombre, apellido, email, contraseña });
        const res = await User.create({ nombre, apellido, email, contraseña });
        console.log("Usuario creado:", res);

        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.error("Error en newUser:", error.message);
        throw error;
    }
};
