"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromptSync = require("prompt-sync");
var therealdeal_1 = require("./therealdeal");
var prompt = PromptSync();
var userInput = prompt('Enter a movie title: ');
(0, therealdeal_1.main)(userInput)
    .then(function (result) { return console.log(result); })
    .catch(function (err) { return console.error(err); });
