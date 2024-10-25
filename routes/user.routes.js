import { Router } from "express"
import { stat, write, writeFileSync } from "fs"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { userLogin, newUser } from "../db/actions/user.actions.js"


const router = Router()
const secret = process.env.SECRET




router.post('/login', async (req, res) => {
    const userName = req.body.nombre;
    const pass = req.body.contraseña;

    const result = await userLogin(userName);

    if (!result) {
        return res.status(404).send({ status: false, message: 'Usuario no encontrado' });
    }

    const controlPass = bcrypt.compareSync(pass, result.contraseña);
    console.log(controlPass);

    if (!controlPass) {
        return res.status(401).send({ status: false, message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ ...result }, secret, { expiresIn: 86400 });
    res.status(200).json({ status: true, token, user: result }); 
});

router.post('/create', async (req, res) => {
    const { nombre, apellido, email, contraseña } = req.body;

    try {
        console.log("Datos recibidos para crear usuario:", { nombre, apellido, email, contraseña }); 
        
        const hashedPass = bcrypt.hashSync(contraseña, 8);
        console.log("Contraseña encriptada:", hashedPass); 
        
        const result = await newUser({ nombre, apellido, email, contraseña: hashedPass });
        console.log("Resultado al crear usuario:", result); 
        
        res.status(200).json(result);
    } catch (error) {
        console.error("Error en la creación de usuario:", error.message); 
        res.status(400).json({ status: false, message: error.message });
    }
});



router.get('/login/byId/:id', (req, res) =>{
    const id = parseInt(req.params.id)

    const result = userData.find(e => e.id == id)

    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json(`${id} no se encuentra`)
    }
})

export default router