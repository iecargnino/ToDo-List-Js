import { ToDo } from './todo.class';

export class ToDoList{

    constructor() {
        //this.all = []; // todos
        this.cargarLocalStorage();
    }

    nuevoToDo( todo ) {
        this.all.push( todo );
        this.guardarLocalStorage();
    }

    eliminarToDo( id ){
        this.all = this.all.filter( todo => todo.id != id );
        this.guardarLocalStorage();
    }

    marcarCompletado( id ){
        for ( const todo of this.all ) {
            if ( todo.id == id ) {
              todo.completado = !todo.completado;
              this.guardarLocalStorage();
              break;
            }
        }
    }

    eliminarCompletados() {
        this.all = this.all.filter( todo => !todo.completado );
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.all) );
    }

    cargarLocalStorage() {
        this.all = ( localStorage.getItem('todo') ) 
        ? JSON.parse( localStorage.getItem('todo') )
        : [];

        this.all = this.all.map( ToDo.fromJson );  
    }
}