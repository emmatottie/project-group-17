import {get_id, main} from "../project-group-17/therealdeal"

test("test 1 - get_id should return a valid ID for a given movie title", () => {
    const movie_title = "The Shawshank Redemption";
        const movie_id = get_id(movie_title);
        expect(typeof movie_id).toBe("number");
        expect(movie_id).toBeGreaterThan(0); 
});
/*
test("test 2 - type in a movie and get 5 movies that are similar", () => {
    const title = "Iron Man";
        const recommended_movies = main(title);
        expect(Array.isArray(recommended_movies)).toBe(true);
        expect(recommended_movies.length).toBeGreaterThan(0);
        recommended_movies.forEach(movie => {
            expect(movie).toHaveProperty('id');
            expect(movie).toHaveProperty('title');
            expect(movie).toHaveProperty('actors');
            expect(movie).toHaveProperty('director');
            expect(movie).toHaveProperty('genres');
            expect(movie).toHaveProperty('popularity');
     });
});

*/
