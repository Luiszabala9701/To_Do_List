const btnCrear = document.getElementById('btn-crear');
const containerTasks = document.getElementById('container-tasks');

// Cargar datos almacenados en localStorage al cargar la página
window.addEventListener('load', () => {
    const datosGuardados = localStorage.getItem('tareas');
    if (datosGuardados) {
        containerTasks.innerHTML = datosGuardados;

        // Asignar event listeners después de cargar los datos del localStorage
         asignarEventListeners();
    }
});

btnCrear.addEventListener('click', () => {
    // Obtener el valor de la nueva tarea
    const nuevaTarea = prompt('Ingrese una tarea nueva: ');

    if (!nuevaTarea || nuevaTarea.trim() === '' || nuevaTarea.length > 40) {
        alert('¡Ingrese una tarea válida con menos de 40 caracteres!');
        return;
    }

    // Crear elementos para la nueva tarea
    const nuevaTareaElemento = document.createElement('li');
    const nuevaTareaBoton = document.createElement('div');

    // Asignar IDs únicos a la tarea y el botón de eliminación
    const tareaID = 'task_' + Date.now();
    nuevaTareaElemento.id = tareaID;
    nuevaTareaBoton.id = tareaID + 'B';

    // Dar formato al texto de la tarea
    nuevaTareaElemento.textContent = nuevaTarea.charAt(0).toUpperCase() + nuevaTarea.slice(1).toLowerCase();
    nuevaTareaBoton.textContent = 'X';
    nuevaTareaBoton.classList.add('btn-eliminar');

    // Agregar la tarea y el botón de eliminación al contenedor
    containerTasks.appendChild(nuevaTareaElemento);
    containerTasks.appendChild(nuevaTareaBoton);

    // Agregar listeners de eventos para marcar como completada y eliminar
    nuevaTareaElemento.addEventListener('click', marcarComoCompletada);
    nuevaTareaBoton.addEventListener('click', eliminarTarea);

    // Guardar los datos actualizados en localStorage
    guardarTareasEnLocalStorage();
});

// Función para marcar una tarea como completada
function marcarComoCompletada(event) {
    const tareaSeleccionada = event.target;
    if (!tareaSeleccionada.classList.contains('completada')) {
        tareaSeleccionada.classList.add('completada');
    } else {
        tareaSeleccionada.classList.remove('completada');
    }
    guardarTareasEnLocalStorage();
}

// Función para eliminar una tarea
function eliminarTarea(event) {
    const tareaSeleccionada = event.target;
    const idTarea = tareaSeleccionada.id.replace('B', '');
    const tareaParaEliminar = document.getElementById(idTarea);
    tareaParaEliminar.remove();
    tareaSeleccionada.remove();
    guardarTareasEnLocalStorage();
}

// Función para asignar event listeners a las tareas existentes
function asignarEventListeners() {
    const tareas = document.querySelectorAll('.container-tasks li');
    const botonesEliminar = document.querySelectorAll('.container-tasks .btn-eliminar');

    tareas.forEach(tarea => {
        tarea.addEventListener('click', marcarComoCompletada);
    });

    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarTarea);
    });
}

// Función para guardar los datos en localStorage
function guardarTareasEnLocalStorage() {
    const tareasHTML = containerTasks.innerHTML;
    localStorage.setItem('tareas', tareasHTML);
}