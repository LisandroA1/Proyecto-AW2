import { Router } from "express"
import {readFile, writeFile} from 'fs/promises'
import { userInfo } from "os"
const fileProduct = await readFile('./data/product.json', 'utf-8')
const productData = JSON.parse(fileProduct)
const router = Router()
//buscar producto por precio

router.get('/todos', (req, res) => {
    try{
        res.status(200).json(productData);
    }catch(error){
        res.status(500).json({ error: 'Error al leer los datos de los productos' })
    }
});
router.get('/categoria/:categoria', async (req, res) => {
    const categoria = req.params.categoria;
    try {
        const productosFiltrados = productData.filter(producto => producto.categoria === categoria);
        console.log(productosFiltrados)
        res.status(200).json(productosFiltrados);
    } catch (error) {
        res.status(400).json({ error: 'Error al filtrar los productos por categoría' });
    }
});
router.get('/precios/:precio', (req, res)=>{
    const product_precio = req.params.precio
    const result = productData.find(e => e.precio == product_precio)
    try{
        if(result){
            res.status(200).json(result.titulo)
        }else{
            res.status(400).json('No se encontro el producto!')
        }
    }catch{
        res.send(500).json('Error al buscar el producto!')
    }
})

//buscar precio producto por nombre
router.get('/nombre/:nombre', (req, res)=>{
    const product_nombre = req.params.nombre
    const result = productData.find(e => e.titulo == product_nombre)
    try{
        if(result){
            res.status(200).json(result.precio)
        }else{
            res.status(300).json('No se encontro el producto!')
        }
    }catch{
        res.send(500).json('Error al buscar el producto!')
    }
})

//Actualizar precio producto

router.put('/precio/update/:id', (req, res) =>{
    const product_id = req.params.id
    const new_price = req.body.precio

    try{
        const index = productData.findIndex(e => e.id == product_id)
        if(index !== -1){
            productData[index].precio = new_price
            writeFile('./data/product.json', JSON.stringify(productData,null,2))
            res.status(200).json("Salario actualizado!!")
        }else{
            res.status(400).json("No se encontro al usuario")
        }
    }catch(error){
        res.status(500).json('Error al actualizar el salario')
    }
})

export default router