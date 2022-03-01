"use strict";
const [labelUsername, labelPassword] = document.querySelectorAll("label");

document.addEventListener("focusin", (e) => {
    for(let label of [labelUsername, labelPassword]) {
        if(e.target === label.children[1]) {
            label.children[0].classList.add("active");
        }
    }
});
document.addEventListener("focusout", (e) => {
    for(let label of [labelUsername, labelPassword]) {
        if(e.target === label.children[1] && label.children[1].value === "") {
            label.children[0].classList.remove("active");
        }
    }
});