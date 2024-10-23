import { Router } from "express"
import { stat, write, writeFileSync } from "fs"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import {readFile, writeFile} from 'fs/promises'

const router = Router()
const secret = process.env.SECRET

const fileUser = await readFile('./data/users.json', 'utf-8')
const userData = JSON.parse(fileUser)

/*router.post('/login', (req, res)=>{
    const userName = req.body.nombre
    const pass = req.body.contraseña

    const result = userData.find(e => e.nombre == userName && e.contraseña == pass)

    if(result){
        const data = {
            numeroId: result.id,
            nombre: result.nombre,
            apellido: result.apellido,
            email: result.email
        }
        res.status(200).json(data)
    }else{
        res.status(400).json(`${userName} no se encuentra`)
    }
})
*/
router.post('/login', async(req,res)=>{
    const userName = req.body.nombre
    const pass = req.body.contraseña

    const result = userData.find(e => e.nombre == userName)

    if(!result){
        return res.status(404).send({status:false})
    }

    const controlPass = bcrypt.compareSync(pass, result.contraseña)
    console.log(controlPass)

    if(!controlPass){
        return res.status(401).send({status:false})
    }

    const token = jwt.sign({ ...result}, secret , { expiresIn: 86400})

    res.status(200).json(token)
    
})

router.post('/create', async(req,res)=>{
    const {nombre, apellido, email, contraseña} = req.body    

    try {
        const hashedPass = bcrypt.hashSync(contraseña, 8)
        const id = userData.length > 0 ? userData[userData.length-1].id + 1 : 1
        userData.push({nombre, apellido, email, id, contraseña:hashedPass})

        writeFile('./data/users.json', JSON.stringify(userData,null,2))

        res.status(200).json({status:true})
        
    } catch (error) {
        res.status(400).json({status:false})
    }
})

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