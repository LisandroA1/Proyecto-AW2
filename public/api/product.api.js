import { API } from "./api.js";

export const newProduct = async(titulo, categoria, precio, imagen)=>{
    try {
        const res = await fetch(`${API}/product/create`,{
            method: 'POST',
            body: JSON.stringify({titulo, categoria, precio, imagen}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        return res

    } catch (error) {
        console.log(error)
    }
}

export const allProduct = async()=>{
    try {
        const res = await fetch(`${API}/product/todos`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
       
        const data = await res.json()
        return data

    } catch (error) {
        console.log(error)
    }
}

export const productCategoria = async(categoriaProducto)=>{
    try {
        const res = await fetch(`${API}/product/categoria/${categoriaProducto}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        if(data){
            return data
        }
        
    } catch (error) {
        console.log(error)
    }
}