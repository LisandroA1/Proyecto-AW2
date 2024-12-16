import { newUser } from "../api/login.api.js"

const registerForm = document.getElementById('registerForm')
const error = document.getElementById("error")

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const nombre = document.getElementById("nombre").value
    const apellido = document.getElementById("apellido").value
    const email = document.getElementById("email").value
    const contraseña = document.getElementById("contraseña").value
    try {
        const res = await newUser(nombre, apellido, email, contraseña)
        if (res.status !== false) {
            window.location.href = `http://localhost:3000/pages/home.html`
            console.log("Usuario registrado correctamente.")
        } else {
            error.textContent = res.message || "Error al registrar el usuario!"
        }
    } catch (error) {
        error.textContent = "Error al conectar con el servidor"
        console.error("Error en la solicitud:", error)
    }
})