import { Router } from "express"
import { userInfo } from "os"
import { createProd, todos, buscarporcategoria } from "../db/actions/product.actions.js"

const router = Router()
//buscar producto por precio

router.get('/todos', async(req, res) => {
    try{
        const result = await todos()
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({ error: 'Error al leer los datos de los productos' })
    }
});
router.get('/categoria/:categoria', async (req, res) => {
    const categoriaparams = req.params.categoria;
    try {
        const result = await buscarporcategoria(categoriaparams)
        console.log(result)
        res.status(200).json(result);
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
router.get('/categoria/:categoria', (req, res) => {
    const product_categoria = req.params.categoria.toLowerCase();  

    
    const result = productData.filter(e => e.categoria.toLowerCase() === product_categoria);

    try {
        if (result.length > 0) {
            res.status(200).json(result); 
        } else {
            res.status(404).json({ message: 'No se encontraron productos en esta categoría' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar los productos', error: error.message });
    }
});


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


router.post('/create', async(req,res)=>{
    const {titulo, categoria, precio, imagen} = req.body
    try{
        const result = await createProd({titulo, categoria, precio, imagen})
        console.log(result)
        res.status(200).json(result)
    }catch(error){
        res.status(400).json()
    }
})

export default router




