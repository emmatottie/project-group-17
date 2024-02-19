import { list } from "../lib/list"
import * as PromptSync from "prompt-sync"
type movie = {
    title: string,
    actors: Array<string>,
    director: Array<string>,
    genres: Array<{id: number, name: string}>
    rating: number
}

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjI4ODQ4NjRhNjc1Mjk5NWVlMmUxNWViZjM0MTgyNCIsInN1YiI6IjY1Y2UwY2NlZWZjZWE5MDE3Y2FhYzJkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zKr06f_GR1RioPGjmxIi6IRd8sRgq3s8D2jMeUNzYtU'
    }
  };

async function get_id(title: string): Promise<number> {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`,
      options
    );

    const search = await response.json();
    return search.results[0].id;
}



async function get_movie(id: number): Promise<movie> {
    const details_response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
    const credits_response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options);
    const details_result = await details_response.json();
    const credits_result = await credits_response.json();

    const title = details_result.original_title;
    const rating = details_result.vote_average;
    const genres = details_result.genres;

    const actors = []
    for(let i = 0; i < 10 && i < credits_result.cast.length; i++) {
        actors.push(credits_result.cast[i].name)
    }

    const directors = []
    for(let i = 0; i < credits_result.crew.length; i++) {
        if(credits_result.crew[i].job === "Director") {
            directors.push(credits_result.crew[i].name)
        }
    }

    const movie = {
        title: title,
        actors: actors,
        director: directors,
        genres: genres,
        rating: rating
    }
    return movie
}

async function get_movie_from_title(movie: string): Promise<movie> {
    try {
      const id = await get_id(movie);
      const movieDetails = await get_movie(id);
      return movieDetails;
    } catch (error) {
      throw error;
    }
}


const prompt = PromptSync();
const userInput = prompt('Enter a movie title: ');

get_movie_from_title(userInput)
  .then((result) => console.log(result))
  .catch((err) => console.error(err));