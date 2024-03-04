"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromptSync = require("prompt-sync");
var moviematch_1 = require("./moviematch");
var prompt = PromptSync();
var userInput = prompt('Enter a movie title: ');
(0, moviematch_1.main)(userInput)
    .then(function (result) {
    console.log("\nThese are your recommended movies: ");
    console.log(result);
})
    .catch(function (err) { return console.error(err); });
