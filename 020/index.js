"use strict";
const d = document;

// Secciones
const portada = d.getElementById("portada");
const signIn = d.getElementById("signIn");
const signUp = d.getElementById("signUp");
const registroCorrecto = d.getElementById("registroCorrecto");
const dentro = d.getElementById("dentro");

// Botones portada
const portadaSignIn = d.getElementById("portadaSignIn");
const portadaSignUp = d.getElementById("portadaSignUp");


const flechasAtras = Array.from(d.querySelectorAll(".flechaAtras"));

const inputs = Array.from(d.querySelectorAll("input"));
const labels = d.querySelectorAll("label");

// Botones secciones signIn y signUp
const buttonSignIn = d.querySelector("input[value='SIGN IN']");
const buttonSignUp = d.querySelector("input[value='SIGN UP']");

// Botones registro Correcto
const botonMenuPrincipal = d.getElementById("botonMenuPrincipal");
const botonAtras = d.getElementById("botonAtras");

// Botones y parrafos dentro
const pCoordenadas = d.querySelector("p.coordenadas");
const pInfo = d.querySelector("p.info");
const fetchLocation = d.querySelector(".fetchLocation");
const showMap = d.querySelector(".showMap");

let mapa = new Map();

// Esta parte crea el mapa de labels con su input correspondiente
labels.forEach((label) => {
    inputs.forEach((input) => {
        if(label.attributes.for.value === input.id) {
            mapa.set(label, input);
        }
    });
});


// Esto al cargar revisa si hay algún input activo para poner su label arriba y su color correspondiente
window.addEventListener("load", (e) => {
    for(let [label, input] of mapa.entries()) {
        if(input.value !== "") {
            label.classList.add("active");
            if(input.checkValidity()) {
                label.classList.add("valido");
                input.classList.add("valido");
            } else {
                label.classList.add("invalido");
                input.classList.add("invalido");
            }
        }
    }
});

d.addEventListener("click", (e) => {
    // Botones portada
    if(e.target === portadaSignIn) {
        portada.classList.add("oculto");
        signIn.classList.remove("oculto");
    }
    if(e.target === portadaSignUp) {
        portada.classList.add("oculto");
        signUp.classList.remove("oculto");
    }
    // Hay que hacer mejor esto de las flechas atrás. 
    for(let flecha of flechasAtras) {
        if(e.target === flechasAtras[2] || e.target === flechasAtras[2].firstElementChild) {
            dentro.classList.add("oculto");
            signIn.classList.remove("oculto");
        } else if(e.target === flecha || e.target === flecha.firstElementChild) {
            portada.classList.remove("oculto");
            signIn.classList.add("oculto");
            signUp.classList.add("oculto");
        }
    }

    // Comprobación para pasar del signIn a Dentro
    if(e.target === buttonSignIn && inputs.slice(0, 2).every(input => input.checkValidity())) {
        e.preventDefault();
        signIn.classList.add("oculto");
        dentro.classList.remove("oculto");
    }

    // signUP completo válido. 
    if(e.target === buttonSignUp && inputs.slice(3, 8).every(input => input.checkValidity())) {
        e.preventDefault();
        signUp.classList.add("oculto");
        registroCorrecto.classList.remove("oculto");
    }

    // De registro completado hacia menú principal o atrás.
    if(e.target === botonMenuPrincipal) {
        registroCorrecto.classList.add("oculto");
        portada.classList.remove("oculto");
    }
    if(e.target === botonAtras) {
        registroCorrecto.classList.add("oculto");
        signUp.classList.remove("oculto");
    }
    
    if(e.target === fetchLocation) {
        pInfo.innerHTML = "Fetching Location";
        navigator.geolocation.getCurrentPosition((objeto) => {
            pCoordenadas.innerHTML = `${objeto.coords.latitude}, ${objeto.coords.longitude}`;
            pInfo.innerHTML = "Localización encontrada";
            showMap.classList.remove("oculto");
            showMap.setAttribute("href", `https://www.google.com/maps/@${objeto.coords.latitude},${objeto.coords.longitude},15z`);
        }, (err) => {
            pInfo.innerHTML = `Error: `;
            console.log(err);
        });
    }
    if(e.target === showMap) {
        
    }
});

d.addEventListener("keyup", (e) => {
    for(let [label, input] of mapa) {
        if(e.target === input) {
            if(input.value === "") {
                label.classList.remove("valido");
                label.classList.remove("invalido");
                input.classList.remove("valido");
                input.classList.remove("invalido");
            } else if(input.checkValidity()) {
                label.classList.remove("invalido");
                label.classList.add("valido");
                input.classList.remove("invalido");
                input.classList.add("valido");
            } else {
                label.classList.remove("valido");
                label.classList.add("invalido");
                input.classList.remove("valido");
                input.classList.add("invalido");
            }
        }
    }
});

// Pone active cuando se le hace focus. 
d.addEventListener("focusin", (e) => {
    for(let [label, input] of mapa.entries()) {
        if(e.target === input || e.target === label) {
            label.classList.add("active");
        } else if(input.value === "") {
            label.classList.remove("active");
        }
    }
});

// Esto remueve la clase active de la label correspondiente al input al que se le acaba de hacer focusout, en caso de que esté vacío. 
d.addEventListener("focusout", (e) => {
    for(let [label, input] of mapa.entries()) {
        if((e.target === input || e.target === label) && input.value === "" && label.classList.contains("active")) {
            label.classList.remove("active");
        }
    }
});
