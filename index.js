import express from 'express'
import {readFile, writeFile} from 'fs/promises'
import 'dotenv/config'

import productRouter from './routes/product.routes.js'
import salesRouter from './routes/sales.routes.js'
import userRouter from './routes/user.routes.js'

const app = express()

const port = process.env.PORT


app.listen(port, () =>{
    console.log(`Servidor levantado en puerto ${port}`)
})

app.use(express.static('./public'))
app.use(express.json());
app.use('/product', productRouter)
app.use('/sales', salesRouter)
app.use('/user', userRouter)



app.get('/' , (req, res) =>{
    res.send('Hola mundo 2')
})

app.get('/codigos' , (req, res) =>{
    res.send('js!!')
})

console.log("Hola mundo")