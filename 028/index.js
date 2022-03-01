"use strict";
const d = document;
const inputs = Array.from(d.querySelectorAll("input"));
const labels = Array.from(d.querySelectorAll("label"));
const cajaMessage = d.getElementById("message");
let mapaLabels = new Map();


for(let input of inputs) {
    for(let label of labels) {
        if(label.attributes["for"].value === input.attributes["id"].value){
            mapaLabels.set(input, label);
        }
    }
}

d.addEventListener("focusin", (e) => {
    if(inputs.indexOf(e.target) !== -1 && e.target !== inputs[4]) {
        mapaLabels.get(e.target).classList.add("active");
    }
});

d.addEventListener("focusout", (e) => {
    if(inputs.indexOf(e.target) !== -1 && e.target !== inputs[4] && e.target.value === "") {
        mapaLabels.get(e.target).classList.remove("active");
    }
});

d.addEventListener("keyup", (e) => {
    if(inputs.indexOf(e.target) !== -1) {
        
        if(e.target.checkValidity()) {
            e.target.classList.remove("invalido");
            e.target.classList.add("valido");
            mapaLabels.get(e.target).classList.remove("invalido");
            mapaLabels.get(e.target).classList.add("valido");
        }else {
            e.target.classList.remove("valido");
            e.target.classList.add("invalido");
            mapaLabels.get(e.target).classList.remove("valido");
            mapaLabels.get(e.target).classList.add("invalido");
        }
        if(e.target.value === "") {
            e.target.classList.remove("invalido");
            e.target.classList.remove("valido");
            mapaLabels.get(e.target).classList.remove("invalido");
            mapaLabels.get(e.target).classList.remove("valido");
        }
    }
    if(e.target === cajaMessage) {
        labels[4].children[0].innerHTML = `(${cajaMessage.value.length} / 255)`;
    }
});

window.addEventListener("load", (e) => {
    for(let input of mapaLabels.keys()) {
        if(input.value !== "") {
            mapaLabels.get(input).classList.add("active");
            if(input.checkValidity()) {
                input.classList.remove("invalido");
                input.classList.add("valido");
                mapaLabels.get(input).classList.remove("invalido");
                mapaLabels.get(input).classList.add("valido");
            }else {
                input.classList.remove("valido");
                input.classList.add("invalido");
                mapaLabels.get(input).classList.remove("valido");
                mapaLabels.get(input).classList.add("invalido");
            }
        }
    }
});