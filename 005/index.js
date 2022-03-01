"use strict";

const d = document;
const header = d.querySelector("#header");
let botonMenu = d.querySelector(".fa-bars");
const menu = d.querySelector("#menu");
const capa = d.querySelector(".capa");

d.addEventListener("click", (e) => {

    /* Esta parte se encarga del comportamiento del botón de búsqueda y su vuelta atrás */
    if(header.children[2] !== undefined && e.target === header.children[2].children[0]) {
        header.children[2].outerHTML = "";
        header.children[1].outerHTML = `<input type="search" placeholder="Buscar">`;
        header.children[0].innerHTML = `<i class="fas fa-arrow-left"></i>`;
    } else if (header.children[0].children[0].classList.contains("fa-arrow-left") && (e.target === header.children[0].children[0] || Array.from(header.children).indexOf(e.target) === -1)) {
        header.children[0].innerHTML = `<i class="fas fa-bars"></i>`;
        header.children[1].outerHTML = `<h1>Adipisicing elit</h1>`;
        header.insertAdjacentHTML("beforeend", `<div id="iconoSearch">
        <i class="fas fa-search"></i>
    </div>`);
    }

    /* Esta parte se encarga del menú desplegable */
    botonMenu = d.querySelector(".fa-bars");
    if(e.target === botonMenu) {
        capa.style.display = "block";
        menu.style.display = "block";
        menu.style.transform = "translateX(0vw)";
        menu.style.position = "fixed";
    }
    if(e.target === capa) {
        menu.style.transform = "translate(-80vw)";
        capa.style.display = "none";
    }
});


