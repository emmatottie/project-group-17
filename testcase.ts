// Import necessary modules for testing
import { get_id, get_movie, get_movie_from_title } from './therealdeal'; // Replace './yourMovieFunctions' with the correct path to your functions file

// Mock data for testing
const mockMovieId = 12345; // Mock movie ID
const mockMovieDetails = { // Mock movie details
  title: "Mock Movie",
  actors: ["Actor 1", "Actor 2"],
  director: ["Director 1"],
  genres: [{ id: 1, name: "Genre 1" }, { id: 2, name: "Genre 2" }],
  rating: 7.5
};
const mockApiResponse = { results: [{ id: mockMovieId }] }; // Mock API response

// Mock fetch function for testing
jest.mock('node-fetch', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((url, options) => {
    if (url.includes('/search/movie')) {
      return Promise.resolve({ json: () => Promise.resolve(mockApiResponse) });
    } else {
      return Promise.resolve({ json: () => Promise.resolve(mockMovieDetails) });
    }
  })
}));

test('get_id function', () => {
  it('should return the correct movie ID', async () => {
    const movieId = await get_id("Mock Movie");
    expect(movieId).toBe(mockMovieId);
  });
});

test('get_movie function', () => {
  it('should return the correct movie details', async () => {
    const movie = await get_movie(mockMovieId);
    expect(movie).toEqual(mockMovieDetails);
  });
});

test('get_movie_from_title function', () => {
  it('should return the correct movie details from title', async () => {
    const movie = await get_movie_from_title("Mock Movie");
    expect(movie).toEqual(mockMovieDetails);
  });
  it('should throw an error if movie title is not found', async () => {
    await expect(get_movie_from_title("Non-existent Movie")).rejects.toThrowError();
  });
});
