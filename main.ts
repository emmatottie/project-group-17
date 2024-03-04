import * as PromptSync from "prompt-sync"
import { main } from "./moviematch";
const prompt = PromptSync();
const userInput = prompt('Enter a movie title: ');

main(userInput)
  .then((result) => {
    console.log("\nThese are your recommended movies: ");
    console.log(result);
  })
  .catch((err) => console.error(err));
