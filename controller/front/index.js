"use strict"
import indexController from './indexController.js';
/* export function index() {
    console.log("123");
} */
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}
