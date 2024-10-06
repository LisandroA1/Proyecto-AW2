import { Router } from "express"
import { stat } from "fs"

import {readFile, writeFile} from 'fs/promises'

const router = Router()

const fileUser = await readFile('./data/users.json', 'utf-8')
const userData = JSON.parse(fileUser)
router.post('/login', (req, res)=>{
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