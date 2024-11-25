/// variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBTN = document.querySelector('#vaciar-carrito');


/// Event Listeners
cargarEventsListeners();
function cargarEventsListeners(){
//Dispara cuando se agregacarro
cursos.addEventListener('click', comprarCursos);
//cuando se elimina un curso
carrito.addEventListener('click', eliminarCurso);
//cuando se quiere eliminar todos los cursos
vaciarCarritoBTN.addEventListener('click', vaciarCarrito);
//domcontentloador
document.addEventListener('DOMContentLoaded', leerLocalStorage);
}





///Functions
///Funcion para agregar curso al carrito
function comprarCursos(e){
    e.preventDefault();
    // Delegation para agregar carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        //enviar curso para tomar datos;
      leerDatosCurso(curso);
    }
}
///funcion para leer los datos del curso
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    //
    insetarCarrito(infoCurso);

}
//Muestra el curso en el carrito
function insetarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td> 
    <img src = "${curso.imagen}">
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
    <a href = "#" class = "borrar-curso" data-id = "${curso.id}">X</a>
    </td>
    `;
    listaCursos.appendChild(row);
    //alamacenar localStorage
    guardarCursosLocalStorage(curso);
}
///eliminar curso
function eliminarCurso(e){
    e.preventDefault();
    let curso, cursoID;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoID = curso.querySelector('a').getAttribute('data-id');
        
    }
    eliminarCursoLS(cursoID);
}
///vaciar carrito
function vaciarCarrito(){
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
 ///vacia ls
 vaciarLS();
    return false;   
}
//almacena en LocalStorage
function guardarCursosLocalStorage(curso){
    let cursos ;
    cursos = obtenerCursosLocalStorage();
    cursos.push(curso);
    localStorage.setItem('cursos', JSON.stringify(cursos));

}
//comprueba que haya cursos
function obtenerCursosLocalStorage(){
    let cursosLS;
    if(localStorage.getItem('cursos')===null){
        cursosLS = [];
    }else{
        cursosLS = JSON.parse( localStorage.getItem('cursos'));
    }
    return cursosLS;
}
//imprime los cursos de localStorage
function leerLocalStorage(){
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach(function (curso){
        //construir el template
        const row = document.createElement('tr');
    row.innerHTML = `
    <td> 
    <img src = "${curso.imagen}">
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
    <a href = "#" class = "borrar-curso" data-id = "${curso.id}">X</a>
    </td>
    `;
    listaCursos.appendChild(row);
    })
}
//elimina de ls
function eliminarCursoLS(curso){
    let cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(cursoLS,index){
        if(cursoLS.id === curso){
            cursosLS.splice(index, 1);
        }
    })
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}
//vacia Local Storage
function vaciarLS(){
localStorage.clear();
}