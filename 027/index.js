"use strict";
const d = document;
const lis = Array.from(d.querySelectorAll(".liAfuera"));
let mapa = new Map();
let ases = [];

// Mapa de cada li con sus ases
for(let li of lis) {
    ases = [];
    for(let li2 of li.children[0].children) {
        ases.push(li2.children[0]);
    }
    mapa.set(li, ases);
}


d.addEventListener("mouseover", (e) => {
    for(let li of lis) {
        if(e.target === li) {
            li.children[0].style.height = `${li.children[0].children.length * 40}px`;
        }
        if(mapa.get(li).indexOf(e.target) === -1 && e.target !== li) {
            li.children[0].style.height = "0";
        }
    }
});
