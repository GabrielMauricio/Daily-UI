"use strict";
const d = document;
const contenedorFecha = d.querySelector(".fecha");

const interruptores = Array.from(d.querySelectorAll(".interruptor"));

let fecha = new Date();
let lista = fecha.toDateString().split(" ");

let mapa = new Map();
interruptores.forEach((interruptor) => {
    mapa.set(interruptor, interruptor.firstElementChild);
});

contenedorFecha.innerHTML = `${lista[0]}, ${lista[1]} ${lista[2]}, ${lista[3]}`;

d.addEventListener("click", (e) => {
    for(let [interruptor, boton] of mapa.entries()) {
        if(e.target === interruptor || e.target === boton) {
            if(interruptor.classList.contains("apagado")) {
                interruptor.classList.remove("apagado");
                interruptor.classList.add("encendido");
            } else {
                interruptor.classList.remove("encendido");
                interruptor.classList.add("apagado");
            }
        }
    }
});