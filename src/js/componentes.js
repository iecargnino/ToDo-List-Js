
import '../css/componentes.css';

export const saludar = ( nombre ) => {

    console.log( 'Saludo iniciado');
    const h1 = document.createElement('h1');
    h1.innerText = `Hola ${ nombre }, cómo estás?`;
    document.body.append(h1);

}