"use strict";
const d = document;
const imagenes = Array.from(d.querySelectorAll(".figureFoto img"));
const menu = d.querySelector(".menu");
console.log(menu);
let identificador = undefined;

const visores = Array.from(d.querySelectorAll(".visor"));
let mapaBotones = new Map(), mapaContadores = new Map();



// Mapas para lo de los botones
visores.forEach((visor) => {
    mapaBotones.set(visor.children[1], [visor.children[0], visor.children[2]]);
});

for(let contenedor of mapaBotones.keys()) {
    mapaContadores.set(contenedor, 0);
}

// Lo de que las imágenes se agranden cuando se les hace hover
d.addEventListener("mouseover", (e) => {
    if(imagenes.indexOf(e.target) !== -1) {
        identificador = setTimeout(() => {
            e.target.classList.add("encima");
            e.target.style.zIndex = "2";
        },200);
    }
});
d.addEventListener("mouseout", (e) => {
    if(imagenes.indexOf(e.target) !== -1) {
        e.target.classList.remove("encima");
        clearTimeout(identificador);
    }
});

d.addEventListener("transitionend", (e) => {
    if(window.getComputedStyle(e.target).width === "330px") {
        e.target.style.zIndex = "auto";
    }
});


// Lo del scroll en el visor. 

d.addEventListener("click", (e) => {
    for(let [contenedor, botones] of mapaBotones.entries()) {
        if((e.target === botones[0] || e.target === botones[0].firstElementChild || e.target === botones[0].firstElementChild.firstElementChild) && (mapaContadores.get(contenedor) < 0)) {
            mapaContadores.set(contenedor, mapaContadores.get(contenedor) + 1);
            contenedor.style.transform = `translate(${mapaContadores.get(contenedor) * 1650}px)`;
        }
        if((e.target === botones[1] || e.target === botones[1].firstElementChild || e.target === botones[1].firstElementChild.firstElementChild) && (mapaContadores.get(contenedor) > -2)) {
            mapaContadores.set(contenedor, mapaContadores.get(contenedor) - 1);
            contenedor.style.transform = `translate(${mapaContadores.get(contenedor) * 1650}px)`;
        }
    }
});

// Menú desplegable
d.addEventListener("keypress", (e) => {
    if(e.shiftKey && (e.key === "m" || e.key === "M")) {
        if(menu.classList.contains("active")) {
            menu.classList.remove("active");
        }else {
            menu.classList.add("active");
        }
    }
});