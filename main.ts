import * as PromptSync from "prompt-sync"
import { main } from "./moviematch";
const prompt = PromptSync();

const splash_devider = "\n------------------------------------------------\n"
console.log(splash_devider);
console.log("             Welcome to MovieMatch\n");
console.log(" Start by entering a movie that you enjoy below\n   and MovieMatch will provide you with five\n             movie recommendations");
console.log(splash_devider);

const userInput = prompt('Enter a movie title: ');

main(userInput)
  .then((result) => {
    console.log("\nThese are your recommended movies: ");
    console.log(result);
  })
  .catch((err) => console.error(err));
