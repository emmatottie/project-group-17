"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromptSync = require("prompt-sync");
var moviematch_1 = require("./moviematch");
var prompt = PromptSync();
var splash_devider = "\n------------------------------------------------\n";
console.log(splash_devider);
console.log("             Welcome to MovieMatch\n");
console.log(" Start by entering a movie that you enjoy below\n   and MovieMatch will provide you with five\n             movie recommendations");
console.log(splash_devider);
var userInput = prompt('Enter a movie title: ');
(0, moviematch_1.main)(userInput)
    .then(function (result) {
    console.log("\nThese are your recommended movies: ");
    console.log(result);
})
    .catch(function (err) { return console.error(err); });
