import { find_most_popular, get_id, get_movie, main, most_popular_movies, movie_member, movies_recommend, remove_input} from "./therealdeal"

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
    const example_arr: Array<movies_recommend> = [example1, example2, example3]
    const most_popular = find_most_popular(example_arr)
    expect(most_popular).toBe(1)
})

test('tests the movie_member function', () => {
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
    const example4: movies_recommend = {
        id: 4,
        title: "example4",
        popularity: 4,
        cover: "image",
        rating: 4
    }
    const example_arr: Array<movies_recommend> = [example1, example2, example3]
    const member_true = movie_member(example_arr, example1)
    const member_false = movie_member(example_arr, example4)
    expect(member_true).toBe(true)
    expect(member_false).toBe(false)
})

test('tests the most_popular_movies function', () => {
    const example1: movies_recommend = {
        id: 1,
        title: "example1",
        popularity: 1,
        cover: "image",
        rating: 1
    }
    const example2: movies_recommend = {
        id: 2,
        title: "example2",
        popularity: 2,
        cover: "image",
        rating: 2
    }
    const example3: movies_recommend = {
        id: 3,
        title: "example3",
        popularity: 3,
        cover: "image",
        rating: 3
    }
    const example4: movies_recommend = {
        id: 4,
        title: "example4",
        popularity: 4,
        cover: "image",
        rating: 4
    }
    const example5: movies_recommend = {
        id: 5,
        title: "example5",
        popularity: 5,
        cover: "image",
        rating: 5
    }
    const example6: movies_recommend = {
        id: 6,
        title: "example6",
        popularity: 6,
        cover: "image",
        rating: 6
    }
    const example7: movies_recommend = {
        id: 7,
        title: "example7",
        popularity: 7,
        cover: "image",
        rating: 7
    }
    const example8: movies_recommend = {
        id: 8,
        title: "example8",
        popularity: 8,
        cover: "image",
        rating: 8
    }
    
    const movie_arr = [example1, example2, example3, example4, example5, example6, example7, example8]
    const expected = [example8, example7, example6, example5, example4]

    expect(most_popular_movies(movie_arr)).toStrictEqual(expected)
})

test('tests the remove_input function', async () => {
    const example1: movies_recommend = {
        id: 122,
        title: "example1",
        popularity: 1,
        cover: "image",
        rating: 1
    }
    const example2: movies_recommend = {
        id: 2,
        title: "example2",
        popularity: 2,
        cover: "image",
        rating: 2
    }
    const example3: movies_recommend = {
        id: 3,
        title: "example3",
        popularity: 3,
        cover: "image",
        rating: 3
    }

    const example_arr = [example1, example2, example3]

    expect(await remove_input(example_arr, "lord of the rings")).toStrictEqual([example2, example3])
})

test('tests the main function', async () => {
    const movie_title1 = "The Shawshank Redemption";
    const movie_title2 = "crazy bing bong dong"
    expect((await main(movie_title1)).length).toBe(5)
    expect((await main(movie_title2))).toBe("Could not find crazy bing bong dong");
})


