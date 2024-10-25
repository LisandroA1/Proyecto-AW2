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

