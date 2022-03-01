"use strict";
const d = document;
const contenedorArticles = d.querySelector(".contenedorArticles");
let contador = 1;

setInterval(() => {
    contenedorArticles.style.transform = `translateX(${-contador * 33.33}%)`;
    contador++;
    if(contador === 3) {
        contador = 0;
    }
}, 3000);