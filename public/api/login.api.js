import { API } from "./api.js";

export const logIn = async (name, pass) => {
    try {
        const response = await fetch(`${API}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ nombre: name, contraseña: pass }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        
        return data; 

    } catch (error) {
        console.log(error);
        return { status: false }; 
    }
};

export const newUser = async (nombre, apellido, email, contraseña) => {
    try {
        const res = await fetch(`${API}/user/create`, {
            method: 'POST',
            body: JSON.stringify({ nombre, apellido, email, contraseña}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        if (res.ok) {
            return data;
        } else {
            throw new Error(data.message || 'Error al registrar el usuario');
        }
    } catch (error) {
        console.log('Error:', error);
        return { status: false, message: error.message };
    }
};

