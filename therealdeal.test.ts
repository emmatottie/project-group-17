import {get_id, get_movie, main, movie_member, similar_genre} from "./therealdeal"

test("test 1 - checks if the main function returns 5 movies", async () => {
    const movie_title = "The Shawshank Redemption";
    expect((await main(movie_title)).length).toBe(5)
})

test("test 2 - test when a movie doesn't exist", async () => {
    const movie = "crazy bing bong dong"
    expect((await main(movie))).toBe("Could not find crazy bing bong dong");
})

test("test 3 - test if a movie is member in an array of movies", async () => {
    const movie = await get_movie(120)
    const movies = [movie]
    expect(movie_member(movies, movie)).toBe(true)
})





