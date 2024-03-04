import { find_best_movie, get_id, get_movie, main, best_movies, movie_member, movie_for_sorting, type recommended_movie, remove_input} from "./moviematch"

test('tests the get_id function', async () => {
    const example_movie = "Lord of the rings"
    expect(typeof(await get_id(example_movie))).toBe("number")
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

test('tests the find_best_movie function', () => {
    const example1: movie_for_sorting = {
        id: 1,
        title: "example1",
        popularity: 1,
        cover: "image",
        rating: 4,
        overview: "...",
        release_year: "XXXX"
    }
    const example2: movie_for_sorting = {
        id: 2,
        title: "example2",
        popularity: 10,
        cover: "image",
        rating: 10,
        overview: "...",
        release_year: "XXXX"
    }
    const example3: movie_for_sorting = {
        id: 3,
        title: "example3",
        popularity: 0,
        cover: "image",
        rating: 0,
        overview: "...",
        release_year: "XXXX"
    }
    const example_arr: Array<movie_for_sorting> = [example1, example2, example3]
    const most_popular = find_best_movie(example_arr)
    expect(most_popular).toBe(1)
})

test('tests the movie_member function', () => {
    const example1: recommended_movie = {
        title: "example1",
        overview: "...",
        release_year: "XXXX"
    }
    const example2: recommended_movie = {
        title: "example2",
        overview: "...",
        release_year: "XXXX"
    }
    const example3: recommended_movie = {
        title: "example3",
        overview: "...",
        release_year: "XXXX"
    }
    const example4: recommended_movie = {
        title: "example4",
        overview: "...",
        release_year: "XXXX"
    }
    const example_arr: Array<recommended_movie> = [example1, example2, example3]
    const member_true = movie_member(example_arr, example1)
    const member_false = movie_member(example_arr, example4)
    expect(member_true).toBe(true)
    expect(member_false).toBe(false)
})

test('tests the best_movies function', () => {
    const example1: movie_for_sorting = {
        id: 1,
        title: "example1",
        popularity: 1,
        cover: "image",
        rating: 1,
        overview: "...",
        release_year: "XXXX"
    }
    const example2: movie_for_sorting = {
        id: 2,
        title: "example2",
        popularity: 2,
        cover: "image",
        rating: 2,
        overview: "...",
        release_year: "XXXX"
    }
    const example3: movie_for_sorting = {
        id: 3,
        title: "example3",
        popularity: 3,
        cover: "image",
        rating: 3,
        overview: "...",
        release_year: "XXXX"
    }
    const example4: movie_for_sorting = {
        id: 4,
        title: "example4",
        popularity: 4,
        cover: "image",
        rating: 4,
        overview: "...",
        release_year: "XXXX"
    }
    const example5: movie_for_sorting = {
        id: 5,
        title: "example5",
        popularity: 5,
        cover: "image",
        rating: 5,
        overview: "...",
        release_year: "XXXX"
    }
    const example6: movie_for_sorting = {
        id: 6,
        title: "example6",
        popularity: 6,
        cover: "image",
        rating: 6,
        overview: "...",
        release_year: "XXXX"
    }
    const example7: movie_for_sorting = {
        id: 7,
        title: "example7",
        popularity: 7,
        cover: "image",
        rating: 7,
        overview: "...",
        release_year: "XXXX"
    }
    const example8: movie_for_sorting = {
        id: 8,
        title: "example8",
        popularity: 8,
        cover: "image",
        rating: 8,
        overview: "...",
        release_year: "XXXX"
    }

    function convert_to_reccomended_movie(movie_arr: Array<movie_for_sorting>): Array<recommended_movie> {
        const converted_arr = []
        for(let i = 0; i < movie_arr.length; i++) {
            const converted_movie: recommended_movie = {
                title: movie_arr[i].title,
                overview: movie_arr[i].overview,
                release_year: movie_arr[i].release_year
            }
            converted_arr.push(converted_movie)
        }
        return converted_arr
    }
    
    const movie_arr = [example1, example2, example3, example4, example5, example6, example7, example8]
    const expected_movies = [example8, example7, example6, example5, example4]
    const expected_converted = convert_to_reccomended_movie(expected_movies)

    expect(best_movies(movie_arr)).toStrictEqual(expected_converted)
})

test('tests the remove_input function', async () => {
    const example1: movie_for_sorting = {
        id: 122,
        title: "example1",
        popularity: 1,
        cover: "image",
        rating: 1,
        overview: "...",
        release_year: "XXXX"
    }
    const example2: movie_for_sorting = {
        id: 2,
        title: "example2",
        popularity: 2,
        cover: "image",
        rating: 2,
        overview: "...",
        release_year: "XXXX"
    }
    const example3: movie_for_sorting = {
        id: 3,
        title: "example3",
        popularity: 3,
        cover: "image",
        rating: 3,
        overview: "...",
        release_year: "XXXX"
    }

    const example_arr = [example1, example2, example3]

    expect((await remove_input(example_arr, "lord of the rings"))).toStrictEqual([example2, example3])
})

test('tests the main function', async () => {
    const movie_title1 = "The Shawshank Redemption";
    const movie_title2 = "crazy bing bong dong"
    expect((await main(movie_title1)).length).toBe(5)
    expect((await main(movie_title2))).toBe("Could not find crazy bing bong dong");
})


