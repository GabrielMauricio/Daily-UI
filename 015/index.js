"use strict";
const d = document;
const riel = d.querySelector(".riel");
const on = d.querySelector("p.on");
const off = d.querySelector("p.off");
const circulo = d.querySelector("div.circulo");

console.log(riel);
console.log(on);
console.log(off);
console.log(circulo);

d.addEventListener("click", (e) => {
    if(e.target === circulo) {
        if(circulo.classList.contains("on")) {
            circulo.style.transform = 'translateX(-80px)';
            circulo.classList.replace("on", "off");
            riel.classList.replace("on", "off");
            
        } else if(circulo.classList.contains("off")) {
            circulo.style.transform = `translateX(0)`;
            circulo.classList.replace("off", "on");
            riel.classList.replace("off", "on");
        }
    }
});