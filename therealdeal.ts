import { list } from "../lib/list"
import * as PromptSync from "prompt-sync"

type movie = {
    id: number,
    title: string,
    actors: Array<number>,
    director: Array<number>,
    genres: Array<{id: number, name: string}>
    popularity: number
}

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjI4ODQ4NjRhNjc1Mjk5NWVlMmUxNWViZjM0MTgyNCIsInN1YiI6IjY1Y2UwY2NlZWZjZWE5MDE3Y2FhYzJkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zKr06f_GR1RioPGjmxIi6IRd8sRgq3s8D2jMeUNzYtU'
    }
};

export async function get_id(title: string): Promise<number> {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`,
      options
    );

    const search = await response.json();
    return search.results[0].id;
}

export async function get_movie(id: number): Promise<movie> {
    const details_response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
    const credits_response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options);
    const details_result = await details_response.json();
    const credits_result = await credits_response.json();

    const title = details_result.original_title;
    const popularity = details_result.popularity;
    const genres = details_result.genres;

    const actors = []
    for(let i = 0; i < 5 && i < credits_result.cast.length; i++) {
        actors.push(credits_result.cast[i].id)
    }

    const directors = []
    for(let i = 0; i < credits_result.crew.length; i++) {
        if(credits_result.crew[i].job === "Director") {
            directors.push(credits_result.crew[i].id)
        }
    }

    const movie = {
        id: id,
        title: title,
        actors: actors,
        director: directors,
        genres: genres,
        popularity: popularity
    }
    return movie
}

async function similar_genre(movie_id: number) {
    const similar_response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/similar?language=en-US&page=1`, options)
    const similar_result = await similar_response.json();
    for(let i = 0; i < similar_result.results.length; i++) {
        const movie = await get_movie(similar_result.results[i].id)
        similar_array.push(movie)
    }
}

async function similar_actor(movie_id: number) {
    const actors = (await get_movie(movie_id)).actors
    for(let i = 0; i < actors.length; i++) {
        const actor_id = actors[i]
        const similar_response = await fetch(`https://api.themoviedb.org/3/person/${actor_id}/movie_credits?language=en-US`, options)
        const similar_result = await similar_response.json()
        for(let j = 0; j < similar_result.cast.length && j < 10; j++) {
            const movie_id = similar_result.cast[j].id
            const movie = await get_movie(movie_id)
            similar_array.push(movie)
        }
    }
}

async function similar_director(movie_id: number) {
    const director = (await get_movie(movie_id)).director
    const directed_movies = []
    for(let i = 0; i < director.length; i++) {
        const director_id = director[i]
        const similar_response = await fetch(`https://api.themoviedb.org/3/person/${director_id}/movie_credits?language=en-US`, options)
        const similar_result = await similar_response.json()
        for(let j = 0; j < similar_result.crew.length; j++) {
            if(similar_result.crew[j].job === "Director") {
                const movie_id = similar_result.crew[j].id
                const movie = await get_movie(movie_id)
                directed_movies.push(movie)
            }
        }
    }
    for(let m = 0; m < directed_movies.length; m++) {
        similar_array.push(directed_movies[m])
    }
}

function find_most_popular(movies: Array<movie>): number {
    const low = 0
    const high = movies.length - 1
    let highest_rating = low
    for(let i = low + 1; i <= high; i++) {
        if(movies[i].popularity > movies[highest_rating].popularity) {
            highest_rating = i
        }
    }
    return highest_rating
}

function movie_member(movies: Array<movie>, movie: movie): boolean {
    for(let i = 0; i < movies.length; i++) {
        if(movies[i].id === movie.id) {
            return true
        }
    }
    return false
}

function most_popular_movies(movies: Array<movie>): Array<movie> {
    const reccomended = []
    for(let i = 0; reccomended.length < 10; i++) {
        const highest_index = find_most_popular(movies)
        if(!movie_member(reccomended, movies[highest_index])) {
            reccomended.push(movies[highest_index])
        }
        movies.splice(highest_index, 1)
    }
    return reccomended
}

const similar_array: Array<movie> = []

export async function main(movie: string): Promise<Array<movie>> {
    try {
      const id = await get_id(movie);
      await similar_director(id);
      await similar_actor(id);
      await similar_genre(id);
      return most_popular_movies(similar_array);
    } catch (error) {
      throw error;
    }
}

const prompt = PromptSync();
const userInput = prompt('Enter a movie title: ');

main(userInput)
  .then((result) => console.log(result))
  .catch((err) => console.error(err));