import { list } from "../lib/list"
import * as PromptSync from "prompt-sync"
type movie = {
    title: string,
    actors: Array<string>,
    director: Array<string>,
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



async function get_movie(id: Promise<number> | number): Promise<movie> {
    const details_response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
    const credits_response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options);
    const details_result = await details_response.json();
    const credits_result = await credits_response.json();
    const title = details_result.original_title;
    const rating = details_result.vote_average;
    const actors = []
    for(let i = 0; i < 10 && i < credits_result.cast.length; i++) {
        actors.push(credits_result.cast[i].id)
    }
    const directors = []
    for(let i = 0; i < credits_result.crew.length; i++) {
        if(credits_result.crew[i].job === "Director") {
            directors.push(credits_result.crew[i].id)
        }
    }
    const movie = {
        title: title,
        actors: actors,
        director: directors,
        rating: rating
    }
    return movie
}

function get_movie_from_title(movie: string): Promise<movie> {
    return get_movie(get_id(movie))
}

const prompt = PromptSync();
const userInput = prompt('Enter a movie title: ');

get_movie_from_title(userInput)
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
/*
function top_5(movie: movie, top5: Array<movie>): void {
    let i = 0
    while(movie.rating < top5[i].rating && i < top5.length) {
        continue
    }
    if(i < 5) {
        const new_movie_index = i
        let current = top5[i]
        for(i; i < top5.length - 1; i++) {
            let temp = top5[i + 1]
            top5[i + 1] = current
            current = temp    
        }
        top5[new_movie_index] = movie
    }
}

function similar_movies(movie:string): Array<movie> | undefined{
    const movie_api: movie = //sök movie i api
    if(movie_api) {
        let similar: Array<movie> = []
        for(let i = 0; i < movie_api.genre.length; i++) {
            const genre = //sök movie_api.genre[i] i api
            for(let j = 0; j < genre.length; j++) {
                top_5(genre[j], similar)
            }
        }
        return similar
    } else {
        console.log("Could not find any movie called " + movie)
        return undefined
    }
}
*/