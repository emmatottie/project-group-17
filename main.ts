import * as PromptSync from "prompt-sync"
import { main } from "./therealdeal";
const prompt = PromptSync();
const userInput = prompt('Enter a movie title: ');

main(userInput)
  .then((result) => console.log(result))
  .catch((err) => console.error(err));