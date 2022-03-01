"use strict";
const d = document;

const botonIzq = d.querySelector(".botonIzq");
const botonDer = d.querySelector(".botonDer");
const contenedorArticles = d.querySelector(".contenedorArticles");

const marcas = d.querySelectorAll(".marca");

let contador = 0;

// Esto hace que el alto de las barras verdes sea según el número que tiene
marcas.forEach((marca) => {
    marca.style.height = `${Number(marca.firstElementChild.innerHTML)}0%`;
});

d.addEventListener("click", (e) => {
    if(e.target === botonIzq && contador < 0) {
        if(botonDer.classList.contains("not-allowed")) {
            botonDer.classList.remove("not-allowed");
        }
        contador++;
        contenedorArticles.style.transform = `translateX(${contador * 8.33}%)`;
    }else if(contador === 0) {
        botonIzq.classList.add("not-allowed");
    }
    if(e.target === botonDer && contador > -9) {
        if(botonIzq.classList.contains("not-allowed")) {
            botonIzq.classList.remove("not-allowed");
        }
        contador--;
        contenedorArticles.style.transform = `translateX(${contador * 8.33}%)`;
    }else if(contador === -9) {
        botonDer.classList.add("not-allowed");
    }
});