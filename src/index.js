import './styles.css';

import { ToDo, ToDoList } from './classes/index.class';
import { crearHtml } from './js/componentes';

export const lista = new ToDoList();

lista.all.forEach( crearHtml );
