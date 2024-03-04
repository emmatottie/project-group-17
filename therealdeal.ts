type movie = {
    id: number,
    title: string,
    actors: Array<number>,
    director: Array<number>,
    popularity: number,
    cover: string
}

export type movies_recommend = {
    id: number,
    title: string,
    popularity: number,
    cover: string,
    rating: number
}

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTVjMTliNGY4ZmFhMGU3MDY3ZjE3NWFiNTI1MjM4NCIsInN1YiI6IjY1Y2UwY2NlZWZjZWE5MDE3Y2FhYzJkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Iv__wsQh0VdRmZ1144MIMwExeY6eKDEJSG3Ne4VSYWI'
    }
};

/**
 * Gets the id of a movie from its title.
 * @example
 * //should return: 120
 * get_id("Lord of the rings");
 * @param {string} title - the title of a movie.
 * @returns {Promise<number>} - The id of the input movie.
 */
export async function get_id(title: string): Promise<number> {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`,
      options
    );

    const search = await response.json();
    return search.results[0].id;
}

/**
 * Gets the relevant data of a movie.
 * @param {number} id - The id of a movie.
 * @returns {Promise<movie>} - The relevant data of the movie.
 */
export async function get_movie(id: number): Promise<movie> {
    const details_response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
    const credits_response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options);
    const details_result = await details_response.json();
    const credits_result = await credits_response.json();

    const title = details_result.original_title;
    const popularity = details_result.popularity;
    const cover = details_result.poster_path

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
        popularity: popularity,
        cover: cover
    }
    return movie
}

/**
 * Pushes movies similar to the input movie into an array based on genres and keywords.
 * @param {number} movie_id - The id of a movie.
 */
export async function similar_genre(movie_id: number): Promise<void> {
    const similar_response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/similar?language=en-US&page=1`, options)
    const similar_result = await similar_response.json();
    for(let i = 0; i < similar_result.results.length; i++) {
        const movie_id = similar_result.results[i].id
        const movie_title = similar_result.results[i].original_title
        const movie_popularity = similar_result.results[i].popularity
        const movie_cover = similar_result.results[i].poster_path
        const movie_rating = similar_result.results[i].vote_average
        const movie: movies_recommend = {
            id: movie_id,
            title: movie_title,
            popularity: movie_popularity,
            cover: movie_cover,
            rating: movie_rating
        }
        similar_array.push(movie)
    }
}

/**
 * Pushes movies with the same actors as the input movie into an array.
 * @param {number} movie_id - The id of a movie.
 */
async function similar_actor(movie_id: number): Promise<void> {
    const actors = (await get_movie(movie_id)).actors
    for(let i = 0; i < actors.length; i++) {
        const actor_id = actors[i]
        const similar_response = await fetch(`https://api.themoviedb.org/3/person/${actor_id}/movie_credits?language=en-US`, options)
        const similar_result = await similar_response.json()
        for(let j = 0; j < similar_result.cast.length; j++) {
            const movie_id = similar_result.cast[j].id
            const movie_title = similar_result.cast[j].original_title
            const movie_popularity = similar_result.cast[j].popularity
            const movie_cover = similar_result.cast[j].poster_path
            const movie_rating = similar_result.cast[j].vote_average
            const movie: movies_recommend = {
                id: movie_id,
                title: movie_title,
                popularity: movie_popularity,
                cover: movie_cover,
                rating: movie_rating
            }
            similar_array.push(movie)
        }
    }
}

/**
 * Pushes movies with the same director as the input movie into an array.
 * @param {number} movie_id - The id of a movie.
 */
async function similar_director(movie_id: number): Promise<void> {
    const director = (await get_movie(movie_id)).director
    for(let i = 0; i < director.length; i++) {
        const director_id = director[i]
        const similar_response = await fetch(`https://api.themoviedb.org/3/person/${director_id}/movie_credits?language=en-US`, options)
        const similar_result = await similar_response.json()
        for(let j = 0; j < similar_result.crew.length; j++) {
            if(similar_result.crew[j].job === "Director") {
                const movie_id = similar_result.crew[j].id
                const movie_title = similar_result.crew[j].original_title
                const movie_popularity = similar_result.crew[j].popularity
                const movie_cover = similar_result.crew[j].poster_path
                const movie_rating = similar_result.crew[j].vote_average
                const movie: movies_recommend = {
                    id: movie_id,
                    title: movie_title,
                    popularity: movie_popularity,
                    cover: movie_cover,
                    rating: movie_rating
                }
                similar_array.push(movie)
            }
        }
    }
}

/**
 * Finds the movie with the highest popularity * rating of an array of movies
 * @param {Array<movies_recommend>} movies - An array of movies
 * @returns {number} - The id of the movie with the highest popularity * rating
 */
export function find_most_popular(movies: Array<movies_recommend>): number {
    const low = 0
    const high = movies.length - 1
    let highest_rating = low
    for(let i = low + 1; i <= high; i++) {
        if((movies[i].popularity * movies[i].rating) > (movies[highest_rating].popularity * movies[highest_rating].rating)) {
            highest_rating = i
        }
    }
    return highest_rating
}

/**
 * Checks if a movie is in an array.
 * @param {Array<movies_recommend>} movies - An array of movies.
 * @param {movies_recommend} movie - The movie to check if it is in the array.
 * @returns {boolean} - true if the array contains the movie,
 *                      false if the array does not contain the movie.
 */
export function movie_member(movies: Array<movies_recommend>, movie: movies_recommend): boolean {
    for(let i = 0; i < movies.length; i++) {
        if(movies[i].id === movie.id) {
            return true
        }
    }
    return false
}

/**
 * Creates an array of the 5 movies with the highest popularity * rating
 * @param {Array<movies_recommend>} movies - An array of movies
 * @returns {Array<movies_recommend>} - The 5 movies with the highest popularity * rating of the input array
 */
export function most_popular_movies(movies: Array<movies_recommend>): Array<movies_recommend> {
    const recommended = []
    for(let i = 0; recommended.length < 5; i++) {
        const highest_index = find_most_popular(movies)
        if(!movie_member(recommended, movies[highest_index])) { // does not add a movie to the array if it is already in the array
            recommended.push(movies[highest_index])
        }
        movies.splice(highest_index, 1) // removes the movie from the input array so the
    }                                   // second most popular movie can be found the next loop
    return recommended
}

/**
 * Removes a movie from an Array
 * @param {Array<movies_recommend>} movies - An array of movies
 * @param {string} movie - The title of the movie to be removed
 * @returns {Promise<Array<movies_recommend>>} - The same array with the movie removed
 */
export async function remove_input(movies: Array<movies_recommend>, movie: string): Promise<Array<movies_recommend>> {
    const id = await get_id(movie)
    return movies.filter((x: movies_recommend) => x.id != id)
}

let similar_array: Array<movies_recommend> = []

/**
 * Recommends 5 movies based on one movie
 * @param {string} movie - The title of a movie
 * @returns {Promise<Array<movies_recommend>> | string}
 *          - An array of reccomended movies if the input movie is found,
 *            an error message saying it could not find the movie if it is not found.
 */
export async function main(movie: string): Promise<Array<movies_recommend> | string> {
    try {
      const id = await get_id(movie); //gets the id of the input movie
      await similar_director(id);
      await similar_actor(id);
      await similar_genre(id); // creates an array of all similar movies
      similar_array = await remove_input(similar_array, movie) // removes the input movie from the array
      return most_popular_movies(similar_array);
    } catch (error) {
      return `Could not find ${movie}`
    }
}

/**
 TO DO:
 * to function specifications on every function
 * running time
 * webiste
 * polish the code
 * decide how many movies you want to get as output
 * comment the code
*/
