import {get_id, get_movie, main, similar_genre} from "./therealdeal"

jest.mock('prompt-sync', () => () => () => 'The Shawshank Redemption');

test("test 1 - get_id should return a valid ID for a given movie title", async () => {
    const movie_title = "The Shawshank Redemption";
    const movie_id = await get_id(movie_title);
    expect(movie_id).toBeGreaterThan(0); 
});

test("test 2 - get movie", async () => {
    const title = "Iron Man"
    const movie_id = await get_id(title)
    const movie = await get_movie(movie_id)
    expect(movie).toBeDefined()
    expect(movie).toHaveProperty('id');
    expect(movie).toHaveProperty('title', 'Iron Man');
    expect(movie).toHaveProperty('actors');
    expect(movie).toHaveProperty('director');
    expect(movie).toHaveProperty('genres');
    expect(movie).toHaveProperty('popularity');
});



