"use strict";
const d = document; 
const botonMostrarMas = d.getElementById("mostrarMas");
const articulos = d.querySelectorAll(".contacto");
const cajaTexto = d.querySelector("#cajaTexto");
const contadorCaracteres = d.getElementById("contadorCaracteres");
const botonEnviar = d.querySelector("input[type='submit']");
console.log(botonEnviar);


// Cargar hilos mas antiguos: 
d.addEventListener("click", (e) => {
    if(e.target === botonMostrarMas) {
        botonMostrarMas.style.display = "none";
        articulos.forEach((art) => {
            if(art.classList.contains("oculto")) {
                art.classList.remove("oculto");
            }
        })
    }
    else if(e.target === botonEnviar) {
        e.preventDefault();
    }
});

// Contador caracteres:
function contarCaracteres(e) {
    contadorCaracteres.innerText = `${cajaTexto.value.length} / 255 CARACTERES USADOS`;
};
contarCaracteres();

d.addEventListener("focusin", (e) => {
    if(e.target === cajaTexto) {
        d.addEventListener("keyup", contarCaracteres);
    }
});
d.addEventListener("focusout", (e) => {
    if(e.target === cajaTexto) {
        d.removeEventListener("keyup", contarCaracteres);
    }
})
