
import { addSession } from "../utils/sessionstorage.controller.js";

const btnLogin = document.getElementById('btnLogin')

const auth = async({name, pass}) =>{
    const user = await fetch('http://localhost:3000/user/login',{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"nombre":name, "contraseña" : pass})
    }).then((res)=>{
        if(!res.ok){
            throw new Error('Error en la peticion');
        }
        return res.json()
    }).catch(error=>{
        console.error('Error:', error)
        throw new Error('Error en la peticion');
    });


    return user
}

btnLogin.addEventListener('click', async()=>{
    const name = document.getElementById('txtName').value
    const pass = document.getElementById('txtPass').value

    if(name !== '' &&  pass !== ''){
        try{
            const user = await auth({name, pass})
           
            addSession(user)
            window.location.href="./pages/home.html"
            
        }catch(error){
            alert('No se encontro usuario')
        }
    }else{
        alert('Campos Requeridos')
    }
})


    