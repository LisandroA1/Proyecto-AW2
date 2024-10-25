import { logIn } from "../api/login.api.js"; 
import { addSession } from "../utils/sessionstorage.controller.js";

const btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', async () => {
    const name = document.getElementById('txtName').value;
    const pass = document.getElementById('txtPass').value;

    if (name !== '' && pass !== '') {
        try {
            const user = await logIn(name, pass);

            if (user.status === false) {
                
                alert(user.message || 'No se encontró usuario');
            } else {
               
                addSession(user);
                window.location.href = "./pages/home.html";
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            alert('Error en el inicio de sesión. Inténtalo de nuevo.');
        }
    } else {
        alert('Campos requeridos');
    }
});






    