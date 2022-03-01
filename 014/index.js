"use strict";
const d = document; 

const contenedor = d.getElementById("contenedor");
const elementoHoras = d.getElementById("hours");
const elementoMinutos = d.getElementById("minutes");
const elementoSegundos = d.getElementById("seconds");
let botonReiniciar = null;

const formulario = d.getElementById("formulario");
const inputHoras = d.getElementById("inputHoras");
const inputMinutos = d.getElementById("inputMinutos");
const inputSegundos = d.getElementById("inputSegundos");
const botonIniciar = d.getElementById("botonIniciar");

let [horasValue, minutosValue, segundosValue] = [undefined, undefined, undefined];
let texto = "";

function correr(horas, minutos, segundos) {
    const identificador = setInterval(() => {

        texto = "";
        if(horas !== 0 || minutos !== 0 || segundos !== 0) {
            if(segundos === 0 && minutos !== 0) {
                segundos = 60;
                minutos--;
            } else if(segundos === 0 && minutos === 0 && horas !== 0) {
                segundos = 60;
                minutos = 59;
                horas--;
            }
            segundos--;

            dibujar(horas, minutos, segundos);
        } else {
            clearInterval(identificador);
            contenedor.insertAdjacentHTML("beforeend", `<p id="tiempoFinalizado">El tiempo ha finalizado.</p>`);
            contenedor.insertAdjacentHTML("beforeend", `<button type="button" id="botonReiniciar">Reiniciar</button>`);
            botonReiniciar = d.getElementById("botonReiniciar");

        }
    }, 1000);
}

function dibujar(horas, minutos, segundos) {
    // Esta función se encarga de mostrar el contador por consola y poner los números correctos en el visor. 
    texto += (horas < 10) ? `0${horas}` : `${horas}`;
    texto += ":";
    texto += (minutos < 10) ? `0${minutos}` : `${minutos}`;
    texto += ":";
    texto += (segundos < 10) ? `0${segundos}` : `${segundos}`;
    
    elementoHoras.children[0].innerText = texto[0];
    elementoHoras.children[1].innerText = texto[1];
    elementoMinutos.children[0].innerText = texto[3];
    elementoMinutos.children[1].innerText = texto[4];
    elementoSegundos.children[0].innerText = texto[6];
    elementoSegundos.children[1].innerText = texto[7];
}


d.addEventListener("click", (e) => {
    
    if(e.target === botonIniciar) {
        [horasValue, minutosValue, segundosValue] = [Number(inputHoras.value), Number(inputMinutos.value), Number(inputSegundos.value)];
    
        if(horasValue >= 0 && horasValue <= 23 && minutosValue >= 0 && minutosValue <= 59 && segundosValue >= 0 && segundosValue <= 59 && (horasValue !== 0 || minutosValue !== 0 || segundosValue !== 0)) { // Valores ingresados válidos

            e.preventDefault();
            if(botonIniciar.classList.contains("denegado")) {
                botonIniciar.classList.remove("denegado");
            }
            if(botonIniciar.nextElementSibling !== null) {
                formulario.removeChild(formulario.lastElementChild);
            }
            formulario.style.display = "none";
            contenedor.classList.remove("oculto");

            dibujar(horasValue, minutosValue, segundosValue);
            correr(horasValue, minutosValue, segundosValue);

        } else {
            e.preventDefault();
            botonIniciar.classList.add("denegado");
            if (botonIniciar.nextElementSibling === null) {
                formulario.insertAdjacentHTML("beforeend", `<p id="advertencia">Ingrese valores válidos para iniciar el conteo. </p>`);
            }
        }
    }

    if(e.target === botonReiniciar) {
        contenedor.removeChild(contenedor.lastElementChild);
        contenedor.removeChild(contenedor.lastElementChild);

        contenedor.classList.add("oculto");
        formulario.style.display = "flex";
    }
});

d.addEventListener("change", (e) => {
    if(e.target === inputHoras || e.target === inputMinutos || e.target === inputSegundos) {
        let [horasValue, minutosValue, segundosValue] = [Number(inputHoras.value), Number(inputMinutos.value), Number(inputSegundos.value)];
        if(horasValue < 0 || horasValue > 23 || minutosValue < 0 || minutosValue > 59 || segundosValue < 0 ||segundosValue > 59 || (horasValue === 0 && minutosValue === 0 && segundosValue === 0)) {
            if(!botonIniciar.classList.contains("denegado")) {
                botonIniciar.classList.add("denegado");
            }
            if(botonIniciar.nextElementSibling === null) {
                formulario.insertAdjacentHTML("beforeend", `<p id="advertencia">Ingrese valores válidos para iniciar el conteo. </p>`);
            }
        } else {
            if(botonIniciar.classList.contains("denegado")) {
                botonIniciar.classList.remove("denegado");
            }
            if(botonIniciar.nextElementSibling !== null) {
                formulario.removeChild(formulario.lastElementChild);
            }
        }
    }
});