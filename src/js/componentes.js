import { ToDoList } from "../classes/todo-list.class";
import { ToDo } from "../classes/todo.class";
import { lista } from "../index";

// Elementos del DOM
const ul       = document.querySelector('.todo-list'); // ul
const inputTxt = document.querySelector('.new-todo'); // input con las tareas
const btnVaciar = document.querySelector('.clear-completed');
const btnFiltro = document.querySelector('.filters');
const linkFiltro = document.querySelectorAll('.filtro');



export const crearHtml = ( ToDo ) => {

    
    const html = `
        <li class="${ (ToDo.completado) ? 'completed' : '' }" data-id="${ ToDo.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (ToDo.completado) ? 'checked' : '' }>
                <label>${ ToDo.tarea }</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;

    const div = document.createElement('div');
    div.innerHTML = html;
    ul.append( div.firstElementChild );
    return div.firstElementChild;
}

inputTxt.addEventListener('keyup', ( e ) => {
    if ( e.keyCode === 13 && inputTxt.value.length > 0) {
        const nuevaTarea = new ToDo( inputTxt.value );
        lista.nuevoToDo( nuevaTarea ); 
        crearHtml( nuevaTarea );
        inputTxt.value = '';
    }
})

ul.addEventListener('click', ( e ) => {
    const nombrElemento = e.target.localName;
    const elementoLi    = e.target.parentElement.parentElement;
    const elementoId    = elementoLi.getAttribute('data-id');

    if (nombrElemento.includes('input')) {
        lista.marcarCompletado( ToDo.id );
        elementoLi.classList.toggle('completed');
    } else if ( nombrElemento.includes('button')) {
        lista.eliminarToDo( elementoId );
        ul.removeChild( elementoLi );
    }
})

btnVaciar.addEventListener('click', () => {
    lista.eliminarCompletados();
    for(let i = ul.children.length-1; i >= 0; i--) {
        const elemento = ul.children[i];
        if(elemento.classList.contains('completed')){
            ul.removeChild( elemento ); 
        }
    }
})

btnFiltro.addEventListener('click', (e) => {
    const filtro = e.target.text; 
    if( !filtro ) { return; }

    linkFiltro.forEach( elem => elem.classList.remove('selected') );
    e.target.classList.add('selected');

    for ( const elemento of ul.children ) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ){
            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
            break;
            
            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;    
        }

    }
})