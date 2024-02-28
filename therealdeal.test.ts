import { find_most_popular, get_id, get_movie, get_movie_for_test, main, movie_member, movies_recommend} from "./therealdeal"

/*test("test 1 - checks if the main function returns 5 movies", async () => {
    const movie_title = "The Shawshank Redemption";
    expect((await main(movie_title)).length).toBe(5)
})

test("test 2 - test when a movie doesn't exist", async () => {
    const movie = "crazy bing bong dong"
    expect((await main(movie))).toBe("Could not find crazy bing bong dong");
})

test("test 3 - test if a movie is member in an array of movies", async () => {
    const movie = await get_movie_for_test(120)
    const movies = [movie]
    expect(movie_member(movies, movie)).toBe(true)
})
*/

test('tests the get_id function', async () => {
    const example_movie = "Lord of the rings"
    expect(await get_id(example_movie)).toBe(120)
})

test('tests the get_movie function', async () => {
    const example_movie = await get_movie(120)
    expect(example_movie.id).not.toBeUndefined
    expect(example_movie.title).not.toBeUndefined
    expect(example_movie.actors).not.toBeUndefined
    expect(example_movie.director).not.toBeUndefined
    expect(example_movie.popularity).not.toBeUndefined
    expect(example_movie.cover).not.toBeUndefined
})

test('tests the find_most_popular function', () => {
    const example1: movies_recommend = {
        id: 1,
        title: "example1",
        popularity: 1,
        cover: "image",
        rating: 4
    }
    const example2: movies_recommend = {
        id: 2,
        title: "example2",
        popularity: 10,
        cover: "image",
        rating: 10
    }
    const example3: movies_recommend = {
        id: 3,
        title: "example3",
        popularity: 0,
        cover: "image",
        rating: 0
    }
    //const example_arr: Array<movies_recommend> = [example1, example2, example3]
    const most_popular = find_most_popular([example1, example2, example3])
    expect(most_popular).toBe(1)
})





